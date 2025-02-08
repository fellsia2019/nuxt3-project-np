export type TPaginationResponse<T> = {
  pagination: IPaginationApi;
  results: T;
}

export interface IPaginationApi {
  count: number;
  next: string | null;
  previous: string | null;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
}

export interface IFetchResponse<T> {
  ok: boolean;
  status: number;
  data: T;
}
