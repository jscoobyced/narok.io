export default class HttpService {
  public fetchData = async <T>(url: string, paramters?: string[]): Promise<T> => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  }
}
