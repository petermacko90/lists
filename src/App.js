import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { requestLists, setCurrentList } from './actions/lists';
import { requestItems, setCurrentItems } from './actions/items';
import Navigation from './components/Navigation/Navigation';
import Lists from './components/Lists/Lists';
import CurrentList from './components/CurrentList/CurrentList';
import Message from './components/Message/Message';
import './App.css';

const mapStateToProps = (state) => {
  return {
    lists: state.listsReducer.lists,
    currentList: state.listsReducer.currentList,
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

class App extends Component {
  componentDidMount() {
    this.props.onRequestLists();
    this.props.onRequestItems();
  }

  /* handle selecting a list */
  onClickList = (list, listId) => (e) => {
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
  }

  render() {
    const { lists, items, currentList } = this.props;

    return (
      <Fragment>
        <Navigation />
        {
          lists.length > 0 ?
            <Lists
              lists={lists}
              items={items}
              onClickList={this.onClickList}
              onEnterList={this.onEnterList}
            />
          :
            <Message text="No lists found" />
        }
        { currentList && <CurrentList /> }
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
