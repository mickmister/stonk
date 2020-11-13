import {RootObject} from './types';

const testData = require('./sample.json') as RootObject;

export type Fetch = (url: string, options?: {}) => Promise<{json: () => Promise<{}>}>;

export type OptionData = {
    expirations: number[];

}

const getURL = (symbol: string, expiration?: string): string => {
    let date = '';
    if (expiration) {
        date = `&date=${expiration}`;
    }

    return `https://query2.finance.yahoo.com/v7/finance/options/${symbol}?formatted=true&lang=en-US&region=US${date}`;
}

export default class Yahoo {
    private fetch: Fetch;

    constructor(fetch: Fetch) {
        this.fetch = fetch;
        this.fetch = (url: string, options?: {}) => {
            return Promise.resolve({json: () => Promise.resolve(testData)});
        };
    }

    fetchOptions = async (symbol: string, expiration?: string): Promise<RootObject> => {
        const url = getURL(symbol, expiration);
        return this.fetch(url).then(r => r.json()) as Promise<RootObject>;
    }
}
