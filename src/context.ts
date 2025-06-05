import { ActionDispatch, createContext } from 'react';
import { strings, Translations } from './constants/strings';
import { initialState } from './reducers/reducer';
import { Action } from './reducers/types';
import { State } from './reducers/types';

export const LocaleContext = createContext<Translations>(strings.en);

export const StateContext = createContext<State>(initialState);
export const StateDispatchContext = createContext<ActionDispatch<[action: Action]>>(null!);
