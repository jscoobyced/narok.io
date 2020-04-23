import { DataService } from './data';
import HttpService from '../http/http';

jest.mock('../http/http');

beforeEach(() => {
  (HttpService.fetchData as jest.Mock).mockReturnValue({});
});

const getDataService = (mockedValue: string): DataService => {
  (HttpService.fetchData as jest.Mock).mockReturnValue(mockedValue);
  const dataService = new DataService();
  return dataService;
};

describe('data service', () => {
  const mockSuccessResponse = 'Hello, Scala!';
  it('should return API data', async () => {
    const result = await getDataService(mockSuccessResponse).getHelloScala();
    expect(result).toEqual(mockSuccessResponse);
  });
});
