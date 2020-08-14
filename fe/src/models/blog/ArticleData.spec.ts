import {
  ArticleData, toArticle, toBlogContentText, BlogContent, toBlogContentImage, Align, sortBlogContentById,
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

  const content1 = toBlogContentText('text', Align.Left, 'whatever', 1);
  const content2: BlogContent = toBlogContentImage('hxxps://url', Align.Left, '', 2);
  const content3 = toBlogContentText('text', Align.Left, 'whatever', 3);
  const content4 = toBlogContentText('text', Align.Left, 'whatever', 4);
  let nextId = 1;

  it('should keep proper sorting of BlogContent by id', () => {
    nextId = 1;
    const contents = [content1, content2, content3, content4].sort(sortBlogContentById);
    contents.forEach(content => {
      expect(content.id).toEqual(nextId);
      nextId += 1;
    });
  });

  it('should sort BlogContent by id', () => {
    nextId = 1;
    const contents = [content3, content2, content4, content1].sort(sortBlogContentById);
    contents.forEach(content => {
      expect(content.id).toEqual(nextId);
      nextId += 1;
    });
  });
});
