import { User } from '../User';

export interface ArticleData {
  id: number;
  owner: User;
  title: string;
  contents: BlogContent[];
  created: string;
  modified: string;
  status?: number;
}

export interface ArticleResponse {
  articles: ArticleData[];
  count: number;
}

export enum Align {
  Left = 'left', Right = 'right', Center = 'center'
}

export enum BlogContentType {
  Text = 'text', Image = 'image'
}

export interface BlogContent {
  id: number;
  contentType: BlogContentType;
  value: string;
  align?: Align;
  altText?: string;
  blogId?: number;
  status?: number;
}

export const toArticle = (id: number,
  owner: User,
  title: string,
  contents: BlogContent[],
  created: string,
  modified?: string): ArticleData => {
  const modifiedDate = (!modified) ? created : modified;
  return {
    id,
    owner,
    title,
    contents,
    created,
    modified: modifiedDate,
  };
};

const toBlogContent = (
  value: string,
  contentType: BlogContentType,
  align?: Align,
  altText?: string,
  id?: number,
): BlogContent => {
  const computedAlign = align || Align.Left;
  return ({
    id, value, contentType, align: computedAlign, altText, blogId: 0, status: 0,
  });
};

export const toBlogContentText = (
  value: string, align?: Align, altText?: string, id?: number,
): BlogContent => toBlogContent(
  value, BlogContentType.Text, align, altText, id,
);

export const toBlogContentImage = (
  value: string, align?: Align, altText?: string, id?: number,
): BlogContent => toBlogContent(
  value, BlogContentType.Image, align, altText, id,
);

export const sortById = (content1: any, content2: any) => {
  if (content1.id > content2.id) return 1;
  if (content1.id === content2.id) return 0;
  return -1;
};

export const sortByInverseId = (content1: any, content2: any) => {
  if (content1.id > content2.id) return -1;
  if (content1.id === content2.id) return 0;
  return 1;
};
