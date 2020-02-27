import * as React from 'react';
import { View } from 'react-native';
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
            <Button onPress={props.onDismiss}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}