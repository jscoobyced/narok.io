export interface Article {
  id: number;
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
  title: string,
  contents: BlogContent[],
  created: string,
  modified?: string): Article => {
  const modifiedDate = (!modified) ? created : modified;
  return {
    id,
    title,
    contents,
    created,
    modified: modifiedDate,
  };
};

const toBlogContent = (value: string, contentType: BlogContentType, align?: Align, altText?: string): BlogContent => {
  const computedAlign = align || Align.Left;
  return ({
    value, contentType, align: computedAlign, altText,
  });
};

export const toBlogContentText = (
  value: string, align?: Align, altText?: string,
): BlogContent => toBlogContent(
  value, BlogContentType.Text, align, altText,
);

export const toBlogContentImage = (
  value: string, align?: Align, altText?: string,
): BlogContent => toBlogContent(
  value, BlogContentType.Image, align, altText,
);
