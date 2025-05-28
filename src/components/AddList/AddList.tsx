import { Component } from 'react';
import { connect } from 'react-redux';
import { addList } from '../../actions/lists';
import Button from '../Button/Button';
import { LocaleConsumer } from '../../context';
import { MAX_LENGTH_LIST } from '../../constants/constants';
import { Dispatch } from 'redux';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onAddList: (title: string) => dispatch(addList(title)),
});

class AddList extends Component<
  { scrollToCurrentList: Function; onAddList: Function },
  { newListTitle: string }
> {
  constructor(props: { scrollToCurrentList: Function; onAddList: Function }) {
    super(props);
    this.state = {
      newListTitle: '',
    };
  }

  onChangeNewListTitle = (e) => {
    this.setState({ newListTitle: e.target.value });
  };

  onClickAddList = (title: string) => () => {
    this.handleAddList(title);
  };

  onKeyPressAddList = (title: string) => (e) => {
    if (e.key === 'Enter') {
      this.handleAddList(title);
    }
  };

  handleAddList = (title: string) => {
    this.props.scrollToCurrentList();
    this.props.onAddList(title);
    this.setState({ newListTitle: '' });
  };

  render() {
    const { newListTitle } = this.state;

    return (
      <LocaleConsumer>
        {(str) => (
          <div className="fl w-75-l w-two-thirds-m w-100 pa3">
            <h2>{str.ADD_LIST}</h2>
            <input
              type="text"
              value={newListTitle}
              onChange={this.onChangeNewListTitle}
              onKeyDown={this.onKeyPressAddList(newListTitle)}
              placeholder={str.LIST_TITLE}
              className="pa3 b--none w-75 w-two-thirds-m w-auto-l"
              maxLength={MAX_LENGTH_LIST}
              autoFocus
            />
            <Button
              onClick={this.onClickAddList(newListTitle)}
              color="green"
              classes="w-25 w-third-m w-auto-l"
            >
              {str.ADD}
            </Button>
          </div>
        )}
      </LocaleConsumer>
    );
  }
}

export default connect(null, mapDispatchToProps)(AddList);
