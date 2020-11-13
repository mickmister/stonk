export interface Quote {
    language: string;
    region: string;
    quoteType: string;
    quoteSourceName: string;
    triggerable: boolean;
    currency: string;
    exchange: string;
    shortName: string;
    longName: string;
    messageBoardId: string;
    exchangeTimezoneName: string;
    exchangeTimezoneShortName: string;
    gmtOffSetMilliseconds: number;
    market: string;
    esgPopulated: boolean;
    marketState: string;
    firstTradeDateMilliseconds: number;
    priceHint: number;
    postMarketChangePercent: number;
    postMarketTime: number;
    postMarketPrice: number;
    postMarketChange: number;
    regularMarketChange: number;
    regularMarketChangePercent: number;
    regularMarketTime: number;
    regularMarketPrice: number;
    regularMarketDayHigh: number;
    regularMarketDayRange: string;
    regularMarketDayLow: number;
    regularMarketVolume: number;
    regularMarketPreviousClose: number;
    bid: number;
    ask: number;
    bidSize: number;
    askSize: number;
    fullExchangeName: string;
    financialCurrency: string;
    regularMarketOpen: number;
    averageDailyVolume3Month: number;
    averageDailyVolume10Day: number;
    fiftyTwoWeekLowChange: number;
    fiftyTwoWeekLowChangePercent: number;
    fiftyTwoWeekRange: string;
    fiftyTwoWeekHighChange: number;
    fiftyTwoWeekHighChangePercent: number;
    fiftyTwoWeekLow: number;
    fiftyTwoWeekHigh: number;
    earningsTimestamp: number;
    earningsTimestampStart: number;
    earningsTimestampEnd: number;
    trailingPE: number;
    epsTrailingTwelveMonths: number;
    epsForward: number;
    epsCurrentYear: number;
    priceEpsCurrentYear: number;
    sharesOutstanding: number;
    bookValue: number;
    fiftyDayAverage: number;
    fiftyDayAverageChange: number;
    fiftyDayAverageChangePercent: number;
    twoHundredDayAverage: number;
    twoHundredDayAverageChange: number;
    twoHundredDayAverageChangePercent: number;
    marketCap: number;
    forwardPE: number;
    priceToBook: number;
    sourceInterval: number;
    exchangeDataDelayedBy: number;
    tradeable: boolean;
    displayName: string;
    symbol: string;
}

export interface PercentChange {
    raw: number;
    fmt: string;
}

export interface OpenInterest {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface Strike {
    raw: number;
    fmt: string;
}

export interface Change {
    raw: number;
    fmt: string;
}

export interface ImpliedVolatility {
    raw: number;
    fmt: string;
}

export interface Volume {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface Ask {
    raw: number;
    fmt: string;
}

export interface LastTradeDate {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface Expiration {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface Bid {
    raw: number;
    fmt: string;
}

export interface LastPrice {
    raw: number;
    fmt: string;
}

export interface Call {
    percentChange: PercentChange;
    openInterest: OpenInterest;
    strike: Strike;
    change: Change;
    inTheMoney: boolean;
    impliedVolatility: ImpliedVolatility;
    volume: Volume;
    contractSymbol: string;
    ask: Ask;
    lastTradeDate: LastTradeDate;
    contractSize: string;
    currency: string;
    expiration: Expiration;
    bid: Bid;
    lastPrice: LastPrice;
}

export interface PercentChange2 {
    raw: number;
    fmt: string;
}

export interface OpenInterest2 {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface Strike2 {
    raw: number;
    fmt: string;
}

export interface Change2 {
    raw: number;
    fmt: string;
}

export interface ImpliedVolatility2 {
    raw: number;
    fmt: string;
}

export interface Volume2 {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface Ask2 {
    raw: number;
    fmt: string;
}

export interface LastTradeDate2 {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface Expiration2 {
    raw: number;
    fmt: string;
    longFmt: string;
}

export interface Bid2 {
    raw: number;
    fmt: string;
}

export interface LastPrice2 {
    raw: number;
    fmt: string;
}

export interface Put {
    percentChange: PercentChange2;
    openInterest: OpenInterest2;
    strike: Strike2;
    change: Change2;
    inTheMoney: boolean;
    impliedVolatility: ImpliedVolatility2;
    volume: Volume2;
    contractSymbol: string;
    ask: Ask2;
    lastTradeDate: LastTradeDate2;
    contractSize: string;
    currency: string;
    expiration: Expiration2;
    bid: Bid2;
    lastPrice: LastPrice2;
}

export interface Option {
    expirationDate: number;
    hasMiniOptions: boolean;
    calls: Call[];
    puts: Put[];
}

export interface Result {
    underlyingSymbol: string;
    expirationDates: number[];
    strikes: number[];
    hasMiniOptions: boolean;
    quote: Quote;
    options: Option[];
}

export interface OptionChain {
    result: [Result];
    error?: any;
}

export interface RootObject {
    optionChain: OptionChain;
}

const getResult = (obj: RootObject): Result => obj.optionChain.result[0];

export const getExpirationDates = (obj: RootObject): number[] => {
    const result = getResult(obj);
    return result.expirationDates;
}

export const getCalls = (obj: RootObject): Call[] => {
    const result = getResult(obj);
    return result.options[0].calls;
}

export const getPuts = (obj: RootObject): Call[] => {
    const result = getResult(obj);
    return result.options[0].puts;
}

export const getStrikePrices = (options: Call[] | Put[]): string[] => {
    return options.map((option) => {
        return option.strike.fmt;
    });
}

export const getQuote = (obj: RootObject) => {
    const result = getResult(obj);
    return result.quote.regularMarketPrice.toString();
}

export function getMiddleChunk<T>(target: string, values: T[], getStr?: (t: T) => string = s => s): T[] {
    const value = getMiddleValue<T>(target, values, getStr);

    if (!value) {
        return [];
    }

    const index = values.indexOf(value);
    return values.slice(index - 5, index + 5);
}

export function getMiddleValue<T>(target: string, values: T[], getStr?: (t: T) => string = s => s): T | void {
    let current: {value: T; diff: number} | void;

    const targetNum = parseFloat(target);
    for (const value of values) {
        const str = getStr(value);
        const num = parseFloat(str);
        const diff = Math.abs(num - targetNum);

        if (!current || diff < current.diff) {
            current = {value, diff};
        }
    }

    if (!current) {
        return;
    }

    return current.value;
}
