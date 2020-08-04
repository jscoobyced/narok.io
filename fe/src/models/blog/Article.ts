import { User } from '../User';

export interface Article {
  id: number;
  owner: User;
  title: string;
  contents: BlogContent[];
  created: string;
  modified: string;
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
  align?: Align,
  altText?: string
}

export const toArticle = (id: number,
  owner: User,
  title: string,
  contents: BlogContent[],
  created: string,
  modified?: string): Article => {
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
    id, value, contentType, align: computedAlign, altText,
  });
};

export const toBlogContentText = (
  value: string, align?: Align, altText?: string, id?: number,
): BlogContent => toBlogContent(
  value, BlogContentType.Text, align, altText, id,
);

export const toBlogContentImage = (
  value: string, align?: Align, altText?: string,
): BlogContent => toBlogContent(
  value, BlogContentType.Image, align, altText,
);
