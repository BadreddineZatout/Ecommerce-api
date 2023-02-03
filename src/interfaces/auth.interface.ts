export interface IAuthPayload {
  username: string;
  isSeller: boolean;
  iat?: number;
  expiresIn?: string;
}
