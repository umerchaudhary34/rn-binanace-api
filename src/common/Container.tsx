import React, {useContext} from 'react';
import {
  SafeAreaView,
  Image,
  useWindowDimensions,
  StatusBar,
  View,
  StyleSheet,
  Platform,
} from 'react-native';
import {themeContext} from '../config/themeContext';

type Props = {
  style?: any;
  backgroundImage?: any;
  backgroundImageStyle?: any;
  overlay?: boolean;
  statusBarColor?: string;
  barStyle?: 'dark-content' | 'light-content';
  children?: any;
};

const Container: React.FC<Props> = props => {
  const theme = useContext(themeContext);
  const {height, width} = useWindowDimensions();

  const {statusBarColor, backgroundImageStyle} = props;
  let color = statusBarColor ? statusBarColor : theme.permissionBackground;
  let barStyle = props.barStyle
    ? props.barStyle
    : theme.theme === 'dark'
    ? 'light-content'
    : 'dark-content';
  const TagView =
    Platform.OS === 'ios' && statusBarColor === 'transparent'
      ? View
      : SafeAreaView;
  return (
    <TagView
      style={[
        styles.container,
        props.style,
        {backgroundColor: theme.permissionBackground},
      ]}>
      <StatusBar
        translucent={statusBarColor === 'transparent'}
        backgroundColor={color}
        barStyle={barStyle}
      />
      {props.backgroundImage && (
        <Image
          source={props.backgroundImage}
          style={[
            styles.backgroundImage,
            {width: width, height: height},
            backgroundImageStyle,
          ]}
        />
      )}
      {props.overlay && (
        <View style={[styles.overlayStyle, {width: width, height: height}]} />
      )}
      {props.children}
    </TagView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlayStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
});

export default Container;
