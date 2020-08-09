import { Article } from '../../models/blog/ArticleData';
import * as Config from '../config/config';
import HttpService, { HttpResponse } from '../http/http';

interface Parameter {
  name: string;
  value: string | number;
}

export default class DataService {
  private httpService: HttpService;

  private mode: string;

  constructor(mode: string, httpService: HttpService) {
    this.mode = mode;
    this.httpService = httpService;
  }

  public getHomePageArticles = async (): Promise<Article[]> => this.getArticlesByPage(0, 5)

  public getArticlesByPage = async (page: number, perPage: number): Promise<Article[]> => {
    const parameters = [{ name: 'page', value: page }, { name: 'perPage', value: perPage }];
    const httpResponse = await this.get<Article[]>('articles', parameters);
    return Promise.resolve(httpResponse.responseData.articles);
  }

  public getArticleById = async (id: number): Promise<Article> => {
    const httpResponse = await this.get<Article>(`article/${id}`);
    return Promise.resolve(httpResponse.responseData.article);
  }

  public saveArticle = async (article: Article): Promise<{ id: number, message: string }> => {
    const httpResponse = await this.putOrPost<Article, number>(true, 'article', article.id, article);
    return Promise.resolve({ id: httpResponse.responseData.id, message: httpResponse.status.message });
  }

  public createArticle = async (article: Article): Promise<{ id: number, message: string }> => {
    const httpResponse = await this.putOrPost<Article, number>(false, 'article', article.id, article);
    return Promise.resolve({ id: httpResponse.responseData.id, message: httpResponse.status.message });
  }

  private get = async <T>(service: String, parameters?: Parameter[]): Promise<HttpResponse<T>> => {
    const applicationConfiguration = Config.getApplicationConfig(this.mode);
    const server = applicationConfiguration.Server;
    const port = applicationConfiguration.Port;
    const queryString = parameters ? `?${parameters
      .map(parameter => `${parameter.name}=${parameter.value}`)
      .join('&')}` : '';
    const secure = applicationConfiguration.isSecure ? 's' : '';
    const url = `http${secure}://${server}:${port}/${service}${queryString}`;
    const data = this.httpService.fetchData<T>(url);
    return data;
  }

  private putOrPost = async <T, N>(
    isPost: boolean,
    service: string,
    id: number,
    data: T): Promise<HttpResponse<N>> => {
    const applicationConfiguration = Config.getApplicationConfig(this.mode);
    const server = applicationConfiguration.Server;
    const port = applicationConfiguration.Port;
    const secure = applicationConfiguration.isSecure ? 's' : '';
    const url = `http${secure}://${server}:${port}/${service}${isPost ? `/${id}` : ''}`;
    const response = isPost ? this.httpService.postData<N>(url, data) : this.httpService.putData<N>(url, data);
    return response;
  }
}
