import { apiMockRes, expectedApiResMockData } from '../../__mocks__/people';
import { API_BASE_URL } from '../../config';
import { peopleFetcher } from './peopleFetcher';

describe('peopleFetcher util', () => {
  beforeEach(() => {
    jest.spyOn(window, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(apiMockRes),
    });
  });

  afterAll(() => {
    window.fetch.mockClear();
    delete window.fetch;
  });

  it('Should fetch people data with species information', async () => {
    const apiEndpoint = '/api/people';

    const result = await peopleFetcher(apiEndpoint);

    expect(fetch).toHaveBeenCalledWith(`${API_BASE_URL}${apiEndpoint}`);

    expect(result).toEqual({
      results: expectedApiResMockData.results,
      speciesWithCount: { undefined: 2 },
    });
  });
});
