import Navigation from './Navigation';

export default class DynamicNavigation extends Navigation {
    breakpoint;

    constructor(nav) {
        super(nav)

        try {
            this.breakpoint = parseInt(this.node.dataset.breakpoint);
        } catch (error) {
            console.error("Invalid Breakpoint");
        }
    }

    // Public Null
    handleResize() {
        // for mobile
        if (this.breakpoint) {
            if (document.documentElement.clientWidth <= this.breakpoint) {
                this.moveAllToHamburger();
                return
            }
        }

        // for desktop
        this.moveAllToNav();
        let timeout = 0;
        while (this.isNavWrapped() && timeout < 1000) {
            this.moveOneToHamburger();
            timeout++
        }

        if (timeout > 900) {
            throw new Error("Infinite Loop");
        }
        
    }

    // Private Bool
    isNavWrapped() {
        let navigationRect = this.navBar.node.getBoundingClientRect();
        let navWidth = navigationRect.right - navigationRect.left;
        let linksWidth = this.navBar.totalWidth;

        // 50 is icon width, refactor later to use actual icon width
        if (linksWidth > navWidth - 50) {
            return true;
        }
        return false;
    }
}