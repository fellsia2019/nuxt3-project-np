export interface IApiService {
  domain: string;
  routes: { [key: string]: string };
}

export interface IDomain {
  secure: boolean;
  port?: number;
  domain: string;
  prefix: string;
}
