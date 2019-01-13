import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addList } from '../../actions/lists';
import { checkEmptyString } from '../../helpers';
import Button from '../Button/Button';

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
          className="pa3 b--none w-75 w-two-thirds-m w-auto-l"
          maxLength="50"
          autoFocus
        />
        <Button onClick={this.onClickAddList(newListTitle)} color="green"
        classes="w-25 w-third-m w-auto-l">
          Add
        </Button>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(AddList);
