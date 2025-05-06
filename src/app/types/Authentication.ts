export interface AuthenticationProps {
  username: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}
