import {
  Article, toArticle, toBlogContentText, BlogContent, toBlogContentImage,
} from './Article';

const created = 'created';
const modified = 'modified';

describe('IArticle', () => {
  it('should map `modified` property', () => {
    const content: BlogContent = toBlogContentText('content');
    const article: Article = toArticle(0, 'title', [content], created, modified);
    expect(article.modified).toEqual(modified);
  });

  it('should create `modified` property when not provided', () => {
    const content: BlogContent = toBlogContentText('content');
    const article: Article = toArticle(0, 'title', [content], created);
    expect(article.modified).toEqual(created);
  });

  it('should create an article with image', () => {
    const content: BlogContent = toBlogContentImage('hxxps://url');
    const article: Article = toArticle(0, 'title', [content], created);
    expect(article.modified).toEqual(created);
  });
  it('should create an article with mixed text and image', () => {
    const imageContent: BlogContent = toBlogContentImage('hxxps://url');
    const textContent: BlogContent = toBlogContentText('content');
    const article: Article = toArticle(0, 'title', [textContent, imageContent], created);
    expect(article.modified).toEqual(created);
  });
});
