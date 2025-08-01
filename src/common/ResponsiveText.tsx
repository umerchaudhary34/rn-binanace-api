import React, {useContext} from 'react';
import {Text} from 'react-native';
import {themeContext} from '../config/themeContext';

type Props = {
  style?: any;
  bold?: boolean;
  medium?: boolean;
  semibold?: boolean;
  children?: any;
  subText?: boolean;
  numberOfLines?: number;
  font?: number;
};

const ResponsiveText: React.FC<Props> = props => {
  const {style, bold, medium, semibold, children, subText, font} = props;
  const theme = useContext(themeContext);
  let fontSize = font ? font : subText ? 10 : 14;
  const numberOfLines = props.numberOfLines ? props.numberOfLines : 0;

  return (
    <Text
      numberOfLines={numberOfLines}
      style={{
        ...style,
        ...{
          color: style?.color || theme.text,
          fontSize,
          fontWeight: bold
            ? 'bold'
            : medium
            ? '500'
            : semibold
            ? '600'
            : 'normal',
        },
      }}>
      {children}
    </Text>
  );
};

export default ResponsiveText;
