declare namespace Express {
  export interface Request {
    user?: {
      id: number;
      username: string;
      sub: number;
    };
  }
}
