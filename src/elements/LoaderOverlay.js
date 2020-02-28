import * as React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import {Overlay} from 'react-native-elements';

export default function LoaderOverlay() {
  return (
    // <View>
    //   <Overlay
    //     isVisible={true}
    //     overlayBackgroundColor={'transparent'}
    //     overlayStyle={styles.overlay}
    //   >
    //   <ActivityIndicator size="large" color="#61DAFB" />
    //   </Overlay>
    // </View>
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#61DAFB" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10
  },
  overlay:{
    height: 0,
    borderWidth: 0,
    width: 0
  }
})