import React from 'react';

import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/configureStore';

import {BrowserRouter} from 'react-router-dom';

import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Main from './components/MainComponent';

function App() {
  const store=ConfigureStore();
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </Provider>
  );
}

export default App;