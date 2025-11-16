import { CalculatorPage } from "./page-calculator.js";

function initialize() {
    const calculatorPage = new CalculatorPage()
    calculatorPage

    const infoAppUrl = "app_info.json";

    fetch(infoAppUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`)
            }

            return response.json();
        })
        .then(data => {
            const AppName = data.AppName;
            const AppVersion = data.AppVersion;

            document.getElementById("AppName").textContent = AppName;
            document.getElementById("AppVersion").textContent = AppVersion;
        })
        .catch(error => {})
    
    const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');

    const colorSchemeChange = (event) => {
        const root = document.documentElement;
        if (event.matches) {
            console.log("Dark")
            const foreground = "var(--light-gray)";
            const background = "var(--black)";
            const surface = "var(--semidark-gray)";
            root.style.setProperty("--foreground-color", foreground);
            root.style.setProperty("--background-color", background);
            root.style.setProperty("--surface-color", surface);
        } else {
            const foreground = "var(--dark-gray)";
            const background = "var(--white)";
            const surface = "var(--semilight-gray)";
            root.style.setProperty("--foreground-color", foreground);
            root.style.setProperty("--background-color", background);
            root.style.setProperty("--surface-color", surface);
        }
    };

    colorSchemeChange(colorScheme);

    colorScheme.addEventListener("change", colorSchemeChange);
}

document.addEventListener("DOMContentLoaded", initialize)