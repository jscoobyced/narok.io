import HttpService, { HttpResponse } from './http';

export default class HttpServiceMock extends HttpService {
  private data: any;

  constructor(data: any) {
    super();
    this.data = data;
  }

  public fetchData = async <T>(url: string): Promise<HttpResponse<T>> => {
    const httpResponse:HttpResponse<T> = {
      data: this.data,
    };
    return Promise.resolve(httpResponse);
  }
}
