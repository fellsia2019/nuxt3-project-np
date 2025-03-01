export interface IProject {
  id: number;
  initiative_ids: Array<number>;
  title: string;
  content: string;
  detail_text: string;
  time_create: number;
  time_update: number;
  is_published: boolean;
  image: null | string;
  image_webp: null | string;
  image_detail: null | string;
  image_detail_webp: null | string;
}
