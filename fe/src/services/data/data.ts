import { Article } from '../../models/blog/Article';
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

  public getHomePageBlog = async (): Promise<Article[]> => this.getBlogsByPage(0, 5)

  public getBlogsByPage = async (page: number, perPage: number): Promise<Article[]> => {
    const parameters = [{ name: 'page', value: page }, { name: 'perPage', value: perPage }];
    const httpResponse = await this.get<Article[]>('articles', parameters);
    return Promise.resolve(httpResponse.data);
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
}
