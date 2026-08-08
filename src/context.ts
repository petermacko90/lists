import { ActionDispatch, createContext, useContext } from 'react';
import { Language, strings, Translations } from './constants/strings';
import { initialState } from './reducers/reducer';
import { Action } from './reducers/types';
import { State } from './reducers/types';

export type Locale = {
  language: Language;
  translations: Translations;
};

export const LocaleContext = createContext<Locale>({
  language: 'en',
  translations: strings.en,
});

export const StateContext = createContext<State>(initialState);
export const StateDispatchContext = createContext<ActionDispatch<
  [action: Action]
> | null>(null);

export const useDispatchContext = () => {
  const dispatch = useContext(StateDispatchContext);
  if (!dispatch) {
    throw new Error('useDispatchContext must be used within a Provider');
  }
  return dispatch;
};
