import React, { Component } from 'react';

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
    const { id, listId, checked, name, onClick, onClickDelete } = this.props;
    const { isActionsOpen } = this.state;
    const checkAction = checked ? 'Uncheck' : 'Check';

    return (
      <li className={"noselect" + (checked ? ' checked' : '')} tabIndex="0"
      title={checkAction} onClick={onClick(listId, id, checked)}>
        {name}
        <div className="absolute right-0 top-0" onBlur={this.onBlur}
        onFocus={this.onFocus}>
          <button onClick={this.toggleActions} title="Actions"
          className="actions-dropdown pointer">
            &#8942;
          </button>
          {
            isActionsOpen &&
              <div className="actions-content w4 shadow-3">
                <button type="button" onClick={onClick(listId, id, checked)}
                className="w-100 pointer" title={checkAction}>
                  {checkAction}
                </button>
                <button type="button" onClick={onClickDelete(listId, id)}
                className="w-100 pointer" title="Delete item">
                  Delete item
                </button>
              </div>
          }
        </div>
      </li>
    );
  }
}

export default Item;
