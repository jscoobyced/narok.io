export default class HttpService {
  public fetchData = async <T>(url: string): Promise<HttpResponse<T>> => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }

  public postData = async <T>(url: string, data: any): Promise<HttpResponse<T>> => this.putOrPostData('POST', url, data)

  public putData = async <T>(url: string, data: any): Promise<HttpResponse<T>> => this.putOrPostData('PUT', url, data)

  public putOrPostData = async <T>(method: string, url: string, data: any): Promise<HttpResponse<T>> => {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
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
  responseData: {
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
