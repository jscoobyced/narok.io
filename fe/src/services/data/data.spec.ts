import DataService from './data';
import {
  ArticleData, toArticle, toBlogContentText, ArticleResponse,
} from '../../models/blog/ArticleData';
import { User } from '../../models/User';
import HttpService, { HttpResponse } from '../http/http';

const owner: User = { id: 12345678, name: 'Administrator' };

const createArticle = (title: string, content: string): ArticleData => toArticle(
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
      articleResponse: {
        article: this.data,
        articles: this.data,
        count: this.data.count,
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
  const mockSuccessResponse: ArticleResponse = {
    articles: [createArticle('Hello, World!', 'This is content')],
    count: 1,
  };

  it('should return homepage blog data', async () => {
    const expected = mockSuccessResponse;
    const result = await getDataService(expected).getArticlesByPage(0, 5);
    expect(result.articles).toEqual(expected);
    expect(result.count).toEqual(1);
  });

  it('should return specific blog data', async () => {
    const expected = mockSuccessResponse.articles[0];
    const result = await getDataService(expected).getArticleById(1);
    expect(result).toEqual(expected);
  });

  it('should save article', async () => {
    const expected = mockSuccessResponse.articles[0];
    const result = await getDataService(1).saveArticle(expected);
    expect(result.id).toEqual(1);
  });

  it('should create article', async () => {
    const expected = mockSuccessResponse.articles[0];
    const result = await getDataService(1).createArticle(expected);
    expect(result.id).toEqual(1);
  });
});
