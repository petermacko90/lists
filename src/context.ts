import React from 'react';
import { strings } from './constants/strings';

export const LocaleContext = React.createContext(strings.en);
export const LocaleConsumer = LocaleContext.Consumer;
