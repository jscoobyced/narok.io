export default class HttpService {
  public fetchData = async <T>(url: string): Promise<HttpResponse<T>> => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }
}

export interface HttpResponse<T> {
  data: T;
  message?: string;
  code?: number;
}
