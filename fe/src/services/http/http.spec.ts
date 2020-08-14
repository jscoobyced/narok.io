import HttpService from './http';

const myGlobal = (window || global) as any;

beforeEach(() => {
  myGlobal.fetch = jest.fn(() => ({
    ok: true,
    json: () => '',
    status: 200,
  }));
});

describe('HTTPService', () => {
  it('should GET data from API', async () => {
    const httpService = new HttpService();
    httpService.setToken('token');
    await httpService.fetchData('any');
    expect(myGlobal.fetch).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if GETting something fails', async () => {
    myGlobal.fetch = jest.fn(() => ({
      ok: false,
      json: () => '',
      status: 200,
    }));
    let error = false;
    const httpService = new HttpService();
    try {
      await httpService.fetchData('any');
    } catch {
      error = true;
    }
    expect(error).toBeTruthy();
    expect(myGlobal.fetch).toHaveBeenCalledTimes(1);
  });

  it('should be able to POST data', async () => {
    const httpService = new HttpService();
    httpService.setToken('token');
    await httpService.postData<string>('whatever', { id: 1, value: 'test' });
    expect(myGlobal.fetch).toHaveBeenCalledTimes(1);
  });

  it('should detect error to POST data', async () => {
    myGlobal.fetch = jest.fn(() => ({
      ok: false,
      json: () => '',
      status: 200,
    }));
    let error = false;
    const httpService = new HttpService();
    try {
      await httpService.postData<string>('whatever', { id: 1, value: 'test' });
    } catch {
      error = true;
    }
    expect(error).toBeTruthy();
    expect(myGlobal.fetch).toHaveBeenCalledTimes(1);
  });

  it('should be able to PUT data', async () => {
    const httpService = new HttpService();
    await httpService.putData<string>('whatever', { id: 1, value: 'test' });
    expect(myGlobal.fetch).toHaveBeenCalledTimes(1);
  });
});
