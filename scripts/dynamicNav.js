import DynamicNavigation from './classes/DynamicNavigation';
import StaticNavigation from './classes/StaticNavigation';
import FixedNavigation from './classes/FixedNavigation';

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
    window.onload = () => {
        navigationArray.forEach(nav => {
            nav.handleResize()
        })
        setTimeout(() => {
            navigationArray.forEach(nav => {
                nav.show();
            })
        }, 20)
    };

    window.addEventListener("resize", () => {
        navigationArray.forEach(nav => {
            nav.handleResize();
        })
    });
}