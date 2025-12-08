/**
 * Capitalizes the first letter of a string and converts kebab-case to PascalCase
 * @param str - The string to capitalize
 * @returns The string with the first letter capitalized and kebab-case converted to PascalCase
 * @example
 * capitalize('hello') // 'Hello'
 * capitalize('WORLD') // 'WORLD'
 * capitalize('') // ''
 * capitalize('space-between') // 'SpaceBetween'
 * capitalize('space-around') // 'SpaceAround'
 */
export const capitalize = (str: string): string => {
  if (!str) return str;

  // Convert kebab-case to PascalCase
  return str
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
};
