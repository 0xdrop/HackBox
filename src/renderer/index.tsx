import { createRoot } from 'react-dom/client';
import '@Styles/globals.css';
import '@sweetalert2/theme-dark';
import App from './App';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);
