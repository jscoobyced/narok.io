import { IArticle, toArticle } from './Article';

const created = 'created';
const modified = 'modified';

describe('IArticle', () => {
  it('should map `modified` property', () => {
    const article: IArticle = toArticle('title', 'content', created, modified);
    expect(article.modified).toEqual(modified);
  });
  it('should create `modified` property when not provided', () => {
    const article: IArticle = toArticle('title', 'content', created);
    expect(article.modified).toEqual(created);
  });
});
