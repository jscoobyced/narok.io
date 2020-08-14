export interface User {
  id: number;
  name: string;
  email?: string;
  referenceId?: string;
}

export interface AuthToken {
  accessToken: string;
  scope: string;
  expiresIn?: number;
  expiresAt?: number;
}

export interface SecureUser {
  user: User;
  authToken: AuthToken;
}

export const toUser = (id: number,
  name: string,
  email: string,
  referenceId?: string): User => ({
  id, name, email, referenceId,
});

export const toAuthToken = (accessToken: string,
  scope: string,
  expiresIn?: number,
  expiresAt?: number): AuthToken => ({
  accessToken, scope, expiresIn, expiresAt,
});

export const toSecureUser = (id: number,
  name: string,
  email: string,
  referenceId: string,
  accessToken: string,
  scope: string,
  expireIn?: number,
  expiresAt?: number): SecureUser => ({
  user: toUser(id, name, email, referenceId),
  authToken: toAuthToken(accessToken, scope, expireIn, expiresAt),
});

export const newSecureUser = (): SecureUser => toSecureUser(
  0, '', '', '', '', '', 0, 0,
);
