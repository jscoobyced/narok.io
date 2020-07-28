export interface User {
    id: string;
    name: string;
    givenName?: string;
    familyName?: string;
    imageUrl?: string;
    email?: string;
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

export const toUser = (id: string,
  name: string,
  givenName: string,
  familyName: string,
  email: string,
  imageUrl?: string): User => ({
  id, name, givenName, familyName, email, imageUrl,
});

export const toAuthToken = (accessToken: string,
  scope: string,
  expiresIn?: number,
  expiresAt?: number): AuthToken => ({
  accessToken, scope, expiresIn, expiresAt,
});

export const toSecureUser = (id: string,
  name: string,
  givenName: string,
  familyName: string,
  email: string,
  accessToken: string,
  scope: string,
  imageUrl?: string,
  expireIn?: number,
  expiresAt?: number): SecureUser => ({
  user: toUser(id, name, givenName, familyName, email, imageUrl),
  authToken: toAuthToken(accessToken, scope, expireIn, expiresAt),
});

export const newSecureUser = (): SecureUser => toSecureUser(
  '', '', '', '', '', '', '', '', 0, 0,
);
