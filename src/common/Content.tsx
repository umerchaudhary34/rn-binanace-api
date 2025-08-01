import React from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
} from 'react-native';

type Props = {
  style?: any;
  children?: any;
  keyboardAvoidingView?: boolean;
  onScroll?: any;
  showsVerticalScrollIndicator?: boolean;
  refreshControl?: any;
};

const Content: React.FC<Props> = props => {
  const style = props.style ? props.style : [];
  if (props.keyboardAvoidingView) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.container, style]}>
        <View style={[styles.container, style]}>{props.children}</View>
      </KeyboardAvoidingView>
    );
  }
  return (
    <ScrollView
      style={[styles.container, style]}
      refreshControl={props.refreshControl}
      showsVerticalScrollIndicator={false}
      onScroll={props.onScroll}>
      <View style={[styles.container, style]}>{props.children}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Content;
