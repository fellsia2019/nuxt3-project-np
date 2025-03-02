export enum HttpMethod {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATH',
	DELETE = 'DELETE',
	HEAD = 'DEAD',
	OPTIONS = 'OPTIONS',
}

export interface IApiService {
	domain: string
	routes: { [key: string]: { path: string, allowOnlyWithAuth: Array<HttpMethod> } }
}

export interface IDomain {
	secure: boolean
	port?: number
	domain: string
	prefix: string
}
