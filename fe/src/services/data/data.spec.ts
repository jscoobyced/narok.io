import DataService from './data';
import { Article, toArticle, toBlogContentText } from '../../models/blog/Article';
import { User } from '../../models/User';
import DataServiceMock from './data.mock';
import HttpService, { HttpResponse } from '../http/http';

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

class HttpServiceMock extends HttpService {
  private data: any;

  constructor(data: any) {
    super();
    this.data = data;
  }

  public fetchData = async <T>(url: string): Promise<HttpResponse<T>> => {
    const httpResponse: HttpResponse<T> = {
      data: this.data,
    };
    return Promise.resolve(httpResponse);
  }

  public postData = async <T>(url: string, value: any):
    Promise<HttpResponse<T>> => Promise.resolve(this.data)

  public putData = async <T>(url: string, value: any):
    Promise<HttpResponse<T>> => Promise.resolve(this.data);
}

const getDataService = (mockedValue: any): DataService => {
  const dataService = new DataService('development', new HttpServiceMock(mockedValue));
  return dataService;
};

describe('data service', () => {
  const mockSuccessResponse: Article = createArticle('Hello, World!', 'This is content');

  it('should return blog data', async () => {
    const result = await getDataService(mockSuccessResponse).getHomePageArticles();
    expect(result).toEqual(mockSuccessResponse);
  });

  it('should return homepage blog data', async () => {
    const result = await getDataService(mockSuccessResponse).getArticlesByPage(0, 5);
    expect(result).toEqual(mockSuccessResponse);
  });

  it('should return specific blog data', async () => {
    const result = await getDataService(mockSuccessResponse).getArticleById(1);
    expect(result).toEqual(mockSuccessResponse);
  });

  it('should save article', async () => {
    const result = await getDataService({ data: 1, message: '' }).saveArticle(mockSuccessResponse);
    expect(result.id).toEqual(1);
  });

  it('should create article', async () => {
    const result = await getDataService({ data: 1, message: '' }).createArticle(mockSuccessResponse);
    expect(result.id).toEqual(1);
  });
});
