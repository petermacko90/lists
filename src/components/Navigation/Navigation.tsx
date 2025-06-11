import './Navigation.css';
import { LocaleContext } from '../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faLanguage } from '@fortawesome/free-solid-svg-icons';
import { useContext, MouseEventHandler } from 'react';

export default function Navigation({ showAddList }: { showAddList: MouseEventHandler<HTMLButtonElement> }) {
  const translation = useContext(LocaleContext);

  return (
    <nav className="bg-yellow shadow-2 mb2 flex justify-between">
      <div className="pl1">
        <img src="/lists/list64.png" height={32} width={32} alt="logo" className="ma1 v-mid" />
        <h1 className="dib f3 mv2 v-mid">Lists</h1>
      </div>
      <div className="flex mr2 ml-auto">
        <button
          type="button"
          className="b--none bg-transparent mid-gray hover-black f4 b pointer"
          title={translation.LANGUAGE}
          aria-label={translation.LANGUAGE}
        >
          <FontAwesomeIcon icon={faLanguage} />
        </button>
        <div className="separator bl b--mid-gray"></div>
        <button
          type="button"
          onClick={showAddList}
          className="b--none bg-transparent mid-gray hover-black f4 b pointer add-list"
          aria-label={translation.ADD_LIST}
        >
          <FontAwesomeIcon icon={faPlus} className="di dn-ns" />
          <span className="dn di-ns"> {translation.ADD_LIST}</span>
        </button>
      </div>
    </nav>
  );
}
