import 'babel-polyfill';
import 'fastclick';
import 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import './styles/main.scss';
import App from './containers/App';
import configureStore from './store/configureStore';

// configure store
const store = configureStore();

function render(element) {
  ReactDOM.render(
    <AppContainer>
      <Provider store={ store }>
        <App />
      </Provider>
    </AppContainer>,
    element
  );
}

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    render(require('./containers/App').default);
  });
}

// render root container
const rootElement = document.getElementById('root');
render(rootElement);