export const escapeSpecialChars = (string: string) =>
  string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
