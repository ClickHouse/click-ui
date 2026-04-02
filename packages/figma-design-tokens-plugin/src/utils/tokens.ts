import { parseColor } from "./colors";
import type {
  AliasEntry,
  DTCGColorValue,
  DTCGDimensionValue,
  DTCGToken,
  DTCGTokenType,
  ModeIds,
  ProcessAliasesParams,
  TraverseTokenParams,
} from "./types";

type VariableWithScopes = Variable & { scopes: VariableScope[] };

export function inferScopes(
  name: string,
  type: VariableResolvedDataType | DTCGTokenType,
): string[] {

  const normalizedName = name.replace(/\./g, "/").toLowerCase();

  if (type === "COLOR") {

    if (
      normalizedName.includes("border") ||
      normalizedName.includes("stroke")
    ) {
      return ["STROKE_COLOR"];
    }

    if (
      normalizedName.includes("background") ||
      normalizedName.includes("bg") ||
      normalizedName.includes("fill")
    ) {
      return ["ALL_FILLS"];
    }

    if (normalizedName.includes("shadow") || normalizedName.includes("scrim")) {
      return ["EFFECT_COLOR"];
    }

    if (normalizedName.startsWith("_color/")) {
      return ["ALL_SCOPES"];
    }

    return ["ALL_SCOPES"];
  }

  if (type === "FLOAT" || type === "number") {
    console.log(
      `DEBUG inferScopes - Checking FLOAT/number: "${normalizedName}"`,
    );

    // Check for typography scopes FIRST (before generic "size" match)
    if (normalizedName.includes("font/size") || normalizedName.includes("font.size")) {
      console.log(
        `DEBUG inferScopes - Matched FONT_SIZE for "${normalizedName}"`,
      );
      return ["FONT_SIZE"];
    }

    if (normalizedName.includes("font/weight") || normalizedName.includes("font.weight")) {
      console.log(
        `DEBUG inferScopes - Matched FONT_WEIGHT for "${normalizedName}"`,
      );
      return ["FONT_WEIGHT"];
    }

    if (
      normalizedName.includes("lineheight") ||
      normalizedName.includes("line_height") ||
      normalizedName.includes("line-height")
    ) {
      console.log(
        `DEBUG inferScopes - Matched LINE_HEIGHT for "${normalizedName}"`,
      );
      return ["LINE_HEIGHT"];
    }

    if (
      normalizedName.includes("radius") ||
      normalizedName.includes("corner")
    ) {
      console.log(
        `DEBUG inferScopes - Matched CORNER_RADIUS for "${normalizedName}"`,
      );
      return ["CORNER_RADIUS"];
    }

    if (
      normalizedName.includes("width") ||
      normalizedName.includes("height") ||
      normalizedName.includes("sizing") ||
      normalizedName.includes("size")
    ) {
      console.log(
        `DEBUG inferScopes - Matched WIDTH_HEIGHT for "${normalizedName}"`,
      );
      return ["WIDTH_HEIGHT"];
    }

    if (
      normalizedName.includes("spacing") ||
      normalizedName.includes("space") ||
      normalizedName.includes("gap")
    ) {
      console.log(`DEBUG inferScopes - Matched GAP for "${normalizedName}"`);
      return ["GAP"];
    }

    if (normalizedName.includes("opacity")) {
      console.log(
        `DEBUG inferScopes - Matched OPACITY for "${normalizedName}"`,
      );
      return ["OPACITY"];
    }

    if (normalizedName.startsWith("_")) {
      console.log(
        `DEBUG inferScopes - Matched ALL_SCOPES (primitive) for "${normalizedName}"`,
      );
      return ["ALL_SCOPES"];
    }

    console.log(
      `DEBUG inferScopes - Default ALL_SCOPES for "${normalizedName}"`,
    );
    return ["ALL_SCOPES"];
  }

  return ["ALL_SCOPES"];
}

export async function createCollection(
  name: string,
  withModes: boolean = false,
): Promise<{
  collection: VariableCollection;
  modeId: string;
  modeIds?: ModeIds;
}> {

  const existingCollections =
    await figma.variables.getLocalVariableCollectionsAsync();
  const existingCollection = existingCollections.find((c) => c.name === name);

  if (existingCollection) {
    console.log(`DEBUG createCollection - Using existing collection "${name}"`);
    const modeId = existingCollection.modes[0]!.modeId;

    if (withModes) {

      const lightMode = existingCollection.modes.find(
        (m) => m.name.toLowerCase() === "light",
      );
      const darkMode = existingCollection.modes.find(
        (m) => m.name.toLowerCase() === "dark",
      );

      const modeIds: ModeIds = {
        light: lightMode?.modeId || modeId,
        dark: darkMode?.modeId,
      };


      if (!darkMode && existingCollection.modes.length < 4) {
        try {
          const newDarkModeId = existingCollection.addMode("Dark");
          modeIds.dark = newDarkModeId;
          console.log(`DEBUG createCollection - Added Dark mode to "${name}"`);
        } catch (e) {
          console.warn(`Could not add Dark mode: ${e}`);
        }
      }


      if (
        lightMode === undefined &&
        existingCollection.modes[0]?.name === "Mode 1"
      ) {
        existingCollection.renameMode(modeId, "Light");
        console.log(`DEBUG createCollection - Renamed Mode 1 to Light`);
      }

      return { collection: existingCollection, modeId, modeIds };
    }

    return { collection: existingCollection, modeId };
  }

  console.log(`DEBUG createCollection - Creating new collection "${name}"`);
  const collection = figma.variables.createVariableCollection(name);
  const modeId = collection.modes[0]!.modeId;

  if (withModes) {

    collection.renameMode(modeId, "Light");


    const darkModeId = collection.addMode("Dark");

    const modeIds: ModeIds = {
      light: modeId,
      dark: darkModeId,
    };

    console.log(`DEBUG createCollection - Created collection with Light/Dark modes`);
    return { collection, modeId, modeIds };
  }

  return { collection, modeId };
}

export function generateDescription(
  name: string,
  value: string | number,
  type: string,
): string {
  const parts: string[] = [];


  if (type === "COLOR") {
    parts.push(String(value));
  } else if (typeof value === "number") {
    parts.push(`${value}px`);

    if (value > 0) {
      const remValue = value / 16;
      if (remValue === Math.floor(remValue)) {
        parts.push(`${remValue}rem`);
      } else {
        parts.push(`${remValue.toFixed(3).replace(/\.?0+$/, "")}rem`);
      }
    }
  }


  const lowerName = name.toLowerCase();

  if (lowerName.includes("space") || lowerName.includes("spacing")) {

    const match = name.match(/\.(\d+)/);
    if (match) {
      parts.push(`space.${match[1]}`);
    }


    if (typeof value === "number") {
      if (value === 0) parts.push("none", "zero", "reset");
      else if (value <= 4) parts.push("tiny", "xs", "minimal");
      else if (value <= 6) parts.push("small", "sm", "tight");
      else if (value <= 8) parts.push("base", "standard", "default");
      else if (value <= 12) parts.push("small-medium", "sm-md", "compact");
      else if (value <= 16) parts.push("medium", "md", "normal");
      else if (value <= 20) parts.push("medium-large", "md-lg", "relaxed");
      else if (value <= 24) parts.push("large", "lg", "roomy");
      else if (value <= 32) parts.push("extra-large", "xl", "spacious");
      else if (value <= 40) parts.push("2xl", "layout-section", "expansive");
      else if (value <= 48) parts.push("3xl", "substantial");
      else parts.push("4xl", "5xl", "major-section", "extensive");
    }

    parts.push("spacing", "gap", "padding", "margin");
  }

  if (lowerName.includes("radius") || lowerName.includes("corner")) {
    parts.push("radius", "corner", "round");

    if (typeof value === "number") {
      if (value === 0) parts.push("sharp", "square", "angular");
      else if (value <= 4) parts.push("subtle", "slight");
      else if (value <= 8) parts.push("moderate", "standard");
      else if (value >= 999) parts.push("pill", "capsule", "full", "circular");
      else parts.push("rounded", "soft", "generous");
    }
  }

  if (lowerName.includes("size") || lowerName.includes("sizing")) {
    parts.push("size", "dimension", "scale");

    if (lowerName.includes("icon")) {
      parts.push("icon", "glyph", "symbol");
    }
    if (lowerName.includes("component")) {
      parts.push("component", "element");
    }
  }

  return parts.join(", ");
}

export interface ModeValues {
  light?: VariableValue;
  dark?: VariableValue;
}

export function createToken(
  collection: VariableCollection,
  modeId: string,
  type: VariableResolvedDataType,
  name: string,
  value: VariableValue,
  scopes?: string[],
  description?: string,
  existingVariables?: Record<string, Variable>,
  modeIds?: ModeIds,
  modeValues?: ModeValues,
): Variable {
  let token: Variable;

  console.log(
    `DEBUG createToken - name: "${name}", scopes:`,
    scopes,
    `scopes.length: ${scopes?.length}`,
  );
  console.log(
    `DEBUG createToken - existingVariables is:`,
    existingVariables ? `defined (${Object.keys(existingVariables).length} vars)` : "undefined",
  );



  if (existingVariables) {
    console.log(
      `DEBUG createToken - Looking for "${name}" in existingVariables:`,
      existingVariables[name] ? "FOUND" : "NOT FOUND",
    );

    if (existingVariables[name]) {
      console.log(
        `DEBUG createToken - Token "${name}" already exists (exact match), updating...`,
      );
      token = existingVariables[name]!;


      const existingModeIds = Object.keys(token.valuesByMode);
      console.log(
        `DEBUG createToken - Existing modes for "${name}":`,
        existingModeIds,
      );
      console.log(
        `DEBUG createToken - Current import modeId: ${modeId}`,
      );


      if (existingModeIds.length > 0) {
        const targetModeId = existingModeIds.includes(modeId) ? modeId : existingModeIds[0]!;
        console.log(
          `DEBUG createToken - Updating value for mode ${targetModeId}`,
        );

        // Handle mode values (light/dark) when updating existing tokens
        if (modeIds && modeValues) {
          console.log(`DEBUG createToken - Has modeIds and modeValues, updating both modes`);
          if (modeValues.light !== undefined && existingModeIds.includes(modeIds.light)) {
            console.log(`DEBUG createToken - Setting light mode (${modeIds.light}) to:`, modeValues.light);
            token.setValueForMode(modeIds.light, modeValues.light);
          } else {
            console.log(`DEBUG createToken - Setting light mode (${modeIds.light}) to base value:`, value);
            token.setValueForMode(modeIds.light, value);
          }

          if (modeIds.dark && modeValues.dark !== undefined && existingModeIds.includes(modeIds.dark)) {
            console.log(`DEBUG createToken - Setting dark mode (${modeIds.dark}) to:`, modeValues.dark);
            token.setValueForMode(modeIds.dark, modeValues.dark);
          }
        } else {
          // No mode values, just update the single mode
          token.setValueForMode(targetModeId, value);
        }
      } else {
        console.error(
          `DEBUG createToken - No modes found for existing token "${name}"`,
        );
      }


      if (description && description !== token.description) {
        token.description = description;
        console.log(`DEBUG createToken - Updated description for "${name}"`);
      }


      if (scopes) {
        const currentScopes = (token as VariableWithScopes).scopes || [];
        const scopesChanged =
          JSON.stringify(currentScopes.sort()) !==
          JSON.stringify(scopes.sort());
        if (scopesChanged) {
          try {
            (token as VariableWithScopes).scopes = scopes as VariableScope[];
            console.log(
              `DEBUG createToken - Updated scopes for "${name}" to:`,
              scopes,
            );
          } catch (e) {
            console.error(
              `DEBUG createToken - Failed to update scopes for "${name}":`,
              e,
            );
          }
        }
      }

      console.log(
        `DEBUG createToken - Successfully updated existing token "${name}"`,
      );
      return token;
    }


    const dotName = name.replace(/\//g, ".");
    if (existingVariables[dotName]) {
      console.log(
        `DEBUG createToken - Token "${name}" exists as "${dotName}" (dot format), updating...`,
      );
      token = existingVariables[dotName]!;


      const existingModeIds = Object.keys(token.valuesByMode);
      console.log(
        `DEBUG createToken - Existing modes for "${dotName}":`,
        existingModeIds,
      );
      console.log(
        `DEBUG createToken - Current import modeId: ${modeId}`,
      );


      if (existingModeIds.length > 0) {
        const targetModeId = existingModeIds.includes(modeId) ? modeId : existingModeIds[0]!;
        console.log(
          `DEBUG createToken - Updating value for mode ${targetModeId}`,
        );

        // Handle mode values (light/dark) when updating existing tokens
        if (modeIds && modeValues) {
          console.log(`DEBUG createToken - Has modeIds and modeValues, updating both modes`);
          if (modeValues.light !== undefined && existingModeIds.includes(modeIds.light)) {
            console.log(`DEBUG createToken - Setting light mode (${modeIds.light}) to:`, modeValues.light);
            token.setValueForMode(modeIds.light, modeValues.light);
          } else {
            console.log(`DEBUG createToken - Setting light mode (${modeIds.light}) to base value:`, value);
            token.setValueForMode(modeIds.light, value);
          }

          if (modeIds.dark && modeValues.dark !== undefined && existingModeIds.includes(modeIds.dark)) {
            console.log(`DEBUG createToken - Setting dark mode (${modeIds.dark}) to:`, modeValues.dark);
            token.setValueForMode(modeIds.dark, modeValues.dark);
          }
        } else {
          // No mode values, just update the single mode
          token.setValueForMode(targetModeId, value);
        }
      } else {
        console.error(
          `DEBUG createToken - No modes found for existing token "${dotName}"`,
        );
      }


      if (description && description !== token.description) {
        token.description = description;
        console.log(`DEBUG createToken - Updated description for "${dotName}"`);
      }


      if (scopes) {
        const currentScopes = (token as VariableWithScopes).scopes || [];
        const scopesChanged =
          JSON.stringify(currentScopes.sort()) !==
          JSON.stringify(scopes.sort());
        if (scopesChanged) {
          try {
            (token as VariableWithScopes).scopes = scopes as VariableScope[];
            console.log(
              `DEBUG createToken - Updated scopes for "${dotName}" to:`,
              scopes,
            );
          } catch (e) {
            console.error(
              `DEBUG createToken - Failed to update scopes for "${dotName}":`,
              e,
            );
          }
        }
      }

      console.log(
        `DEBUG createToken - Successfully updated existing token "${dotName}"`,
      );
      return token;
    }
  }


  console.log(`DEBUG createToken - Creating token without options`);
  token = figma.variables.createVariable(name, collection, type);
  console.log(
    `DEBUG createToken - Token created, initial scopes:`,
    (token as VariableWithScopes).scopes,
  );


  if (!scopes || scopes.length === 0) {
    console.log(`DEBUG createToken - Setting scopes to [] for primitive`);
    try {
      (token as VariableWithScopes).scopes = [];
      console.log(
        `DEBUG createToken - Successfully set scopes to [], now:`,
        (token as VariableWithScopes).scopes,
      );
    } catch (e) {
      console.error(`DEBUG createToken - Failed to set scopes:`, e);
    }
  } else {

    console.log(`DEBUG createToken - Setting scopes to:`, scopes);
    try {
      (token as VariableWithScopes).scopes = scopes as VariableScope[];
      console.log(
        `DEBUG createToken - Successfully set scopes, now:`,
        (token as VariableWithScopes).scopes,
      );
    } catch (e) {
      console.error(`DEBUG createToken - Failed to set scopes:`, e);
    }
  }

  console.log(
    `DEBUG createToken - Final token scopes:`,
    (token as VariableWithScopes).scopes,
    `resolvedType:`,
    token.resolvedType,
  );


  if (description && description.length > 0) {
    token.description = description;
  }


  if (modeIds && modeValues) {

    if (modeValues.light !== undefined) {
      token.setValueForMode(modeIds.light, modeValues.light);
    } else {
      token.setValueForMode(modeIds.light, value);
    }

    if (modeIds.dark && modeValues.dark !== undefined) {
      token.setValueForMode(modeIds.dark, modeValues.dark);
    }
  } else if (modeIds) {
    token.setValueForMode(modeIds.light, value);
    if (modeIds.dark) {
      token.setValueForMode(modeIds.dark, value);
    }
  } else {
    token.setValueForMode(modeId, value);
  }

  return token;
}

export function createVariableAlias(
  collection: VariableCollection,
  modeId: string,
  key: string,
  valueKey: string,
  allTokens: Record<string, Variable>,
  scopes?: string[],
  modeIds?: ModeIds,
  modeValues?: ModeValues,
  existingVariables?: Record<string, Variable>,
): Variable {
  const token = allTokens[valueKey];

  if (!token) {
    throw new Error(
      `Cannot create alias for "${key}": referenced token "${valueKey}" not found. ` +
        `Ensure "${valueKey}" is defined before "${key}" in your token file.`,
    );
  }

  return createToken(
    collection,
    modeId,
    token.resolvedType,
    key,
    {
      type: "VARIABLE_ALIAS",
      id: token.id,
    },
    scopes,
    undefined,
    existingVariables,
    modeIds,
    modeValues,
  );
}

export function isAlias(value: string | number | DTCGColorValue | DTCGDimensionValue): boolean {

  if (typeof value === "object" && value !== null) {
    return false;
  }
  return value.toString().trim().charAt(0) === "{";
}

export async function getExistingVariables(): Promise<
  Record<string, Variable>
> {
  const variables: Record<string, Variable> = {};
  const collections = await figma.variables.getLocalVariableCollectionsAsync();

  for (const collection of collections) {
    for (const variableId of collection.variableIds) {
      const variable = await figma.variables.getVariableByIdAsync(variableId);
      if (variable) {
        variables[variable.name] = variable;
      }
    }
  }

  return variables;
}

function extractAliasKey(value: string): string {
  return value.trim().replace(/\./g, "/").replace(/[{}]/g, "");
}

function resolveModeValue(
  modeValue: string | number | DTCGColorValue | DTCGDimensionValue | undefined,
  resolvedType: DTCGTokenType | undefined,
  allTokens: Record<string, Variable>,
): VariableValue | undefined {
  if (modeValue === undefined) return undefined;


  if (typeof modeValue === "object" && modeValue !== null && "value" in modeValue && "unit" in modeValue) {
    return (modeValue as { value: number }).value;
  }


  if (typeof modeValue === "string" && modeValue.trim().charAt(0) === "{") {
    const aliasKey = extractAliasKey(modeValue);
    const aliasedToken = allTokens[aliasKey];
    if (aliasedToken) {
      return { type: "VARIABLE_ALIAS", id: aliasedToken.id };
    }

    return undefined;
  }


  if (resolvedType === "color") {
    return parseColor(modeValue as string | DTCGColorValue);
  }


  return modeValue as number;
}

export function traverseToken({
  collection,
  modeId,
  modeIds,
  type,
  key,
  object,
  tokens,
  aliases,
  existingVariables,
  isPrimitivesFile = false,
}: TraverseTokenParams): void {
  console.log(`DEBUG traverseToken - ENTER: key="${key}", hasValue=${object.$value !== undefined}, type=${object.$type || type}, isPrimitivesFile=${isPrimitivesFile}`);
  
  const resolvedType = (type || object.$type) as DTCGTokenType | undefined;

  if (key.charAt(0) === "$") {
    console.log(`DEBUG traverseToken - SKIPPING key starting with $: "${key}"`);
    return;
  }


  const finalKey = key;


  const modeExtensions = object.$extensions?.mode;

  if (object.$value !== undefined) {
    console.log(`DEBUG traverseToken - Processing token with $value: "${finalKey}"`);
    const value = object.$value;

    if (isAlias(value)) {
      const valueKey = value
        .toString()
        .trim()
        .replace(/\./g, "/")
        .replace(/[{}]/g, "");

      const allTokens = { ...existingVariables, ...tokens };
      console.log(`DEBUG traverseToken - Alias check: "${finalKey}" -> "${valueKey}", found=${!!allTokens[valueKey]}`);

      if (allTokens[valueKey]) {


        let scopes: string[] = [];
        if (!isPrimitivesFile && resolvedType) {
          const inferredType = resolvedType === "color" ? "COLOR" : "FLOAT";
          scopes = inferScopes(finalKey, inferredType);
          console.log(
            `DEBUG - Alias token: "${finalKey}", isPrimitivesFile: ${isPrimitivesFile}, inferred scopes:`,
            scopes,
          );
        }


        if (modeIds && modeExtensions) {
          const lightValue = resolveModeValue(
            modeExtensions.light,
            resolvedType,
            allTokens,
          );
          const darkValue = resolveModeValue(
            modeExtensions.dark,
            resolvedType,
            allTokens,
          );


          const lightUnresolved =
            typeof modeExtensions.light === "string" &&
            modeExtensions.light.includes("{") &&
            lightValue === undefined;
          const darkUnresolved =
            typeof modeExtensions.dark === "string" &&
            modeExtensions.dark.includes("{") &&
            darkValue === undefined;

          if (lightUnresolved || darkUnresolved) {

            aliases[finalKey] = {
              key: finalKey,
              type: resolvedType,
              valueKey,
              modeValues: {
                light:
                  typeof modeExtensions.light === "string"
                    ? extractAliasKey(modeExtensions.light)
                    : undefined,
                dark:
                  typeof modeExtensions.dark === "string"
                    ? extractAliasKey(modeExtensions.dark)
                    : undefined,
              },
            };
          } else {
            console.log(`DEBUG traverseToken - Creating mode-aware alias token: "${finalKey}"`);
            tokens[finalKey] = createVariableAlias(
              collection,
              modeId,
              finalKey,
              valueKey,
              allTokens,
              scopes,
              modeIds,
              lightValue && darkValue
                ? { light: lightValue, dark: darkValue }
                : undefined,
              existingVariables,
            );
            console.log(`DEBUG traverseToken - SUCCESS: Created mode-aware alias token "${finalKey}"`);
          }
        } else {
          // Token is mode-agnostic but collection has modes - pass modeIds to set value for ALL modes
          console.log(`DEBUG traverseToken - Creating mode-agnostic alias token: "${finalKey}" with modeIds`);
          tokens[finalKey] = createVariableAlias(
            collection,
            modeId,
            finalKey,
            valueKey,
            allTokens,
            scopes,
            modeIds,  // Pass modeIds even without modeExtensions
            undefined,
            existingVariables,
          );
          console.log(`DEBUG traverseToken - SUCCESS: Created mode-agnostic alias token "${finalKey}"`);
        }
      } else {
        console.log(`DEBUG traverseToken - Adding to aliases: "${finalKey}" -> "${valueKey}" (target not found yet)`);
        aliases[finalKey] = {
          key: finalKey,
          type: resolvedType,
          valueKey,
          modeValues: modeExtensions
            ? {
                light:
                  typeof modeExtensions.light === "string" &&
                  modeExtensions.light.includes("{")
                    ? extractAliasKey(modeExtensions.light)
                    : undefined,
                dark:
                  typeof modeExtensions.dark === "string" &&
                  modeExtensions.dark.includes("{")
                    ? extractAliasKey(modeExtensions.dark)
                    : undefined,
              }
            : undefined,
        };
      }
    } else if (resolvedType === "color") {


      const scopes = isPrimitivesFile ? [] : inferScopes(finalKey, "COLOR");
      console.log(
        `DEBUG - Token: "${finalKey}", isPrimitivesFile: ${isPrimitivesFile}, inferred scopes:`,
        scopes,
      );

      const description =
        object.$description ||
        generateDescription(finalKey, String(value), "color");
      console.log(
        `DEBUG - About to createToken for "${finalKey}" with scopes:`,
        scopes,
      );


      let colorModeValues: ModeValues | undefined;
      if (modeIds && modeExtensions) {
        const allTokens = { ...existingVariables, ...tokens };
        const lightValue = resolveModeValue(
          modeExtensions.light,
          resolvedType,
          allTokens,
        );
        const darkValue = resolveModeValue(
          modeExtensions.dark,
          resolvedType,
          allTokens,
        );
        if (lightValue !== undefined || darkValue !== undefined) {
          colorModeValues = { light: lightValue, dark: darkValue };
        }
      }

      console.log(`DEBUG traverseToken - Creating color token: "${finalKey}"`);
      tokens[finalKey] = createToken(
        collection,
        modeId,
        "COLOR",
        finalKey,
        parseColor(value as string | DTCGColorValue),
        scopes,
        description as string | undefined,
        existingVariables,
        modeIds,
        colorModeValues,
      );
      console.log(`DEBUG traverseToken - SUCCESS: Created color token "${finalKey}"`);
    } else if (resolvedType === "number" || resolvedType === "dimension") {


      const scopes = isPrimitivesFile ? [] : inferScopes(finalKey, "FLOAT");
      console.log(
        `DEBUG - Token: "${finalKey}", isPrimitivesFile: ${isPrimitivesFile}, scopes:`,
        scopes,
      );


      let numericValue: number;
      if (resolvedType === "dimension" && typeof value === "object" && value !== null && "value" in value) {
        numericValue = (value as { value: number }).value;
      } else {
        numericValue = value as number;
      }


      const description =
        object.$description ||
        generateDescription(finalKey, numericValue, "number");


      let numberModeValues: ModeValues | undefined;
      if (modeIds && modeExtensions) {
        const allTokens = { ...existingVariables, ...tokens };
        const lightValue = resolveModeValue(
          modeExtensions.light,
          resolvedType,
          allTokens,
        );
        const darkValue = resolveModeValue(
          modeExtensions.dark,
          resolvedType,
          allTokens,
        );
        if (lightValue !== undefined || darkValue !== undefined) {
          numberModeValues = { light: lightValue, dark: darkValue };
        }
      }

      console.log(`DEBUG traverseToken - Creating number/dimension token: "${finalKey}" with value ${numericValue}`);
      tokens[finalKey] = createToken(
        collection,
        modeId,
        "FLOAT",
        finalKey,
        numericValue,
        scopes,
        description as string | undefined,
        existingVariables,
        modeIds,
        numberModeValues,
      );
      console.log(`DEBUG traverseToken - SUCCESS: Created number/dimension token "${finalKey}"`);
    } else {
      console.log(`DEBUG traverseToken - unsupported type for "${finalKey}":`, resolvedType, object);
    }
  } else if (typeof object === "object" && object !== null) {
    const childKeys = Object.keys(object).filter(k => !k.startsWith('$'));
    console.log(`DEBUG traverseToken - Recursing into "${finalKey}" with ${childKeys.length} children: ${childKeys.slice(0, 5).join(', ')}${childKeys.length > 5 ? '...' : ''}`);
    Object.entries(object).forEach(([key2, object2]) => {
      if (key2.charAt(0) !== "$") {
        const newKey = finalKey ? `${finalKey}/${key2}` : key2;
        traverseToken({
          collection,
          modeId,
          modeIds,
          type: resolvedType,
          key: newKey,
          object: object2 as DTCGToken,
          tokens,
          aliases,
          existingVariables,
          isPrimitivesFile,
        });
      }
    });
  } else {
    console.log(`DEBUG traverseToken - SKIPPING "${finalKey}": not an object and no $value`);
  }
  console.log(`DEBUG traverseToken - EXIT: "${finalKey}"`);
}

export async function processAliases({
  collection,
  modeId,
  modeIds,
  aliases,
  tokens,
  existingVariables,
  isPrimitivesFile = false,
}: ProcessAliasesParams): Promise<void> {
  let pendingAliases: AliasEntry[] = Object.values(aliases);
  let generations = pendingAliases.length;


  console.log("DEBUG - Resolving aliases...");
  console.log(
    "DEBUG - Available existing variables:",
    Object.keys(existingVariables).slice(0, 10),
  );
  console.log(
    "DEBUG - Available new tokens:",
    Object.keys(tokens).slice(0, 10),
  );

  const allTokens = { ...existingVariables, ...tokens };

  while (pendingAliases.length > 0 && generations > 0) {
    const nextRound: AliasEntry[] = [];

    for (const alias of pendingAliases) {
      const { key, type, valueKey, modeValues: aliasModeValues } = alias;
      const token = allTokens[valueKey];

      if (token) {


        let scopes: string[] = [];
        if (!isPrimitivesFile && type) {
          const inferredType = type === "color" ? "COLOR" : "FLOAT";
          scopes = inferScopes(key, inferredType);
          console.log(
            `DEBUG - Resolved alias: "${key}", isPrimitivesFile: ${isPrimitivesFile}, inferred scopes:`,
            scopes,
          );
        }


        let resolvedModeValues: ModeValues | undefined;
        if (modeIds && aliasModeValues) {
          const lightToken = aliasModeValues.light
            ? allTokens[aliasModeValues.light]
            : undefined;
          const darkToken = aliasModeValues.dark
            ? allTokens[aliasModeValues.dark]
            : undefined;

          if (lightToken || darkToken) {
            resolvedModeValues = {
              light: lightToken
                ? { type: "VARIABLE_ALIAS", id: lightToken.id }
                : undefined,
              dark: darkToken
                ? { type: "VARIABLE_ALIAS", id: darkToken.id }
                : undefined,
            };
          }
        }

        const newToken = createVariableAlias(
          collection,
          modeId,
          key,
          token.name,
          allTokens,
          scopes,
          modeIds,
          resolvedModeValues,
          existingVariables,
        );
        tokens[key] = newToken;
        allTokens[key] = newToken;
      } else {
        nextRound.push(alias);
      }
    }

    pendingAliases = nextRound;
    generations--;
  }

  if (pendingAliases.length > 0) {
    console.log(
      "Warning: Could not resolve aliases:",
      pendingAliases.map((a) => a.key),
    );
  }
}
