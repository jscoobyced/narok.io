import DataService from './data';
import HttpServiceMock from '../http/http.mock';
import { IArticle, toContentText, toArticle } from '../../models/blog/Article';

const createArticle = (title: string, content: string): IArticle => toArticle(
  0,
  title,
  [toContentText(content)],
  '',
);

const getDataService = (mockedValue: IArticle): DataService => {
  const httpService = new HttpServiceMock(mockedValue);
  const dataService = new DataService(httpService);
  return dataService;
};

describe('data service', () => {
  const mockSuccessResponse: IArticle = createArticle('Hello, World!', 'This is content');
  it('should return blog data', async () => {
    const result = await getDataService(mockSuccessResponse).getHomePageBlog();
    expect(result).toEqual(mockSuccessResponse);
  });

  it('should return homepage blog data', async () => {
    const result = await getDataService(mockSuccessResponse).getBlogsByPage(0, 5);
    expect(result).toEqual(mockSuccessResponse);
  });
});
