import { State } from './reducers/reducer';

export function loadState(): State | undefined {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState, (key, value) => {
      if (key === 'modified') {
        return new Date(value);
      } else {
        return value;
      }
    });
  } catch (err) {
    console.error('localStorage loadState error: ' + err);
    return undefined;
  }
}

export function saveState(state: State) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.error('localStorage saveState error: ' + err);
  }
}
