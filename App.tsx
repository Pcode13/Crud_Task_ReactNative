import React from 'react';

// import MainScreen from './src/screens/MainScreen';
import MainScreenRedux from './src/screens/MainScreenRedux';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
const App = () => {
  return (
    <Provider store={store}>
    <MainScreenRedux/>
    </Provider>
  );
};

export default App;

