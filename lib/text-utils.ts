export function containsPersianArabic(text: string): boolean {
  const persianArabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/
  return persianArabicRegex.test(text)
}
