export const generateQuery = (keywords: string[]): string => {
  const filtered = keywords.filter(Boolean);
  if (filtered.length === 0) return '';

  const type = filtered[0];
  const tags = filtered.slice(1);

  if (tags.length === 0) {
    return `「${type}」に関するアイデアまたはプロダクトを探して欲しい。`;
  }

  return `「${type}」で、以下の要素を含むアイデアまたはプロダクトを探して欲しい：「${tags.join(
    '」「'
  )}」まとめサイトは除外。`;
};
