export const StringCutter = (text: string, limit = 18) => {
  return text.length > limit ? text.substring(0, limit) : text;
};
