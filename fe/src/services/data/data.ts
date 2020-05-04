import { IArticle } from '../../models/blog/Article';
import * as Config from '../config/config';
import HttpService from '../http/http';

export default class DataService {
  private httpService: HttpService;

  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  public getHomePageBlog = async (): Promise<IArticle[]> => this.getBlogsByPage(0, 5)

  public getBlogsByPage = async (page: number, perPage: number): Promise<IArticle[]> => {
    const parameters = [page, perPage];
    return this.get('blogs', parameters);
  }

  private get = async <T>(service: String, parameters?: (string | number)[]): Promise<T> => {
    const server = Config.getApplicationConfig().Server;
    const port = Config.getApplicationConfig().Port;
    const url = `http://${server}:${port}/${service}`;
    return this.httpService.fetchData<T>(url);
  }
}
