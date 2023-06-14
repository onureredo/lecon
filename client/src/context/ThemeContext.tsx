import React, { createContext, useState } from 'react';

// Define the type for the theme object
type Theme = {
  background: string;
  text: string;
  // Add any other properties you want for your theme
};

// Define the type for the theme context
type ThemeContextType = {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  theme: Theme;
};

// Create the theme context
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

// Create the theme provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme: Theme = {
    background: isDarkMode ? 'black' : 'white',
    text: isDarkMode ? 'white' : 'black',
    // Customize the theme properties according to your app's design
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
