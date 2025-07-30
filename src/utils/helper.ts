function normalizeAlternativeHosts(input?: string[] | string): string | undefined {
  if (!input) return undefined;
  if (Array.isArray(input)) {
    const emails = input.map(e => e.trim()).filter(Boolean);
    return emails.length ? emails.join(",") : undefined;
  }
  const str = input.trim();
  return str ? str : undefined;
}

export default normalizeAlternativeHosts;