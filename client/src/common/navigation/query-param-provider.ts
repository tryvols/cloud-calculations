
export class QueryParamProvider {
  constructor(
    private readonly name: string,
    private readonly query: URLSearchParams,
    private readonly defaultValue: string,
  ) {}

  get(): string {
    return this.query.get(this.name) || this.defaultValue;
  }

  set(value: string): void {
    this.query.set(this.name, value);
  }

  reset(): void {
    this.query.set(this.name, this.defaultValue);
  }
}
