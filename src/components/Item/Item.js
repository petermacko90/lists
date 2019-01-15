import React, { Component } from 'react';
import ItemDropdown from './ItemDropdown';
import './Item.css';

class Item extends Component {
  constructor() {
    super();
    this.state = { isActionsOpen: false };
    this.timeoutId = null;
  }

  onBlur = () => {
    this.timeOutId = setTimeout(() => {
      this.setState({ isActionsOpen: false });
    });
  }

  onFocus = () => clearTimeout(this.timeOutId);

  onClickToggleActions = () => {
    this.handleToggleActions();
  }

  onKeyPressToggleActions = (e) => {
    if (e.key === 'Enter') {
      this.handleToggleActions();
    }
  }

  handleToggleActions() {
    this.setState({ isActionsOpen: !this.state.isActionsOpen });
  }

  render() {
    const {
      listId, onClickItem, onKeyPressItem, onClickDelete, setTextToCopy
    } = this.props;
    const { id, checked, name } = this.props.item;
    const { isActionsOpen } = this.state;
    const checkAction = checked ? 'Uncheck' : 'Check';

    return (
      <li className={"flex justify-between relative noselect" + (checked ? ' checked' : '')}>
        <div className="pv3 w-100 pointer" tabIndex="0" title={checkAction}
        onClick={onClickItem(listId, id, name, !checked)}
        onKeyPress={onKeyPressItem(listId, id, name, !checked)}>
          <span className="check dib tc b">
            { checked && <>&#10004;</> }
          </span>
          <span className="dib pl1" style={{ wordBreak: 'break-all' }}>
            {name}
          </span>
        </div>
        <div className="actions-dropdown hover-bg-red tc pointer" tabIndex="0"
        title="Actions" onBlur={this.onBlur} onFocus={this.onFocus}
        onClick={this.onClickToggleActions}
        onKeyUp={this.onKeyPressToggleActions}>
          <span className="dots" />
          {
            isActionsOpen &&
              <ItemDropdown
                id={id}
                listId={listId}
                name={name}
                checked={checked}
                checkAction={checkAction}
                onClickItem={onClickItem}
                onClickDelete={onClickDelete}
                setTextToCopy={setTextToCopy}
              />
          }
        </div>
      </li>
    );
  }
}

export default Item;
