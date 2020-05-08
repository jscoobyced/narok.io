import { Article } from '../../models/blog/Article';
import * as Config from '../config/config';
import HttpService from '../http/http';

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
    return this.get('articles', parameters);
  }

  private get = async <T>(service: String, parameters?: Parameter[]): Promise<T> => {
    const server = Config.getApplicationConfig(this.mode).Server;
    const port = Config.getApplicationConfig(this.mode).Port;
    const queryString = parameters ? `?${parameters
      .map(parameter => `${parameter.name}=${parameter.value}`)
      .join('&')}` : '';
    const secure = this.mode === 'production' ? 's' : '';
    const url = `http${secure}://${server}:${port}/${service}${queryString}`;
    return this.httpService.fetchData<T>(url);
  }
}
