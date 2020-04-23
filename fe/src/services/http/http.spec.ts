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
  it('should return data from API', async () => {
    await HttpService.fetchData('any');
    expect(myGlobal.fetch).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if something is wrong', async () => {
    myGlobal.fetch = jest.fn(() => ({
      ok: false,
      json: () => '',
      status: 200,
    }));
    let error = false;
    try {
      await HttpService.fetchData('any');
    } catch {
      error = true;
    }
    expect(error).toBeTruthy();
    expect(myGlobal.fetch).toHaveBeenCalledTimes(1);
  });
});
