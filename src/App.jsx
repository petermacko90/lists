import { Component, Fragment } from 'react';
import { debounce } from './helpers';
import Navigation from './components/Navigation/Navigation';
import Lists from './components/Lists/Lists';
import CurrentList from './components/CurrentList/CurrentList';
import AddList from './components/AddList/AddList';
import Footer from './components/Footer/Footer';
import FloatingButton from './components/Button/FloatingButton';
import { MEDIUM_SCREEN_BREAKPOINT } from './constants/constants';
import { LocaleConsumer } from './index';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isShowLists: true,
      isShowAddList: false,
      isShowMenu: false,
      windowWidth: 0,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
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
  };

  showAddList = () => {
    this.setState({ isShowAddList: true });
    if (this.state.windowWidth < MEDIUM_SCREEN_BREAKPOINT) {
      this.hideLists();
    }
  };

  hideAddList = () => this.setState({ isShowAddList: false });

  scrollToCurrentList = () => {
    if (this.state.windowWidth < MEDIUM_SCREEN_BREAKPOINT) {
      this.hideLists();
    }
    this.hideAddList();
  };

  showLists = () => this.setState({ isShowLists: true });

  hideLists = () => this.setState({ isShowLists: false });

  toggleMenu() {
    this.setState((prevState) => {
      return { isShowMenu: !prevState.isShowMenu };
    });
  }

  render() {
    const { isShowLists, isShowAddList } = this.state;

    return (
      <LocaleConsumer>
        {(str) => (
          <div>
            <Navigation showAddList={this.showAddList} toggleMenu={this.toggleMenu} />
            <main className="cf">
              <Lists
                isShowLists={isShowLists}
                showLists={this.showLists}
                hideLists={this.hideLists}
                scrollToCurrentList={this.scrollToCurrentList}
                showAddList={this.showAddList}
              />
              {isShowAddList ? (
                <AddList scrollToCurrentList={this.scrollToCurrentList} />
              ) : (
                <CurrentList showLists={this.showLists} str={str} />
              )}
            </main>
            <Footer />
            {this.state.windowWidth < MEDIUM_SCREEN_BREAKPOINT && (
              <FloatingButton onClick={this.showAddList}></FloatingButton>
            )}
          </div>
        )}
      </LocaleConsumer>
    );
  }
}
