# 🚀 Binance API React Native Starter

A foundational React Native application for Binance API integration. This starter project demonstrates wallet balance tracking and provides a solid foundation for building automated trading applications, portfolio managers, or any Binance-connected mobile app.

## 🎯 Purpose

This is a **starter template** that developers can use to:
- 🔄 Build automated trading applications
- 📊 Create portfolio management tools  
- 📱 Develop custom trading dashboards
- 🤖 Implement trading bots with mobile interfaces
- 📈 Build market analysis applications

**Start here, build anything!** The basic wallet tracking is just the beginning.

## ✨ What's Included

- ✅ **Binance API Integration** - Ready-to-use API connection with authentication
- ✅ **Multi-Wallet Support** - SPOT, FUTURES, and MARGIN account access
- ✅ **TypeScript Foundation** - Type-safe development environment
- ✅ **Real-time Data** - Live updates with React Query
- ✅ **Responsive Design** - Works on iOS and Android
- ✅ **Modern Architecture** - Clean, extensible codebase

## 🏗️ Tech Stack

- **React Native 0.75.3** - Cross-platform framework
- **TypeScript** - Type safety
- **@tanstack/react-query** - Server state management
- **Axios** - HTTP client
- **Moment.js** - Date formatting

## � Quick Start

### 1. Clone and Install
```bash
git clone <your-repository-url>
cd DiscordSignalCatcher
yarn install
cd ios && pod install && cd .. # iOS only
```

### 2. Get Binance API Keys
1. Create account at [Binance.com](https://www.binance.com/)
2. Go to **Account → API Management**
3. Create API with **Read permissions only**
4. Save your API Key and Secret

### 3. Configure API Keys
Edit `src/config/binance.ts`:
```typescript
export const BINANCE_CONFIG = {
  API_KEY: 'your_api_key_here',
  API_SECRET: 'your_secret_key_here',
  DEFAULT_TYPE: 'FUTURES', // 'SPOT', 'MARGIN', 'FUTURES'
};
```

### 4. Run the App
```bash
yarn start          # Start Metro
yarn ios           # Run on iOS
yarn android       # Run on Android
```

## 📖 Understanding the Code

### Core Components
- `src/screens/Home/Home.tsx` - Main wallet display
- `src/config/binance.ts` - API configuration
- `src/services/api.tsx` - API service layer (extend here!)

### API Integration
The app uses Binance Account Snapshot API:
```typescript
// Current implementation in Home.tsx
const getAccountSnapshot = async () => {
  const response = await axios.get(
    `${BINANCE_CONFIG.ENDPOINT}?${queryString}`,
    { headers: { 'X-MBX-APIKEY': BINANCE_CONFIG.API_KEY } }
  );
};
```

## 🔧 Extending This App

### For Automated Trading
```typescript
// Add to src/services/api.tsx
export const placeBuyOrder = async (symbol: string, quantity: number) => {
  // Implementation for placing orders
};

export const getMarketPrice = async (symbol: string) => {
  // Get current market prices
};
```

### For Portfolio Management
```typescript
// Add portfolio calculation features
export const calculatePnL = (currentPrice: number, buyPrice: number) => {
  return ((currentPrice - buyPrice) / buyPrice) * 100;
};
```

### For Market Analysis
```typescript
// Add technical analysis features
export const getKlineData = async (symbol: string, interval: string) => {
  // Get candlestick data for analysis
};
```

## � Useful Resources

- **Binance API Docs**: [developers.binance.com](https://developers.binance.com/)
- **Account Snapshot API**: [Daily Account Snapshot](https://developers.binance.com/docs/wallet/account/daily-account-snapshoot)
- **React Native Setup**: [Environment Setup Guide](https://reactnative.dev/docs/environment-setup)

## 🔒 Security Notes

- Never commit API keys to version control
- Use environment variables for production
- Start with read-only permissions
- Add IP restrictions when possible

## 📄 License

MIT License - Use this code however you want!

## ⚠️ Disclaimer

This is educational starter code. Test thoroughly before using with real funds. Not responsible for trading losses.

---

**🌟 Star this repo if it helps you build something awesome!**
