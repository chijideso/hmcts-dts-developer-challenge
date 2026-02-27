import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

// --- MANDATORY MANTINE STYLES ---
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';



// --- INTERNAL IMPORTS ---
import App from './App.tsx';
import { store } from './Features/Redux/store.ts';
import { ModalsProvider } from '@mantine/modals';
import { theme } from './Features/theme/theme.ts';

// Optional: Customizing the theme to feel more "Official/Government"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme}>
        <Notifications position="top-right" zIndex={1000} />
       <ModalsProvider>
          <App />
        </ModalsProvider>
      </MantineProvider>
    </Provider>
  </StrictMode>
);