import DynamicNavigation from './classes/DynamicNavigation.js';
import StaticNavigation from './classes/StaticNavigation.js';
import FixedNavigation from './classes/FixedNavigation.js';

const navigationBuilder = nav => {
    switch (nav.dataset.type) {
        case "dynamic":
            return new DynamicNavigation(nav);
        case "static":
            return new StaticNavigation(nav);
        case "fixed":
            return new FixedNavigation(nav);
        default:
            throw new Error("No Navigation Type Specified");
    }
}

let navigationItems = document.getElementsByClassName("c-navigation");
let navigationArray = [];
for (let i = 0; i < navigationItems.length; i++) {
    const nav = navigationItems[i];
    let navigation = navigationBuilder(nav);
    navigationArray = [...navigationArray, navigation];
}
if (navigationArray) {
    window.addEventListener("DOMContentLoaded", () => {
        navigationArray.forEach(nav => {
            nav.handleResize()
        })
    })

    window.addEventListener("resize", () => {
        navigationArray.forEach(nav => {
            nav.handleResize();
        })
    });
}