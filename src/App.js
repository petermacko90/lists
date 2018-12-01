import React, { Component, Fragment } from 'react';
import Navigation from './components/Navigation/Navigation';
import Lists from './components/Lists/Lists';
import CurrentList from './components/CurrentList/CurrentList';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Navigation />
        <Lists />
        <CurrentList />
      </Fragment>
    );
  }
}

export default App;
