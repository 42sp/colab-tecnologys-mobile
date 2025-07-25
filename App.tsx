import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';

import './global.css';
import { Provider } from 'react-redux';
import store from 'redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <ScreenContent title="Home" path="App.tsx"></ScreenContent>
      <StatusBar style="auto" />
    </Provider>
  );
}
