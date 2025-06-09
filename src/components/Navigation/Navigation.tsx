import './Navigation.css';
import { LocaleContext } from '../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBars } from '@fortawesome/free-solid-svg-icons';
import { useContext, MouseEventHandler } from 'react';

export default function Navigation({
  showAddList,
  toggleMenu,
}: {
  showAddList: MouseEventHandler<HTMLButtonElement>;
  toggleMenu: MouseEventHandler<HTMLButtonElement>;
}) {
  const translation = useContext(LocaleContext);

  return (
    <nav className="bg-yellow shadow-2 mb2 flex justify-between">
      <div>
        <button
          type="button"
          onClick={toggleMenu}
          className="b--none ma3 bg-transparent f3 b pointer v-mid"
          aria-label={translation.TOGGLE_MENU}
          title={translation.TOGGLE_MENU}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <img src="/lists/list32.png" height={32} width={32} alt="logo" className="ma1 v-mid" />
        <h1 className="dib f2 mv2 v-mid">Lists</h1>
      </div>
      <button
        type="button"
        onClick={showAddList}
        className="b--none ml4 mr3 bg-transparent f3 b pointer v-mid add-list"
        aria-label={translation.ADD_LIST}
      >
        <span>
          <FontAwesomeIcon icon={faPlus} />
        </span>
        <span className="dn di-ns"> {translation.ADD_LIST}</span>
      </button>
    </nav>
  );
}
