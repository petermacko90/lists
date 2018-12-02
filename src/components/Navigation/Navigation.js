import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setNewListTitle, addList } from '../../actions/lists';

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
      showInput: false
    };
  }

  componentDidUpdate() {
    if (this.state.showInput) {
      this.addListInput.current.focus();
    }
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
      <nav className="flex bg-yellow">
        <h1 className="f2-l f3-m f4 pa3 mv0 dib">Lists</h1>
        <button type="button" onClick={this.onClickAddList(newListTitle)}
        className="white b--none ph4 pv3 b pointer bg-green hover-bg-dark-green mv2-l mv1-m mv0">
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
              className="pa3 b--none mv2-l mv1-m mv0"
              ref={this.addListInput}
            />
        }
      </nav>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

const checkEmptyString = (name) => {
  if (!name.replace(/\s+/g, '')) {
    return true;
  }
  return false;
}
