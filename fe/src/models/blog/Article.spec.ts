import {
  IArticle, toArticle, IContentText, toContentText, toContentImage, IContentImage,
} from './Article';

const created = 'created';
const modified = 'modified';

describe('IArticle', () => {
  it('should map `modified` property', () => {
    const content: IContentText = toContentText('content');
    const article: IArticle = toArticle(0, 'title', [content], created, modified);
    expect(article.modified).toEqual(modified);
  });

  it('should create `modified` property when not provided', () => {
    const content: IContentText = toContentText('content');
    const article: IArticle = toArticle(0, 'title', [content], created);
    expect(article.modified).toEqual(created);
  });

  it('should create an article with image', () => {
    const content: IContentImage = toContentImage('hxxps://url');
    const article: IArticle = toArticle(0, 'title', [content], created);
    expect(article.modified).toEqual(created);
  });
  it('should create an article with mixed text and image', () => {
    const imageContent: IContentImage = toContentImage('hxxps://url');
    const textContent: IContentText = toContentText('content');
    const article: IArticle = toArticle(0, 'title', [textContent, imageContent], created);
    expect(article.modified).toEqual(created);
  });
});
