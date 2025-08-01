import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import {FlatList, StyleSheet, View, ActivityIndicator} from 'react-native';
import Container from '../../common/Container';
import {themeContext} from '../../config/themeContext';
import ResponsiveText from '../../common/ResponsiveText';
import {BINANCE_CONFIG} from '../../config/binance';
import axios from 'axios';
import crypto from 'crypto';
import moment from 'moment';

// Types
interface Balance {
  asset: string;
  free: string;
  locked: string;
}

interface Asset {
  asset: string;
  walletBalance: string;
  unrealizedProfit: string;
  marginBalance: string;
}

type WalletItem = Balance | Asset;

interface SpotData {
  balances: Balance[];
}

interface FuturesData {
  assets: Asset[];
}

interface BinanceSnapshot {
  data: SpotData | FuturesData;
  updateTime: number;
}

type Props = {};

const Home: React.FC<Props> = () => {
  const theme = useContext(themeContext);

  const [binanceData, setBinanceData] = useState<BinanceSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const createSignature = useCallback(
    (params: string, secret: string): string => {
      return crypto.createHmac('sha256', secret).update(params).digest('hex');
    },
    [],
  );

  // Function to get the account snapshot
  const getAccountSnapshot = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const timestamp = Date.now();
      const params = `type=${BINANCE_CONFIG.DEFAULT_TYPE}&timestamp=${timestamp}`;
      const signature = createSignature(params, BINANCE_CONFIG.API_SECRET);
      const queryString = `${params}&signature=${signature}`;

      const response = await axios.get(
        `${BINANCE_CONFIG.ENDPOINT}?${queryString}`,
        {
          headers: {
            'X-MBX-APIKEY': BINANCE_CONFIG.API_KEY,
          },
        },
      );

      const snapshotArray = response.data?.snapshotVos;
      if (!snapshotArray || snapshotArray.length === 0) {
        throw new Error('No snapshot data available');
      }

      console.log('response.data::::', snapshotArray);

      const lastSnapshot = snapshotArray[snapshotArray.length - 1];
      setBinanceData(lastSnapshot);
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.msg || err.message
        : err instanceof Error
        ? err.message
        : 'An unknown error occurred';

      console.error('Error fetching account snapshot:', errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [createSignature]);

  useEffect(() => {
    getAccountSnapshot();
  }, [getAccountSnapshot]);

  const formatNumber = useCallback((num: string | number): string => {
    const numValue = parseFloat(String(num));
    return isNaN(numValue) ? '0.000' : numValue.toFixed(3);
  }, []);

  // Filter out balances with zero amounts
  const filteredBalances: WalletItem[] = useMemo(() => {
    if (!binanceData?.data) {
      return [];
    }

    if (BINANCE_CONFIG.DEFAULT_TYPE === 'SPOT') {
      const spotData = binanceData.data as SpotData;
      if (!spotData.balances) {
        return [];
      }
      return spotData.balances.filter(balance => {
        const free = parseFloat(balance.free);
        const locked = parseFloat(balance.locked);
        return free > 0 || locked > 0;
      });
    } else {
      // FUTURES or MARGIN
      const futuresData = binanceData.data as FuturesData;
      if (!futuresData.assets) {
        return [];
      }
      return futuresData.assets.filter(asset => {
        const walletBalance = parseFloat(asset.walletBalance);
        const marginBalance = parseFloat(asset.marginBalance);
        return walletBalance > 0 || marginBalance > 0;
      });
    }
  }, [binanceData]);

  const renderBalanceItem = useCallback(
    ({item}: {item: WalletItem}) => {
      const isSpot = 'free' in item;

      return (
        <View style={[styles.listView, {borderColor: theme.text}]}>
          <ResponsiveText>Coin: {item.asset}</ResponsiveText>
          {isSpot ? (
            <>
              <ResponsiveText>Free: {formatNumber(item.free)}</ResponsiveText>
              <ResponsiveText>
                Locked: {formatNumber(item.locked)}
              </ResponsiveText>
            </>
          ) : (
            <>
              <ResponsiveText>
                Wallet: {formatNumber(item.walletBalance)}
              </ResponsiveText>
              <ResponsiveText>
                Margin: {formatNumber(item.marginBalance)}
              </ResponsiveText>
            </>
          )}
        </View>
      );
    },
    [theme.text, formatNumber],
  );

  const keyExtractor = useCallback((item: WalletItem) => item.asset, []);

  if (isLoading) {
    return (
      <Container>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.text} />
          <ResponsiveText style={[styles.loadingText, {color: theme.text}]}>
            Loading your wallet...
          </ResponsiveText>
        </View>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <View style={styles.centerContainer}>
          <ResponsiveText style={styles.errorText}>
            Error: {error}
          </ResponsiveText>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <ResponsiveText bold style={[styles.title, {color: theme.text}]}>
            {BINANCE_CONFIG.DEFAULT_TYPE} Wallet
          </ResponsiveText>
          {binanceData?.updateTime && (
            <ResponsiveText style={[styles.updateTime, {color: theme.text}]}>
              Updated on:{' '}
              {moment(binanceData?.updateTime).format('MMM DD YYYY, HH:mm')}
            </ResponsiveText>
          )}
        </View>

        {filteredBalances.length === 0 ? (
          <View style={styles.centerContainer}>
            <ResponsiveText style={[styles.emptyText, {color: theme.text}]}>
              No balances found
            </ResponsiveText>
          </View>
        ) : (
          <FlatList<WalletItem>
            data={filteredBalances}
            keyExtractor={keyExtractor}
            renderItem={renderBalanceItem}
            showsVerticalScrollIndicator={false}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={10}
          />
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  listView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 5,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
  },
  headerContainer: {
    marginBottom: 10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  updateTime: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 10,
  },
});

export default Home;
