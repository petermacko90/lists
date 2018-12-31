import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addList } from '../../actions/lists';
import { checkEmptyString } from '../../helpers';

const mapDispatchToProps = (dispatch) => {
  return {
    onAddList: (title) => dispatch(addList(title))
  };
}

class AddList extends Component {
  constructor() {
    super();
    this.state = { newListTitle: '' };
  }

  onChangeNewListTitle = (e) => {
    this.setState({ newListTitle: e.target.value });
  }

  onClickAddList = (title) => () => {
    this.handleAddList(title);
  }

  onKeyPressAddList = (title) => (e) => {
    if (e.key === 'Enter') {
      this.handleAddList(title);
    }
  }

  handleAddList = (title) => {
    if (checkEmptyString(title)) {
      return;
    }
    this.props.scrollToCurrentList();
    this.props.onAddList(title);
    this.setState({ newListTitle: '' });
  }

  render() {
    const { newListTitle } = this.state;

    return (
      <div className="fl w-75-l w-two-thirds-m w-100 pa3">
        <h2>Add list</h2>
        <input
          type="text"
          value={newListTitle}
          onChange={this.onChangeNewListTitle}
          onKeyPress={this.onKeyPressAddList(newListTitle)}
          placeholder="List title"
          className="pa3 b--none w-100 w-auto-ns"
          maxLength="50"
          autoFocus
        />
        <button type="button" onClick={this.onClickAddList(newListTitle)}
        className="white b--none ph4 pv3 b pointer bg-green hover-bg-dark-green">
          Add
        </button>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(AddList);
