import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {

        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {

            setDarkMode(true);

            document.body.classList.add("dark");

        }

    }, []);

    const toggleTheme = () => {

        const newTheme = !darkMode;

        setDarkMode(newTheme);

        if (newTheme) {

            document.body.classList.add("dark");
            localStorage.setItem("theme", "dark");

        }

        else {

            document.body.classList.remove("dark");
            localStorage.setItem("theme", "light");

        }

    };

    return (

        <ThemeContext.Provider
            value={{
                darkMode,
                toggleTheme,
            }}
        >

            {children}

        </ThemeContext.Provider>

    );

};