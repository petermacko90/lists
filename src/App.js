import React, { Component, Fragment } from 'react';
import { debounce } from './helpers';
import Navigation from './components/Navigation/Navigation';
import Lists from './components/Lists/Lists';
import CurrentList from './components/CurrentList/CurrentList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isShowLists: true,
      isShowToggleButton: true,
      isShowNavItems: false,
      isShowAddListInput: true,
      windowWidth: 0
    };
  }

  componentDidMount() {
    window.addEventListener('resize', debounce(this.onWindowResize, 250));
    this.onWindowResize();
  }

  onWindowResize = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth === this.state.windowWidth) {
      return;
    }
    this.setState({ windowWidth });
    if (windowWidth >= 480) {
      this.setState({
        isShowToggleButton: false,
        isShowNavItems: true,
        isShowAddListInput: false,
        isShowLists: true
      });
    } else {
      this.setState({
        isShowToggleButton: true,
        isShowNavItems: false,
        isShowAddListInput: true
      });
    }
  }

  toggleNavigation = () => {
    this.setState({ isShowNavItems: !this.state.isShowNavItems });
  }

  showAddListInput = () => this.setState({ isShowAddListInput: true });

  hideAddListInput = () => this.setState({ isShowAddListInput: false });

  hideNavItems = () => this.setState({ isShowNavItems: false });

  scrollToCurrentList = () => {
    if (this.state.windowWidth < 480) {
      this.hideLists();
      this.hideNavItems();
    }
  }

  showLists = () => this.setState({ isShowLists: true });

  hideLists = () => this.setState({ isShowLists: false });

  render() {
    const {
      isShowLists,
      isShowToggleButton,
      isShowNavItems,
      isShowAddListInput,
      windowWidth
    } = this.state;

    return (
      <Fragment>
        <Navigation
          isShowToggleButton={isShowToggleButton}
          isShowNavItems={isShowNavItems}
          isShowAddListInput={isShowAddListInput}
          windowWidth={windowWidth}
          toggleNavigation={this.toggleNavigation}
          showAddListInput={this.showAddListInput}
          hideAddListInput={this.hideAddListInput}
          hideNavItems={this.hideNavItems}
          scrollToCurrentList={this.scrollToCurrentList}
        />
        <div className="fl w-25-l w-third-m w-100">
          {
            isShowLists ?
              <button type="button" onClick={this.hideLists}
              className="bg-yellow b--none pointer pv1 mb1">
                Hide lists
              </button>
            :
              <button type="button" onClick={this.showLists}
              className="bg-yellow b--none pointer pv1 mb1">
                Show lists
              </button>
          }
          <Lists
            show={isShowLists}
            scrollToCurrentList={this.scrollToCurrentList}
          />
        </div>
        <div className="fl w-75-l w-two-thirds-m w-100 pa3"
        style={{minHeight: '400px'}}>
          <CurrentList showLists={this.showLists} />
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
