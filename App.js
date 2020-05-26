// App.js
import * as React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { logEvent, events, identify } from './amplitude';

export default function App() {
  const user = { id: '123456789', userName: 'Jack', email: 'Jack@Jack.com' };
  const error = { code: 400, message: 'Not Found' };

  const apiLogIn = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('user', user);
        identify(user.id, user);
        resolve(user);
      }, 1000)
    });
  }
  const onPressHandler = async () => {
    const apiUser = await apiLogIn();
    logEvent(events.LOG_IN, apiUser);
  };

  const errorHandler = () => {
    logEvent(events.ERROR_EVENT, error);
  };

  return (
    <View style={styles.container}>
      <Button
        onPress={onPressHandler}
        title="LogIn"
      />
      <Button
        onPress={errorHandler}
        color="orangered"
        title="Error"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
