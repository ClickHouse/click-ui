const DEFAULT_MAX_LEN = 40;
const DEFAULT_DELIMITER = "...";

/**
 * truncateFilename
 *
 * On occasion, we may be dealing with filenames - which could be very large
 * and not practical to display in the user interface. This utility func
 * ensures that we return a name that looks recognisable and fits the
 * component using the data.
 *
 * @param filename
 * @param maxLength
 * @param delimiter
 */
export const truncateFilename = (
  filename: string,
  maxLength: number = DEFAULT_MAX_LEN,
  delimiter: string = "~"
): string => {
  if (filename.length <= maxLength) {
    return filename;
  }

  if (filename.startsWith(".")) {
    return `${filename.slice(0, maxLength)}${delimiter}`;
  }

  const extension =
    filename.lastIndexOf(".") !== -1 ? filename.slice(filename.lastIndexOf(".")) : "";

  const nameWithoutExtension = extension
    ? filename.slice(0, filename.lastIndexOf("."))
    : filename;

  const truncatedName = nameWithoutExtension.slice(0, maxLength) + delimiter;
  return truncatedName + extension;
};

export const shortenMiddle = (filename: string, maxLen: number = DEFAULT_MAX_LEN) => {
  if (filename.length <= maxLen) return filename;

  const lastDotIndex = filename.lastIndexOf(".");
  const hasExtension = lastDotIndex > 0 && lastDotIndex < filename.length - 1;

  if (!hasExtension) {
    const charsToShow = maxLen - DEFAULT_DELIMITER.length;
    const frontChars = Math.ceil(charsToShow / 2);
    const backChars = Math.floor(charsToShow / 2);
    return `${filename.slice(0, frontChars)}${DEFAULT_DELIMITER}${filename.slice(-backChars)}`;
  }

  const name = filename.slice(0, lastDotIndex);
  const extension = filename.slice(lastDotIndex);

  const availableLength = maxLen - extension.length - DEFAULT_DELIMITER.length;

  if (availableLength <= 0)
    return `${filename.slice(0, maxLen - DEFAULT_DELIMITER.length)}${DEFAULT_DELIMITER}`;

  const frontChars = Math.ceil(availableLength / 2);
  const backChars = Math.floor(availableLength / 2);

  return `${name.slice(0, frontChars)}${DEFAULT_DELIMITER}${name.slice(-backChars)}${extension}`;
};
