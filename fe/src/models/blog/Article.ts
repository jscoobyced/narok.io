export interface IArticle {
  id: number;
  title: string;
  contents: IContent[];
  created: string;
  modified: string;
}

export type IContentText = {
  kind: 'text',
  text: string
};

export enum Align {
  Left = 'left', Right = 'right', Center = 'center'
}

export type IContentImage = {
  kind: 'image',
  source: string,
  align?: Align,
  altText?: string
};

export type IContent = IContentText | IContentImage;

export const toArticle = (id: number,
  title: string,
  contents: IContent[],
  created: string,
  modified?: string): IArticle => {
  const modifiedDate = (!modified) ? created : modified;
  return {
    id,
    title,
    contents,
    created,
    modified: modifiedDate,
  };
};

export const toContentText = (text: string): IContentText => ({ text, kind: 'text' });
export const toContentImage = (source: string, align?: Align, altText?: string): IContentImage => {
  const computedAlign = align || Align.Left;
  return ({
    source, kind: 'image', align: computedAlign, altText,
  });
};
