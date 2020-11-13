import {RootObject} from './types';
import Yahoo, {Fetch} from './yahoo';

const testData = require('./sample.json') as RootObject;

describe('Yahoo', () => {
    test('Makes options', async () => {
        const fetch: Fetch = (url: string, options?: {}) => {
            return Promise.resolve({json: () => Promise.resolve(testData)});
        };

        const yahoo = new Yahoo(fetch);
        const res = await yahoo.fetchOptions('TSLA')
        expect(res).toBe(testData);
    });
});
