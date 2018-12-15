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
        <Navigation scrollToCurrentList={this.scrollToCurrentList} />
        <Lists scrollToCurrentList={this.scrollToCurrentList} />
        <div className="fl w-75-l w-two-thirds-m w-100 pa3"
        style={{minHeight: '400px'}}>
          <div ref={(ref) => this.scroll = ref} />
          <CurrentList />
        </div>
        <div className="ma3 tc">
          Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">
          Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">
          CC 3.0 BY</a>
        </div>
      </Fragment>
    );
  }
}

export default App;
