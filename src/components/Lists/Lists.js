import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from '../List/List';
import './Lists.css';
import { requestLists, setCurrentList } from '../../actions/lists';
import { requestItems, setCurrentItems } from '../../actions/items';

const mapStateToProps = (state) => {
  return {
    lists: state.listsReducer.lists,
    items: state.itemsReducer.items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestLists: () => dispatch(requestLists()),
    onRequestItems: () => dispatch(requestItems()),
    onSetCurrentList: (list) => dispatch(setCurrentList(list)),
    onSetCurrentItems: (items) => dispatch(setCurrentItems(items))
  }
}

class Lists extends Component {
  componentDidMount() {
    this.props.onRequestLists();
    this.props.onRequestItems();
  }

  /* handle selecting a list */
  onClickList = (list, listId) => () => {
    this.handleSelectList(list, listId);
  }

  onEnterList = (list, listId) => (e) => {
    if (e.key === 'Enter') {
      this.handleSelectList(list, listId);
    }
  }

  handleSelectList = (list, listId) => {
    this.props.onSetCurrentList(list);
    this.props.onSetCurrentItems(listId);
    this.props.scrollToCurrentList();
  }

  render() {
    const { lists, items } = this.props;
    let listComponents = [];
    let itemsProp = [];

    lists.forEach((list) => {
      items.forEach((item) => {
        if (list.id === item.list_id) {
          itemsProp = itemsProp.concat(item);
        }
      });
      listComponents = listComponents.concat(
        <List
          key={list.id}
          list={list}
          items={itemsProp}
          onClickList={this.onClickList}
          onEnterList={this.onEnterList}
        />
      );
      itemsProp = [];
    });

    return (
      <div className="lists">
        {
          listComponents.length > 0
            ? listComponents
            : <p className="ml3">No lists found</p>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
