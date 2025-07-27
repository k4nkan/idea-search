export function generateQuery(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';
  return `アイデア：「${trimmed}」に関連する実在するアプリやプロダクト`;
}
