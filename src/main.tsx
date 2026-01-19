import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import 'tachyons';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('root element not found');
}
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
