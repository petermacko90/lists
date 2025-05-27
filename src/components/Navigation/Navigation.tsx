import './Navigation.css';
import { LocaleConsumer } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBars } from '@fortawesome/free-solid-svg-icons';

export default function Navigation({ showAddList, toggleMenu }) {
  return (
    <LocaleConsumer>
      {(str) => (
        <nav className="bg-yellow shadow-2 mb2 flex justify-between">
          <div>
            <button
              type="button"
              onClick={() => toggleMenu()}
              className="b--none ma3 bg-transparent f3 b pointer v-mid"
              aria-label={str.TOGGLE_MENU}
              title={str.TOGGLE_MENU}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
            <img src="/list32.png" alt="logo" className="ma1 v-mid" />
            <h1 className="dib f2 mv2 v-mid">Lists</h1>
          </div>
          <button
            type="button"
            onClick={showAddList}
            className="b--none ml4 mr3 bg-transparent f3 b pointer v-mid add-list"
            aria-label={str.ADD_LIST}
          >
            <span>
              <FontAwesomeIcon icon={faPlus} />
            </span>
            <span className="dn di-ns"> {str.ADD_LIST}</span>
          </button>
        </nav>
      )}
    </LocaleConsumer>
  );
}
