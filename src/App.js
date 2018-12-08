import React, { Component, Fragment } from 'react';
import Navigation from './components/Navigation/Navigation';
import Lists from './components/Lists/Lists';
import CurrentList from './components/CurrentList/CurrentList';

class App extends Component {
  scrollToCurrentList = () => {
    if (window.innerWidth < 480) {
      this.scroll.scrollIntoView({
        behavior: 'smooth', block: 'start', inline: 'nearest'
      });
    }
  }

  render() {
    return (
      <Fragment>
        <Navigation />
        <Lists scrollToCurrentList={this.scrollToCurrentList} />
        <div className="fl w-75-l w-two-thirds-m w-100 pa3">
          <div ref={(ref) => this.scroll = ref} />
          <CurrentList />
        </div>
      </Fragment>
    );
  }
}

export default App;
