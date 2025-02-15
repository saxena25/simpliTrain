import { createContext, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = (({children})=>{
    const [theme, setTheme] = seState('LIGHT');

    useEffect(()=>{
        const savedTheme = localStorage.getItme('theme') || 'LIGHT';
        setTheme(savedTheme);
    },[]);

    toggleTheme = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {{children}}
        </ThemeContext.Provider>
    )
});

export const useTheme = () => useContext(ThemeContext);