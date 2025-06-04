import { ActionDispatch, createContext } from 'react';
import { strings, Translations } from './constants/strings';
import { Action, initialState, State } from './reducers/reducer';

export const LocaleContext = createContext<Translations>(strings.en);
export const LocaleConsumer = LocaleContext.Consumer;

export const StateContext = createContext<State>(initialState);
export const StateDispatchContext = createContext<ActionDispatch<[action: Action]>>(null!);
