export const DEFAULT_TOKEN = "bitcoin";

export type Token = {
  id: string;
  name: string;
  symbol: string;
};

export type TokenAutoCompleteItem = Token & {
  label: string;
};