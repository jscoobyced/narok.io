import DataService from './data';
import HttpServiceMock from '../http/http.mock';
import { Article, toArticle, toBlogContentText } from '../../models/blog/Article';

const createArticle = (title: string, content: string): Article => toArticle(
  0,
  title,
  [toBlogContentText(content)],
  '',
);

const getDataService = (mockedValue: Article): DataService => {
  const httpService = new HttpServiceMock(mockedValue);
  const dataService = new DataService('development', httpService);
  return dataService;
};

describe('data service', () => {
  const mockSuccessResponse: Article = createArticle('Hello, World!', 'This is content');
  it('should return blog data', async () => {
    const result = await getDataService(mockSuccessResponse).getHomePageBlog();
    expect(result).toEqual(mockSuccessResponse);
  });

  it('should return homepage blog data', async () => {
    const result = await getDataService(mockSuccessResponse).getBlogsByPage(0, 5);
    expect(result).toEqual(mockSuccessResponse);
  });
});
