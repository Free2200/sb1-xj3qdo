export interface LoginCredentials {
  host: string;
  username: string;
  password: string;
  port?: number;
}

export interface LoginState {
  isLoading: boolean;
  error: string | null;
  isConnected: boolean;
}