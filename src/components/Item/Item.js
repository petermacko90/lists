import React, { Component } from 'react';
import ItemDropdown from './ItemDropdown';

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

  toggleActions = (e) => {
    e.stopPropagation();
    this.setState({ isActionsOpen: !this.state.isActionsOpen });
  }

  render() {
    const { listId, onClickItem, onClickDelete, setTextToCopy } = this.props;
    const { id, checked, name } = this.props.item;
    const { isActionsOpen } = this.state;
    const checkAction = checked ? 'Uncheck' : 'Check';

    return (
      <li className={"noselect" + (checked ? ' checked' : '')} tabIndex="0"
      title={checkAction} onClick={onClickItem(listId, id, checked)}>
        {name}
        <div className="absolute right-0 top-0" onBlur={this.onBlur}
        onFocus={this.onFocus}>
          <button onClick={this.toggleActions} title="Actions"
          className="actions-dropdown pointer">
            <span className="dots" />
          </button>
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
