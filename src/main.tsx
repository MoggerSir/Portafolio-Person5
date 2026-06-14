import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PortfolioApplication } from '@/App';
import '@/index.css';

const application = new PortfolioApplication();

createRoot(document.getElementById('root')!).render(
  <StrictMode>{application.render()}</StrictMode>,
);
