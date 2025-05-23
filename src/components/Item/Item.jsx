import { Component } from 'react';
import ItemDropdown from './ItemDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import './Item.css';
import { LocaleConsumer } from '../../index';

export default class Item extends Component {
  constructor() {
    super();
    this.state = { isActionsOpen: false };
    this.timeoutId = null;
  }

  onBlur = () => {
    this.timeOutId = setTimeout(() => {
      this.setState({ isActionsOpen: false });
    });
  };

  onFocus = () => clearTimeout(this.timeOutId);

  onClickToggleActions = () => {
    this.handleToggleActions();
  };

  onKeyPressToggleActions = (e) => {
    if (e.key === 'Enter') {
      this.handleToggleActions();
    }
  };

  handleToggleActions() {
    this.setState({ isActionsOpen: !this.state.isActionsOpen });
  }

  render() {
    const { onClickItem, onKeyPressItem, onClickDelete, setTextToCopy, setItemToEdit } = this.props;
    const { id, list_id, checked, name } = this.props.item;
    const { isActionsOpen } = this.state;

    return (
      <LocaleConsumer>
        {(str) => (
          <li className={'flex justify-between relative noselect' + (checked ? ' checked' : '')}>
            <div
              className="flex pv3 w-100 pointer"
              tabIndex="0"
              title={checked ? str.UNCHECK : str.CHECK}
              onClick={onClickItem(list_id, id, name, !checked)}
              onKeyPress={onKeyPressItem(list_id, id, name, !checked)}
            >
              <span className="check tc b">{checked && <FontAwesomeIcon icon={faCheck} />}</span>
              <span className="item-name">{name}</span>
            </div>
            <div
              className="actions-dropdown hover-bg-red tc pointer"
              tabIndex="0"
              title={str.ACTIONS}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              onClick={this.onClickToggleActions}
              onKeyUp={this.onKeyPressToggleActions}
            >
              <span className="f3">
                <FontAwesomeIcon icon={faEllipsisV} />
              </span>
              {isActionsOpen && (
                <ItemDropdown
                  id={id}
                  listId={list_id}
                  name={name}
                  checked={checked}
                  checkAction={checked ? str.UNCHECK : str.CHECK}
                  onClickItem={onClickItem}
                  onClickDelete={onClickDelete}
                  setTextToCopy={setTextToCopy}
                  setItemToEdit={setItemToEdit}
                />
              )}
            </div>
          </li>
        )}
      </LocaleConsumer>
    );
  }
}
