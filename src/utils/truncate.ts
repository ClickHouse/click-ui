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
  maxLength: number = 40,
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
