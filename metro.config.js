const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
    resolver: {
        extraNodeModules: {
            crypto: require.resolve('react-native-quick-crypto'),  // Use react-native-quick-crypto for crypto
            stream: require.resolve('stream-browserify'),          // Polyfill for stream
            buffer: require.resolve('buffer'),                     // Polyfill for buffer
            net: require.resolve('react-native-tcp-socket'),
            tls: require.resolve('react-native-tcp-socket'),
            url: require.resolve('url'),
            assert: require.resolve('assert'),             // Polyfill for assert
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
        },
    },
    watchFolders: [
        path.resolve(__dirname, 'node_modules'),  // Ensure Metro watches the node_modules
    ],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
