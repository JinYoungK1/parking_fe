// theme css file
import './styles/tailwind.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import 'react-tabs/style/react-tabs.css';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { apiQuery } from '~/api/apiQuery';
import { OffcanvasProvider } from '~/providers/OffcanvasProvider';
import { OffcanvasToolProvider } from '~/providers/OffcanvasToolProvider';
import { SidebarProvider } from '~/providers/SidebarProvider';
import { OffcanvasFileProvider } from '~/providers/OffcanvasFileProvider';

import App from './App';
import { ContentsModalProvider } from './providers/ContentsModalProvider';
import { SpinnerProvider } from './providers/SpinnerProvider';
import reportWebVitals from './reportWebVitals';

// theme css file
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: apiQuery,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <SpinnerProvider>
          {/* 프로바이더 통합을 하나 만들어야 할 듯 */}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <ContentsModalProvider>
            <SidebarProvider>
              <OffcanvasProvider>
                <OffcanvasToolProvider>
                  <OffcanvasFileProvider>
                    <CookiesProvider>
                      <App />
                    </CookiesProvider>
                  </OffcanvasFileProvider>
                </OffcanvasToolProvider>
              </OffcanvasProvider>
            </SidebarProvider>
          </ContentsModalProvider>
        </SpinnerProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
