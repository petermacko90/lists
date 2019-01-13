import React, { Component, Fragment } from 'react';
import { debounce } from './helpers';
import Navigation from './components/Navigation/Navigation';
import Lists from './components/Lists/Lists';
import CurrentList from './components/CurrentList/CurrentList';
import AddList from './components/AddList/AddList';
import Footer from './components/Footer/Footer';

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
    if (windowWidth >= 480) {
      this.showLists();
    }
  }

  showAddList = () => {
    this.setState({ isShowAddList: true });
    if (this.state.windowWidth < 480) {
      this.hideLists();
    }
  }

  hideAddList = () => this.setState({ isShowAddList: false });

  scrollToCurrentList = () => {
    if (this.state.windowWidth < 480) {
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
          this.state.windowWidth < 480 &&
            <div onClick={this.showAddList} title="Add list"
            className="w3 h3 br-100 fixed z-1 bottom-1 right-1 bg-green hover-bg-dark-green pointer shadow-3">
              <div className="f2 b tc white lh-copy">+</div>
            </div>
        }
      </Fragment>
    );
  }
}

export default App;
