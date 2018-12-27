import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addList } from '../../actions/lists';
import { checkEmptyString } from '../../helpers';
import './Navigation.css';

const mapDispatchToProps = (dispatch) => {
  return {
    onAddList: (title) => dispatch(addList(title))
  };
}

class Navigation extends Component {
  constructor() {
    super();
    this.addList = React.createRef();
    this.state = {
      newListTitle: ''
    };
  }

  componentDidUpdate() {
    if (this.props.isShowAddListInput && this.props.isShowNavItems) {
      this.addList.current.focus();
    }
  }

  /* handle adding a list */

  onClickAddList = (title) => () => {
    this.handleAddList(title);
  }

  onKeyPressAddList = (title) => (e) => {
    if (e.key === 'Enter') {
      this.handleAddList(title);
    }
  }

  handleAddList = (title) => {
    if (this.props.isShowAddListInput) {
      if (checkEmptyString(title)) {
        this.props.hideAddListInput();
        return;
      }
      this.props.scrollToCurrentList();
      this.props.onAddList(title);
      this.setState({ newListTitle: '' });
    } else {
      this.props.showAddListInput();
    }
  }

  onChangeNewListTitle = (e) => {
    this.setState({ newListTitle: e.target.value });
  }

  render() {
    const { newListTitle } = this.state;

    return (
      <nav className="flex flex-column flex-row-ns bg-yellow shadow-2 mb2">
        <h1 className="flex-column flex-row-ns f2 pa3 mv0">Lists</h1>
        {
          this.props.isShowNavItems &&
            <div className="flex-column flex-row-ns mh3 mh0-ns">
              <button type="button" onClick={this.onClickAddList(newListTitle)}
              className="white b--none ph3 ph4-ns pv3 b pointer bg-green hover-bg-dark-green mv3 w-40 w-auto-ns">
                Add list
              </button>
              {
                this.props.isShowAddListInput &&
                  <input
                    type="text"
                    value={newListTitle}
                    onChange={this.onChangeNewListTitle}
                    onKeyPress={this.onKeyPressAddList(newListTitle)}
                    placeholder="List title"
                    className="pa3 b--none mv3 w-60 w-auto-ns"
                    maxLength="50"
                    ref={this.addList}
                  />
              }
            </div>
        }
        {
          this.props.isShowToggleButton &&
            <button type="button" onClick={this.props.toggleNavigation}
            className="b--none pa3 ma3 pointer absolute right-0 toggle bg-transparent hover-bg-light-yellow"
            aria-label="Toggle navigation">
              <span className="bar db bg-black"></span>
              <span className="bar db bg-black"></span>
              <span className="bar db bg-black"></span>
            </button>
        }
      </nav>
    );
  }
}

export default connect(null, mapDispatchToProps)(Navigation);
