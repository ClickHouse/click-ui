interface CollectionInfo {
  name: string;
  variableCount: number;
}

let existingCollections: CollectionInfo[] = [];
let fileContent = "";

function isValidJSON(body: string): boolean {
  try {
    JSON.parse(body);
    return true;
  } catch {
    return false;
  }
}

function updateCollectionStatus(inputValue: string) {
  const statusEl = document.getElementById(
    "collectionStatus",
  ) as HTMLSpanElement;
  const trimmedValue = inputValue.trim();

  if (!trimmedValue) {
    statusEl.style.display = "none";
    return;
  }

  const existing = existingCollections.find(
    (c) => c.name.toLowerCase() === trimmedValue.toLowerCase(),
  );

  if (existing) {
    statusEl.textContent = `⚠️ ${existing.variableCount} variables ready to update. Import to apply.`;
    statusEl.className = "collection-status update";
    statusEl.style.display = "inline-flex";
  } else {
    statusEl.textContent = "✨ New collection ready to create";
    statusEl.className = "collection-status new";
    statusEl.style.display = "inline-flex";
  }

  updateButtonState();
}

const DEFAULT_CREATE_COLLECTION_TXT = "Create Collection";
const DEFAULT_UPDATE_COLLECTION_TXT = "Update Collection";

function updateButtonState() {
  const collectionInput = document.getElementById(
    "collectionInput",
  ) as HTMLInputElement;
  const button = document.getElementById("submitBtn") as HTMLButtonElement;
  const hasCollection = collectionInput.value.trim().length > 0;
  const hasFile = fileContent.length > 0;

  if (!hasCollection) {
    button.textContent = DEFAULT_CREATE_COLLECTION_TXT;
    button.disabled = true;
    return;
  }

  const existing = existingCollections.find(
    (c) => c.name.toLowerCase() === collectionInput.value.trim().toLowerCase(),
  );

  if (existing) {
    button.textContent = DEFAULT_UPDATE_COLLECTION_TXT;
  } else {
    button.textContent = DEFAULT_CREATE_COLLECTION_TXT;
  }

  button.disabled = !hasFile;
}

function populateCollectionsList(collections: CollectionInfo[]) {
  existingCollections = collections;
  const datalist = document.getElementById(
    "collectionsList",
  ) as HTMLDataListElement;
  datalist.innerHTML = "";

  collections.forEach((collection) => {
    const option = document.createElement("option");
    option.value = collection.name;
    option.textContent = `${collection.name} (${collection.variableCount} variables)`;
    datalist.appendChild(option);
  });
}

function updateFileUI(fileName: string | null) {
  const dropZone = document.getElementById("fileDropZone") as HTMLDivElement;
  const fileNameEl = document.getElementById("fileName") as HTMLSpanElement;
  const fileText = dropZone.querySelector(".file-text") as HTMLSpanElement;

  if (fileName) {
    dropZone.classList.add("has-file");
    fileNameEl.textContent = fileName;
    fileNameEl.style.display = "block";
    fileText.textContent = "File ready for import";
  } else {
    dropZone.classList.remove("has-file");
    fileNameEl.style.display = "none";
    fileText.textContent = "Click to upload or drag and drop";
  }
}

parent.postMessage({ pluginMessage: { type: "GET_COLLECTIONS" } }, "*");

window.addEventListener("message", (event) => {
  if (event.data.pluginMessage?.type === "COLLECTIONS_LIST") {
    populateCollectionsList(event.data.pluginMessage.collections);
  }
});

const collectionInput = document.getElementById(
  "collectionInput",
) as HTMLInputElement;
collectionInput.addEventListener("input", (e) => {
  updateCollectionStatus((e.target as HTMLInputElement).value);
});

const fileInput = document.getElementById("fileInput") as HTMLInputElement;
const fileDropZone = document.getElementById("fileDropZone") as HTMLDivElement;

fileInput.addEventListener("change", async (e) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) {
    fileContent = await file.text();
    updateFileUI(file.name);
    updateButtonState();
  }
});

fileDropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  fileDropZone.classList.add("drag-over");
});

fileDropZone.addEventListener("dragleave", () => {
  fileDropZone.classList.remove("drag-over");
});

fileDropZone.addEventListener("drop", async (e) => {
  e.preventDefault();
  fileDropZone.classList.remove("drag-over");

  const files = e.dataTransfer?.files;
  if (files && files.length > 0) {
    const file = files[0];
    if (
      file &&
      (file.type === "application/json" || file.name.endsWith(".json"))
    ) {
      fileContent = await file.text();
      updateFileUI(file.name);
      const dt = new DataTransfer();
      dt.items.add(file);
      fileInput.files = dt.files;
      updateButtonState();
    } else {
      alert("Please upload a JSON file (.json or .dtcg.json)");
    }
  }
});

updateButtonState();

document.querySelector("form")!.addEventListener("submit", (e) => {
  e.preventDefault();

  const fileName = collectionInput.value.trim();

  if (!fileName) {
    alert("Please enter a collection name");
    return;
  }

  if (!fileContent) {
    alert("Please select a JSON file");
    return;
  }

  if (!isValidJSON(fileContent)) {
    alert("Invalid JSON file");
    return;
  }

  const button = document.getElementById("submitBtn") as HTMLButtonElement;
  button.disabled = true;
  button.textContent = "Importing...";

  parent.postMessage(
    { pluginMessage: { fileName, body: fileContent, type: "IMPORT" } },
    "*",
  );
});

window.addEventListener("message", (event) => {
  const msg = event.data.pluginMessage;
  if (!msg) return;

  if (msg.type === "IMPORT_COMPLETE") {

    const successBanner = document.getElementById(
      "successBanner",
    ) as HTMLDivElement;
    const successText = document.getElementById(
      "successText",
    ) as HTMLSpanElement;
    const button = document.querySelector(
      "button[type=submit]",
    ) as HTMLButtonElement;
    const collectionInput = document.getElementById(
      "collectionInput",
    ) as HTMLInputElement;

    const action = msg.wasUpdate ? "updated" : "created";
    successText.textContent = `Successfully ${action} '${msg.collectionName}' with ${msg.tokenCount} tokens`;
    successBanner.classList.add("show");

    setTimeout(() => {
      successBanner.classList.remove("show");
    }, 5000);


    button.disabled = false;
    updateCollectionStatus(collectionInput.value);


    fileContent = "";
    updateFileUI(null);
    fileInput.value = "";


    parent.postMessage({ pluginMessage: { type: "GET_COLLECTIONS" } }, "*");
  } else if (msg.type === "IMPORT_ERROR") {
    const button = document.querySelector(
      "button[type=submit]",
    ) as HTMLButtonElement;
    const collectionInput = document.getElementById(
      "collectionInput",
    ) as HTMLInputElement;

    button.disabled = false;
    updateCollectionStatus(collectionInput.value);

    alert(`Import failed: ${msg.error}`);
  }
});
