import {
  ArticleData, toArticle, toBlogContentText, BlogContent, toBlogContentImage,
} from './ArticleData';
import { User } from '../User';

const created = 'created';
const modified = 'modified';
const owner: User = { id: '12345678', name: 'Administrator' };

describe('IArticle', () => {
  it('should map `modified` property', () => {
    const content: BlogContent = toBlogContentText('content');
    const article: ArticleData = toArticle(0, owner, 'title', [content], created, modified);
    expect(article.modified).toEqual(modified);
  });

  it('should create `modified` property when not provided', () => {
    const content: BlogContent = toBlogContentText('content');
    const article: ArticleData = toArticle(0, owner, 'title', [content], created);
    expect(article.modified).toEqual(created);
  });

  it('should create an article with image', () => {
    const content: BlogContent = toBlogContentImage('hxxps://url');
    const article: ArticleData = toArticle(0, owner, 'title', [content], created);
    expect(article.modified).toEqual(created);
  });

  it('should create an article with mixed text and image', () => {
    const imageContent: BlogContent = toBlogContentImage('hxxps://url');
    const textContent: BlogContent = toBlogContentText('content');
    const article: ArticleData = toArticle(0, owner, 'title', [textContent, imageContent], created);
    expect(article.modified).toEqual(created);
  });
});
