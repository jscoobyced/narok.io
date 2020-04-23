import * as Config from '../config/config';
import HttpService from '../http/http';

interface HelloMessage {
  hello: String
}

export class DataService {
  public async getHelloScala(): Promise<HelloMessage> {
    return this.get('hello');
  }

  private async get<T>(service: String): Promise<T> {
    const server = Config.getApplicationConfig().Server;
    const port = Config.getApplicationConfig().Port;
    const url = `http://${server}:${port}/${service}`;
    return HttpService.fetchData<T>(url);
  }
}
