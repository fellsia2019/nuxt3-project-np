export interface IInitiative {
  id: number;
  article_ids: Array<number>;
  title: string;
  content: string;
  detail_text: string;
  time_create: number;
  time_update: number;
  is_published: boolean;
  image: null | string;
  image_webp: null | string;
}
