import React, { Component, Fragment } from 'react';
import { debounce } from './helpers';
import Navigation from './components/Navigation/Navigation';
import Lists from './components/Lists/Lists';
import CurrentList from './components/CurrentList/CurrentList';
import Footer from './components/Footer/Footer';

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

  scrollToCurrentList = () => {
    if (this.state.windowWidth < 480) {
      this.hideLists();
      this.setState({ isShowNavItems: false });
    }
  }

  showLists = () => this.setState({ isShowLists: true });

  hideLists = () => this.setState({ isShowLists: false });

  render() {
    const {
      isShowLists,
      isShowToggleButton,
      isShowNavItems,
      isShowAddListInput
    } = this.state;

    return (
      <Fragment>
        <Navigation
          isShowToggleButton={isShowToggleButton}
          isShowNavItems={isShowNavItems}
          isShowAddListInput={isShowAddListInput}
          toggleNavigation={this.toggleNavigation}
          showAddListInput={this.showAddListInput}
          hideAddListInput={this.hideAddListInput}
          scrollToCurrentList={this.scrollToCurrentList}
        />
        <Lists
          isShowLists={isShowLists}
          showLists={this.showLists}
          hideLists={this.hideLists}
          scrollToCurrentList={this.scrollToCurrentList}
        />
        <CurrentList showLists={this.showLists} />
        <Footer />
      </Fragment>
    );
  }
}

export default App;
