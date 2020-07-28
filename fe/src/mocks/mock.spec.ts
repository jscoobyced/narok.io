import { httpServiceMock } from './mock';
import { Article } from '../models/blog/Article';

describe('Mocks', () => {
  it('should return a mock HttpService', async () => {
    const httpService = httpServiceMock();
    expect(httpService).not.toBeNull();
    const { data } = await httpService.fetchData<Article[]>('fake url');
    expect(data).not.toBeNull();
    expect(data).toHaveLength(2);
  });
});
