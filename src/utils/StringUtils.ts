export const StringCutter = (
  text: string,
  limit = 9999,
  addedText?: string,
) => {
  if (!text) return ''
  return text.length > limit
    ? text.substring(0, limit) + (addedText || '')
    : text
}
