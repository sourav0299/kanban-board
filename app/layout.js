"use client";
import { AppContextProvider } from '../context/AppContext.js';

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <AppContextProvider>
          <div className="min-h-screen flex flex-col">
            <main className="flex-grow">
              {children}
            </main>
          </div>
        </AppContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
