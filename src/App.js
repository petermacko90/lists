import React, { Component, Fragment } from 'react';
import Navigation from './components/Navigation/Navigation';
import Lists from './components/Lists/Lists';
import CurrentList from './components/CurrentList/CurrentList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isShowLists: true
    };
  }

  scrollToCurrentList = () => {
    if (window.innerWidth < 480) {
      this.setState({ isShowLists: false });
    }
  }

  showLists = () => {
    this.setState({ isShowLists: true });
  }

  hideLists = () => {
    this.setState({ isShowLists: false });
  }

  render() {
    const { isShowLists } = this.state;
    return (
      <Fragment>
        <Navigation scrollToCurrentList={this.scrollToCurrentList} />
        <div className="fl w-25-l w-third-m w-100">
        {
          isShowLists ?
            <Fragment>
              <button type="button" onClick={this.hideLists}
              className="bg-yellow b--none pointer pv1 mb1">
                Hide lists
              </button>
              <Lists scrollToCurrentList={this.scrollToCurrentList} />
            </Fragment>
          :
            <button type="button" onClick={this.showLists}
            className="bg-yellow b--none pointer pv1 mb1">
              Show lists
            </button>
        }
        </div>
        <div className="fl w-75-l w-two-thirds-m w-100 pa3"
        style={{minHeight: '400px'}}>
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
