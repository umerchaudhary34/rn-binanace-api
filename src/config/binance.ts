// Binance API Configuration
// TODO: Move these to environment variables or secure storage in production
export const BINANCE_CONFIG = {
  API_KEY: 'FbsWJVe4u2DPnhrurBVjdQhKWaL5CWONE9MzhrnOTafssqEw9hYGrUzhXk8qpaXW',
  API_SECRET: 'MJ6B0HHhDY80juMfkLSHBWsLM5o89tFQZfiYofknf0FzyI7zC3iF2CnlxYXB3xRj',
  ENDPOINT: 'https://api.binance.com/sapi/v1/accountSnapshot',
  DEFAULT_TYPE: 'FUTURES' as WalletType, // "SPOT", "MARGIN", "FUTURES"
};

export type WalletType = 'SPOT' | 'MARGIN' | 'FUTURES';
