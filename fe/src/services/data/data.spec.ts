import DataService from './data';
import { Article, toArticle, toBlogContentText } from '../../models/blog/ArticleData';
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

class HttpServiceMock<T> extends HttpService {
  private data: any;

  private httpResponse: any;

  constructor(data: any) {
    super();
    this.data = data;
    this.httpResponse = {
      responseData: {
        article: this.data,
        articles: this.data,
        id: this.data,
      },
      status: {
        success: true,
      },
    };
  }

  public fetchData = async <T>(url: string): Promise<HttpResponse<T>> => Promise.resolve(this.httpResponse)

  public postData = async <T>(url: string, value: any):
    Promise<HttpResponse<T>> => Promise.resolve(this.httpResponse)

  public putData = async <T>(url: string, value: any):
    Promise<HttpResponse<T>> => Promise.resolve(this.httpResponse);
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
    const result = await getDataService(1).saveArticle(mockSuccessResponse);
    expect(result.id).toEqual(1);
  });

  it('should create article', async () => {
    const result = await getDataService(1).createArticle(mockSuccessResponse);
    expect(result.id).toEqual(1);
  });
});
