import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addList } from '../../actions/lists';
import Button from '../Button/Button';
import { MAX_LENGTH_LIST } from '../../constants/constants';
import {
  STR_ADD, STR_ADD_LIST, STR_LIST_TITLE
} from '../../constants/strings';

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
    this.props.scrollToCurrentList();
    this.props.onAddList(title);
    this.setState({ newListTitle: '' });
  }

  render() {
    const { newListTitle } = this.state;

    return (
      <div className="fl w-75-l w-two-thirds-m w-100 pa3">
        <h2>{STR_ADD_LIST}</h2>
        <input
          type="text"
          value={newListTitle}
          onChange={this.onChangeNewListTitle}
          onKeyPress={this.onKeyPressAddList(newListTitle)}
          placeholder={STR_LIST_TITLE}
          className="pa3 b--none w-75 w-two-thirds-m w-auto-l"
          maxLength={MAX_LENGTH_LIST}
          autoFocus
        />
        <Button onClick={this.onClickAddList(newListTitle)} color="green"
        classes="w-25 w-third-m w-auto-l">
          {STR_ADD}
        </Button>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(AddList);
