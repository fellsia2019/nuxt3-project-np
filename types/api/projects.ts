export interface IProject {
  id: number;
  initiative_ids: Array<number>;
  title: string;
  content: string;
  time_create: number;
  time_update: number;
  is_published: boolean;
  image: null | string;
}
