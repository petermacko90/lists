import React from 'react';
import { strings, Translations } from './constants/strings';

export const LocaleContext = React.createContext<Translations>(strings.en);
export const LocaleConsumer = LocaleContext.Consumer;
