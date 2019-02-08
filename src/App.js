import React, { Component, Fragment } from 'react';
import { debounce } from './helpers';
import Navigation from './components/Navigation/Navigation';
import Lists from './components/Lists/Lists';
import CurrentList from './components/CurrentList/CurrentList';
import AddList from './components/AddList/AddList';
import Footer from './components/Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MEDIUM_SCREEN_BREAKPOINT } from './constants/constants';
import { STR_ADD_LIST } from './constants/strings';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isShowLists: true,
      isShowAddList: false,
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
    if (windowWidth >= MEDIUM_SCREEN_BREAKPOINT) {
      this.showLists();
    }
  }

  showAddList = () => {
    this.setState({ isShowAddList: true });
    if (this.state.windowWidth < MEDIUM_SCREEN_BREAKPOINT) {
      this.hideLists();
    }
  }

  hideAddList = () => this.setState({ isShowAddList: false });

  scrollToCurrentList = () => {
    if (this.state.windowWidth < MEDIUM_SCREEN_BREAKPOINT) {
      this.hideLists();
    }
    this.hideAddList();
  }

  showLists = () => this.setState({ isShowLists: true });

  hideLists = () => this.setState({ isShowLists: false });

  render() {
    const { isShowLists, isShowAddList } = this.state;

    return (
      <Fragment>
        <Navigation showAddList={this.showAddList} />
        <main className="cf">
          <Lists
            isShowLists={isShowLists}
            showLists={this.showLists}
            hideLists={this.hideLists}
            scrollToCurrentList={this.scrollToCurrentList}
            showAddList={this.showAddList}
          />
          {
            isShowAddList ?
              <AddList scrollToCurrentList={this.scrollToCurrentList} />
            :
              <CurrentList showLists={this.showLists} />
          }
        </main>
        <Footer />
        {
          this.state.windowWidth < MEDIUM_SCREEN_BREAKPOINT &&
            <div onClick={this.showAddList} title={STR_ADD_LIST} style={{fontSize: '2.5rem'}}
            className="w3 h3 br-100 fixed z-1 bottom-1 right-1 bg-green hover-bg-dark-green white pointer shadow-3 tc lh-copy">
              <FontAwesomeIcon icon={faPlus} />
            </div>
        }
      </Fragment>
    );
  }
}

export default App;
