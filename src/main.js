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

const rootElement = document.getElementById('root');
const store = configureStore();

function render(App) {
  ReactDOM.render(
    <AppContainer>
      <Provider store={ store }>
        <App />
      </Provider>
    </AppContainer>,
    rootElement
  );
}

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    render(require('./containers/App').default);
  });
}

render(App);