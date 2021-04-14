import Hamburger from './Hamburger';
import NavBar from './NavBar';

export default class Navigation {
    node; // HTMLElement
    navBar; // TopNav
    hamburger; // Hamburger
    hamburgerButton; // HTMLElement
    hamburgerWrapper; // HTMLElement

    constructor(nav) {
        // HTMLElement nav
        this.node = nav;
        this.getNavItems();
        this.addEventListeners();
    }

    // Private Null
    getNavItems() {
        let navBars = this.node.getElementsByClassName("c-navbar");
        if (!navBars) {
            throw new Error("No c-navbar present.");
        }
        this.navBar = new NavBar(navBars[0]);

        let hamburgers = this.node.getElementsByClassName("c-hamburger");
        if (hamburgers.length == 0) {
            throw new Error("No c-hamburger present.");
        }
        this.hamburgerWrapper = hamburgers[0];

        let hamburgerMenus = this.hamburgerWrapper.getElementsByClassName("c-hamburger__menu");
        if (hamburgerMenus.length == 0) {
            throw new Error("No c-hamburger__menu present.");
        }
        this.hamburger = new Hamburger(hamburgerMenus[0]);
        
        let hamburgerButtons = this.node.getElementsByClassName("c-hamburger__button");
        if (!hamburgerButtons) {
            throw new Error("No c-hamburger__button present.");
        }
        this.hamburgerButton = hamburgerButtons[0];
    }

    

    // Private Null
    moveAllToHamburger() {
        this.hamburgerWrapper.classList.remove("hide");
        this.hamburger.showAll()
        this.navBar.hideAll()
    }
    
    // Private Null
    moveAllToNav() {
        this.hamburgerWrapper.classList.add("hide");
        this.hamburger.hideAll();
        this.navBar.showAll();
    }

    // Private Null
    moveOneToHamburger() {
        this.hamburgerWrapper.classList.remove("hide");
        this.navBar.hideOne();
        this.hamburger.showOne();
    }

    // Private Null
    handleHamburgerButton() {
        // Hamburger hamburger
        if (this.hamburger.isHidden) {
            this.hamburger.show();
        } else {
            this.hamburger.hide();
        }
    }

    getParents(elem) {
        if (elem.tagName == "HTML") {
            return [elem];
        }
        return [elem.parentElement, ...this.getParents(elem.parentElement)]
    }

    hasParent(elem, parentElement) {
        let parents = this.getParents(elem);
        for (let i = 0; i < parents.length; i++) {
            const parent = parents[i];
            if (parent == parentElement) {
                return true;
            }
        }
        return false;
    }

    // Private Null
    handlePageClick(e) {
        if (!this.hasParent(e.target, this.hamburgerWrapper)) {
            this.hamburger.hide();
        }

        if (!this.hasParent(e.target, this.navBar.node)) {
            this.navBar.closeAllMenus();
        }
    }

    // Private Null
    show() {
        this.node.classList.add("show");
    }

    // Private Null
    addEventListeners() {
        this.hamburgerButton.addEventListener("click", () => {
            this.handleHamburgerButton();
        })

        window.addEventListener("click", (e) => {
            this.handlePageClick(e);
        })
    }
}