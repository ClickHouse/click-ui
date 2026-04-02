export type DTCGTokenType = "color" | "number" | "dimension";

export interface DTCGDimensionValue {
  value: number;
  unit: "px" | "rem" | string;
}

export interface DTCGColorValue {
  colorSpace: "hsl" | "srgb" | "p3" | "display-p3" | "rec2020" | string;
  components: [number, number, number];
  alpha?: number;
  hex?: string;
}

export interface DTCGModeExtensions {
  light?: string | number | DTCGColorValue | DTCGDimensionValue;
  dark?: string | number | DTCGColorValue | DTCGDimensionValue;
}

export interface DTCGExtensions {
  mode?: DTCGModeExtensions;
  [key: string]: unknown;
}

export interface DTCGToken {
  $type?: DTCGTokenType;
  $value?: string | number | DTCGColorValue | DTCGDimensionValue;
  $description?: string;
  $extensions?: DTCGExtensions;
  [key: string]:
    | DTCGToken
    | DTCGTokenType
    | string
    | number
    | DTCGColorValue
    | DTCGDimensionValue
    | DTCGExtensions
    | undefined;
}

export interface DTCGTokenFile {
  [key: string]: DTCGToken;
}

export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export interface RGBAColor extends RGBColor {
  a?: number;
}

export interface ImportMessage {
  type: "IMPORT";
  fileName: string;
  body: string;
}

export interface ExportMessage {
  type: "EXPORT";
}

export interface ExportResultMessage {
  type: "EXPORT_RESULT";
  files: ExportedFile[];
}

export interface ExportedFile {
  fileName: string;
  body: Record<string, unknown>;
}

export interface GetCollectionsMessage {
  type: "GET_COLLECTIONS";
}

export interface CollectionsListMessage {
  type: "COLLECTIONS_LIST";
  collections: Array<{ name: string; variableCount: number }>;
}

export interface ImportCompleteMessage {
  type: "IMPORT_COMPLETE";
  wasUpdate: boolean;
  collectionName: string;
  tokenCount: number;
}

export interface ImportErrorMessage {
  type: "IMPORT_ERROR";
  error: string;
}

export type PluginMessage =
  | ImportMessage
  | ExportMessage
  | ExportResultMessage
  | GetCollectionsMessage
  | CollectionsListMessage
  | ImportCompleteMessage
  | ImportErrorMessage;

export interface AliasEntry {
  key: string;
  type: DTCGTokenType | undefined;
  valueKey: string;
  modeValues?: {
    light?: string;
    dark?: string;
  };
}

export interface ModeIds {
  light: string;
  dark?: string;
}

export interface TraverseTokenParams {
  collection: VariableCollection;
  modeId: string;
  modeIds?: ModeIds;
  type: DTCGTokenType | undefined;
  key: string;
  object: DTCGToken;
  tokens: Record<string, Variable>;
  aliases: Record<string, AliasEntry>;
  existingVariables: Record<string, Variable>;
  isPrimitivesFile?: boolean;
}

export interface ProcessAliasesParams {
  collection: VariableCollection;
  modeId: string;
  modeIds?: ModeIds;
  aliases: Record<string, AliasEntry>;
  tokens: Record<string, Variable>;
  existingVariables: Record<string, Variable>;
  isPrimitivesFile?: boolean;
}
