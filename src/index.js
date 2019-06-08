import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'tachyons';
import { strings } from './constants/strings';

let localeStrings = null;
switch (window.navigator.language) {
  case 'sk':
  case 'sk-SK':
    localeStrings = strings.sk;
    break;
  default:
    localeStrings = strings.en;
}

const LocaleContext = React.createContext(strings.en);
export const LocaleConsumer = LocaleContext.Consumer;

ReactDOM.render(
  <Provider store={store}>
    <LocaleContext.Provider value={localeStrings}>
      <App />
    </LocaleContext.Provider>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();
