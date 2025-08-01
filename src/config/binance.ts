// Binance API Configuration
// TODO: Move these to environment variables or secure storage in production
export const BINANCE_CONFIG = {
  API_KEY: '<Your Binance API Key>',
  API_SECRET: '<Your Binance API Secret>',
  ENDPOINT: 'https://api.binance.com/sapi/v1/accountSnapshot',
  DEFAULT_TYPE: 'FUTURES' as WalletType, // "SPOT", "MARGIN", "FUTURES"
};

export type WalletType = 'SPOT' | 'MARGIN' | 'FUTURES';
