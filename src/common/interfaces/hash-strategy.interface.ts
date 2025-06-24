export interface HashStrategy {
  hash(payload: string): Promise<string>;
  compare(raw: string, hashed: string): Promise<boolean>;
}
