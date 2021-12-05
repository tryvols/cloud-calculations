
const key = 'auth-token';

export interface ITokenData {
  token: string;
  expiresAt: number;
}

class TokenService {
  private data: ITokenData = {
    token: '',
    expiresAt: 0,
  };

  constructor() {
    this.readToken();
  }

  set(tokenData: ITokenData): void {
    this.data = tokenData;
    this.writeToken();
  }

  get(): string {
    return this.isValid ? this.data.token : '';
  }

  isValid(): boolean {
    return this.data.expiresAt > Date.now();
  }

  clear(): void {
    localStorage.removeItem(key);
    this.data = { token: '', expiresAt: 0 };
  }

  private readToken(): void {
    this.data = JSON.parse(localStorage.getItem(key) || '{}');
  }

  private writeToken(): void {
    localStorage.setItem(key, JSON.stringify(this.data));
  }
}

export const Token = new TokenService();
