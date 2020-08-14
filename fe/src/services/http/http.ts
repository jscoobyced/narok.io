export default class HttpService {
  private token: string;

  public setToken = (token: string) => {
    this.token = token;
  }

  public fetchData = async <T>(url: string): Promise<HttpResponse<T>> => {
    const headers = new Headers();
    if (!!this.token) {
      headers.append('Authorization', `Bearer ${this.token}`);
    }

    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-cache',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      headers
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }

  public postData = async <T>(url: string, data: any): Promise<HttpResponse<T>> => this.putOrPostData('POST', url, data)

  public putData = async <T>(url: string, data: any): Promise<HttpResponse<T>> => this.putOrPostData('PUT', url, data)

  public putOrPostData = async <T>(method: string, url: string, data: any): Promise<HttpResponse<T>> => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (!!this.token) {
      headers.append('Authorization', `Bearer ${this.token}`);
    }

    const response = await fetch(url, {
      method,
      headers,
      cache: 'no-cache',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }
}

export interface HttpResponse<T> {
  articleResponse: {
    article?: T;
    articles?: T;
    id?: number;
  };
  status: {
    success: boolean;
    errorCode?: number;
    message?: string;
  }
}
