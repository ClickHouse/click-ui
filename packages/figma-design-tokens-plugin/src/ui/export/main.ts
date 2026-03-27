interface ExportedFile {
  fileName: string;
  body: Record<string, unknown>;
}

interface ExportResultMessage {
  type: "EXPORT_RESULT";
  files: ExportedFile[];
}

window.onmessage = ({
  data,
}: MessageEvent<{ pluginMessage: ExportResultMessage }>) => {
  const { pluginMessage } = data;

  if (pluginMessage.type === "EXPORT_RESULT") {
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement;
    textarea.value = pluginMessage.files
      .map(
        ({ fileName, body }) =>
          `/* ${fileName} */\n\n${JSON.stringify(body, null, 2)}`
      )
      .join("\n\n\n");
  }
};

document.getElementById("export")!.addEventListener("click", () => {
  parent.postMessage({ pluginMessage: { type: "EXPORT" } }, "*");
});
