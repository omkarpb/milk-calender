import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
export default function DialogCustom(props) {
  return (
    <View>
      <Portal>
        <Dialog
          visible={props.visible}
          onDismiss={props.onDismiss}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
              {props.children}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={props.onPressAction} style={props.actionStyle}>{props.actionText}</Button>
            <Button onPress={props.onDismiss} style={styles.cancelButton}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  cancelButton: {
  }
})