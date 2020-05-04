export interface IArticle {
    title: string;
    contents: string[];
    created: string;
    modified: string;
}

export const toArticle = (title: string,
  contents: string[],
  created: string,
  modified?: string): IArticle => {
  const modifiedDate = (!modified) ? created : modified;
  return {
    title,
    contents,
    created,
    modified: modifiedDate,
  };
};
