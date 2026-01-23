import type { Plugin } from "vite";
import path from "path";

// Used claude as POC

/**
 * Vite plugin that transforms TypeScript path aliases (like @/) to relative paths in the build output.
 * This is necessary for unbundled library builds where consumers need proper relative imports.
 */
export const resolveTsconfigPathsToRelative = (): Plugin => {
  return {
    name: "resolve-tsconfig-paths-to-relative",
    enforce: "post",
    apply: "build",
    generateBundle(options, bundle) {
      for (const fileName in bundle) {
        const chunk = bundle[fileName];

        if (chunk.type === "chunk" && chunk.code) {
          chunk.code = chunk.code.replace(
            /(from|import)\s+['"]@\/([^'"]+)['"]/g,
            (match, keyword, importPath) => {
              const currentFileDir = path.dirname(fileName);
              const targetPath = importPath;
              let relativePath = path.relative(currentFileDir, targetPath);

              if (relativePath === "") {
                const targetFileName = path.basename(importPath);
                relativePath = "./" + targetFileName;
              } else {
                relativePath = relativePath.split(path.sep).join("/");

                if (!relativePath.startsWith(".")) {
                  relativePath = "./" + relativePath;
                }
              }

              const potentialIndexPath = targetPath + "/index.js";
              const hasIndexFile = Object.keys(bundle).some(
                f => f === potentialIndexPath
              );

              if (hasIndexFile) {
              } else {
                if (!relativePath.endsWith(".js") && !relativePath.endsWith("/")) {
                  relativePath += ".js";
                }
              }

              return `${keyword} '${relativePath}'`;
            }
          );
        }
      }
    },
  };
}

export default resolveTsconfigPathsToRelative;
