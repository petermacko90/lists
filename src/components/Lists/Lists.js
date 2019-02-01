import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import List from '../List/List';
import Button from '../Button/Button';
import './Lists.css';
import { requestLists, setCurrentList } from '../../actions/lists';
import { requestItems, setCurrentItems } from '../../actions/items';
import {
  STR_ADD_LIST, STR_HIDE_LISTS, STR_NO_LIST_FOUND, STR_SHOW_LISTS
} from '../../constants/strings';

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
    const { lists, items, isShowLists, showLists, hideLists } = this.props;
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
      <div className="fl w-25-l w-third-m w-100">
        {
          isShowLists ?
            <button type="button" onClick={hideLists}
            className="bg-yellow b--none pointer pv1 ml3 mv1 toggle-lists">
              {STR_HIDE_LISTS} &#9650;
            </button>
          :
            <button type="button" onClick={showLists}
            className="bg-yellow b--none pointer pv1 ml3 mv1 toggle-lists">
              {STR_SHOW_LISTS} &#9660;
            </button>
        }
        <div className={`lists ${isShowLists ? '' : 'dn'}`}>
          {
            listComponents.length > 0 ?
              <Fragment>
                {listComponents}
                <hr className="dn-ns moon-gray" />
              </Fragment>
            :
              <div className="ml3">
                <p>{STR_NO_LIST_FOUND}</p>
                <Button onClick={this.props.showAddList} color="green">
                  {STR_ADD_LIST}
                </Button>
              </div>
          }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
