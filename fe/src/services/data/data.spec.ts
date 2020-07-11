import DataService from './data';
import HttpServiceMock from '../http/http.mock';
import { Article, toArticle, toBlogContentText } from '../../models/blog/Article';
import { User } from '../../models/User';

const owner: User = { id: '12345678', name: 'Administrator' };

const createArticle = (title: string, content: string): Article => toArticle(
  0,
  owner,
  title,
  [toBlogContentText(content)],
  '',
);

beforeEach(() => {
  jest.resetAllMocks();
});

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

  it('should fetch on secure URL', async () => {
    const httpService = new HttpServiceMock(mockSuccessResponse);
    const dataService = new DataService('production', httpService);
    const result = await dataService.getBlogsByPage(0, 5);
    expect(result).toEqual(mockSuccessResponse);
  });
});
