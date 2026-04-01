import { rgbToHex } from "./utils/colors";
import {
  createCollection,
  getExistingVariables,
  processAliases,
  traverseToken,
} from "./utils/tokens";
import type {
  AliasEntry,
  DTCGToken,
  DTCGTokenType,
  ExportedFile,
  PluginMessage,
} from "./utils/types";

async function importJSONFile({
  fileName,
  body,
}: {
  fileName: string;
  body: string;
}): Promise<{ wasUpdate: boolean; collectionName: string; tokenCount: number }> {
  console.log("Importing file:", fileName);


  let wasUpdate = false;


  const existingCollections = await figma.variables.getLocalVariableCollectionsAsync();
  const existingCollection = existingCollections.find((c) => c.name === fileName);
  wasUpdate = !!existingCollection;


  const isPrimitivesFile = fileName.toLowerCase().includes("primitives");

  const isSemanticFile = fileName.toLowerCase().includes("semantic");

  console.log("DEBUG - File name:", fileName);
  console.log("DEBUG - isPrimitivesFile detected:", isPrimitivesFile);
  console.log("DEBUG - isSemanticFile detected:", isSemanticFile);

  if (isPrimitivesFile) {
    console.log(
      "Detected primitives file - tokens will have NO scope (hidden from UI)",
    );
  }
  if (isSemanticFile) {
    console.log(
      "Detected semantic file - will create Light/Dark modes",
    );
  }

  const json = JSON.parse(body) as DTCGToken;
  console.log("JSON structure keys:", Object.keys(json));
  console.log("DEBUG - JSON top-level non-$ keys:", Object.keys(json).filter(k => !k.startsWith('$')));


  const { collection, modeId, modeIds } = await createCollection(
    fileName,
    isSemanticFile,
  );
  console.log("DEBUG - Collection created, modeId:", modeId, "modeIds:", modeIds);
  const aliases: Record<string, AliasEntry> = {};
  const tokens: Record<string, Variable> = {};

  const existingVariables = await getExistingVariables();
  console.log(
    "Existing variables from other collections:",
    Object.keys(existingVariables).length,
  );
  console.log(
    "DEBUG - Sample existing variables:",
    Object.keys(existingVariables).slice(0, 10),
  );
  console.log(
    "DEBUG - Looking for 'color/white' in existing:",
    existingVariables["color/white"] ? "FOUND" : "NOT FOUND",
  );
  console.log(
    "DEBUG - Looking for 'white' in existing:",
    existingVariables["white"] ? "FOUND" : "NOT FOUND",
  );


  const allKeys = Object.keys(existingVariables);
  const conflicts: string[] = [];


  const colorConflicts = allKeys.filter((k) => k.startsWith("color/"));
  if (colorConflicts.length > 0) {
    console.log(
      "DEBUG - Found existing color/* tokens:",
      colorConflicts.slice(0, 15),
      "... and",
      colorConflicts.length - 15,
      "more",
    );
    conflicts.push(...colorConflicts);
  }


  const chartConflicts = allKeys.filter((k) => k.startsWith("chart/"));
  if (chartConflicts.length > 0) {
    console.log("DEBUG - Found existing chart/* tokens:", chartConflicts);
    conflicts.push(...chartConflicts);
  }


  const checkboxConflicts = allKeys.filter((k) => k.startsWith("checkbox/"));
  if (checkboxConflicts.length > 0) {
    console.log("DEBUG - Found existing checkbox/* tokens:", checkboxConflicts);
    conflicts.push(...checkboxConflicts);
  }

  if (conflicts.length > 0) {
    console.log(
      "DEBUG - TOTAL CONFLICTS FOUND:",
      conflicts.length,
      "tokens will fail to create",
    );
  }

  traverseToken({
    collection,
    modeId,
    modeIds,
    type: json.$type as DTCGTokenType | undefined,
    key: "",
    object: json,
    tokens,
    aliases,
    existingVariables,
    isPrimitivesFile,
  });

  console.log("Created tokens:", Object.keys(tokens).length);
  console.log("Pending aliases:", Object.keys(aliases).length);

  await processAliases({
    collection,
    modeId,
    modeIds,
    aliases,
    tokens,
    existingVariables,
    isPrimitivesFile,
  });

  console.log("Import complete!");


  return {
    wasUpdate,
    collectionName: fileName,
    tokenCount: Object.keys(tokens).length,
  };
}

async function exportToJSON(): Promise<void> {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const files: ExportedFile[] = [];

  for (const collection of collections) {
    const collectionFiles = await processCollection(collection);
    files.push(...collectionFiles);
  }

  figma.ui.postMessage({ type: "EXPORT_RESULT", files });
}

async function processCollection({
  name,
  modes,
  variableIds,
}: VariableCollection): Promise<ExportedFile[]> {
  const files: ExportedFile[] = [];

  for (const mode of modes) {
    const file: ExportedFile = {
      fileName: `${name}.${mode.name}.tokens.json`,
      body: {},
    };

    for (const variableId of variableIds) {
      const variable = await figma.variables.getVariableByIdAsync(variableId);

      if (!variable) continue;

      const { name: varName, resolvedType, valuesByMode } = variable;
      const value = valuesByMode[mode.modeId];

      if (value !== undefined && ["COLOR", "FLOAT"].includes(resolvedType)) {
        let obj: Record<string, unknown> = file.body;

        varName.split("/").forEach((groupName) => {
          obj[groupName] = obj[groupName] || {};
          obj = obj[groupName] as Record<string, unknown>;
        });

        obj.$type = resolvedType === "COLOR" ? "color" : "number";

        if (
          typeof value === "object" &&
          "type" in value &&
          value.type === "VARIABLE_ALIAS"
        ) {
          const aliasedVar = await figma.variables.getVariableByIdAsync(
            value.id,
          );
          if (aliasedVar) {
            obj.$value = `{${aliasedVar.name.replace(/\//g, ".")}}`;
          }
        } else if (resolvedType === "COLOR" && typeof value === "object") {
          obj.$value = rgbToHex(value as RGBA);
        } else {
          obj.$value = value;
        }
      }
    }

    files.push(file);
  }

  return files;
}

figma.ui.onmessage = async (e: PluginMessage) => {
  console.log("code received message", e);

  if (e.type === "IMPORT") {
    const result = await importJSONFile({ fileName: e.fileName, body: e.body });

    figma.ui.postMessage({
      type: "IMPORT_COMPLETE",
      wasUpdate: result.wasUpdate,
      collectionName: result.collectionName,
      tokenCount: result.tokenCount,
    });
  } else if (e.type === "EXPORT") {
    await exportToJSON();
  } else if (e.type === "GET_COLLECTIONS") {

    const collections =
      await figma.variables.getLocalVariableCollectionsAsync();
    const collectionsInfo = collections.map((c) => ({
      name: c.name,
      variableCount: c.variableIds.length,
    }));
    figma.ui.postMessage({
      type: "COLLECTIONS_LIST",
      collections: collectionsInfo,
    });
  }
};

if (figma.command === "import") {
  figma.showUI(__uiFiles__["import"] as string, {
    width: 500,
    height: 500,
    themeColors: true,
  });
} else if (figma.command === "export") {
  figma.showUI(__uiFiles__["export"] as string, {
    width: 500,
    height: 500,
    themeColors: true,
  });
}
