import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setNewListTitle, addList } from '../../actions/lists';
import { checkEmptyString } from '../../helpers';
import './Navigation.css';

const mapStateToProps = (state) => {
  return {
    newListTitle: state.listsReducer.newListTitle
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddList: (title) => dispatch(addList(title)),
    onSetNewListTitle: (e) => dispatch(setNewListTitle(e.target.value))
  };
}

class Navigation extends Component {
  constructor() {
    super();
    this.addListInput = React.createRef();
    this.state = {
      showNavigationItems: false,
      showInput: false
    };
  }

  componentDidUpdate() {
    if (this.state.showInput && this.state.showNavigationItems) {
      this.addListInput.current.focus();
    }
  }

  toggleNavigation = () => {
    this.setState({ showNavigationItems: !this.state.showNavigationItems });
  }

  /* handle adding a list */

  onClickAddList = (title) => (e) => {
    this.handleAddList(title);
  }

  onKeyPressAddList = (title) => (e) => {
    if (e.key === 'Enter') {
      this.handleAddList(title);
    }
  }

  handleAddList = (title) => {
    if (this.state.showInput) {
      if (checkEmptyString(title)) {
        this.setState({ showInput: false });
        return;
      }
      this.props.onAddList(title);
      this.setState({ showInput: false });
    } else {
      this.setState({ showInput: true });
    }
  }

  render() {
    const { newListTitle, onSetNewListTitle } = this.props;

    return (
      <nav className="flex bg-yellow shadow-2 mb2 navbar">
        <h1 className="f2 pa3 mv0 menu-item">Lists</h1>
        {
          this.state.showNavigationItems &&
            <div className="menu-item">
              <button type="button" onClick={this.onClickAddList(newListTitle)}
              className="white b--none ph3 ph4-ns pv3 b pointer bg-green hover-bg-dark-green mv3 add-list-button">
                Add list
              </button>
              {
                this.state.showInput &&
                  <input
                    type="text"
                    value={newListTitle}
                    onChange={onSetNewListTitle}
                    onKeyPress={this.onKeyPressAddList(newListTitle)}
                    placeholder="List title"
                    className="pa3 b--none mv3 add-list-input"
                    ref={this.addListInput}
                  />
              }
            </div>
        }
        <button type="button" onClick={this.toggleNavigation}
        className="b--none pa3 ma3 pointer absolute right-0 toggle">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </nav>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
