import HttpService from './http';

export default class HttpServiceMock extends HttpService {
    private data: any;

    constructor(data: any) {
      super();
      this.data = data;
    }

    public fetchData = async <T>(url: string, paramters?: string[]): Promise<T> => Promise.resolve(this.data)
}
