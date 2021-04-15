import Icon from './Icon.js';

class Link {
    node; // HTMLElement
    link; // HTMLElement
    icon; // Icon
    childLinksNode; // HTMLElement
    childLinks = []; // Array<HTMLElement>

    get hasChildren() {
        if (this.childLinksNode) {
            return true;
        }
        return false;
    }

    get isHidden() {
        if (this.node.classList.contains("hide")) {
            return true;
        }
        return false;
    }

    constructor(link) {
        this.node = link;
    }

    // Public Null
    hide() {
        if (!this.isHidden) {
            this.node.classList.add("hide");
        }
    }

    // Public Null
    show() {
        if (this.isHidden) {
            this.node.classList.remove("hide");
        }
    }

}

export class NavBarLink extends Link {

    // Public Int
    get width() {
        const linkRect = this.node.getBoundingClientRect();
        return linkRect.right - linkRect.left;
    }

    get isMenuOpen() {
        if (this.childLinksNode.classList.contains("show")) {
            return true;
        }
        return false;
    }

    constructor(link) {
        super(link);
        for (let i = 0; i < this.node.children.length; i++) {
            const child = this.node.children[i];
            // child is HTMLElement

            if (child.classList.contains("c-navbar__link") || child.classList.contains("c-navbar__button")) {
                this.link = child;
                let linkChildren = child.getElementsByClassName("c-icon");
                if (linkChildren) {
                    this.icon = new Icon(linkChildren[0]);
                } else {
                    throw new Error("No Icon For Dropdown");
                }
            } else if (child.classList.contains("c-navbar__sub-menu")) {
                this.childLinksNode = child;
            }
        }

        if (this.hasChildren) {
            for (let i = 0; i < this.childLinksNode.children.length; i++) {
                const link = this.childLinksNode.children[i];
                this.childLinks = [...this.childLinks, link];
            }
        }
    }

    toggle() {
        if (this.isMenuOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        if (this.childLinksNode) {
            this.childLinksNode.classList.add("show");
            let buttonRect = this.node.getBoundingClientRect();
            this.childLinksNode.style.top = `${buttonRect.bottom}px`;
            this.icon.spin();
        }
    }

    close() {
        if (this.childLinksNode) {
            this.childLinksNode.classList.remove("show");
            this.icon.unspin();
        }
    }

}

export class HamburgerNavLink extends Link {

    get isMenuOpen() {
        if (this.childLinksNode.style.maxHeight) {
            return true;
        }
        return false;
    }

    constructor(link) {
        super(link);
        for (let i = 0; i < this.node.children.length; i++) {
            const child = this.node.children[i];
            if (child.classList.contains("c-hamburger__link") || child.classList.contains("c-hamburger__element-button")) {
                this.link = child;
                let icons = child.getElementsByClassName("c-icon");
                if (icons) {
                    this.icon = new Icon(icons[0]);
                }
            } else if (child.classList.contains("c-hamburger__sub-menu")) {
                this.childLinksNode = child;
            }
        }

        if (this.hasChildren) {
            for (let i = 0; i < this.childLinksNode.children.length; i++) {
                const element = this.childLinksNode.children[i];
                let links = element.getElementsByClassName("c-hamburger__sub-link");
                if (links) {
                    links[0].tabIndex = "-1";
                }
                this.childLinks = [...this.childLinks, element];
            }
        }
    }

    toggle() {
        if (this.isMenuOpen) {
            // this.mobileIcon.node.classList.remove("spin");
            this.close();
        } else {
            // this.mobileIcon.node.classList.add("spin");
            this.open();
        }
    }

    close() {
        if (this.childLinksNode) {
            this.childLinksNode.style.maxHeight = null;
            this.childLinks.forEach(element => {
                let links = element.getElementsByClassName("c-hamburger__sub-link");
                if (links) {
                    links[0].tabIndex = "-1";
                }
            })
            if (this.icon) {
                this.icon.unspin();
            }
        }
    }

    open() {
        if (this.childLinksNode) {
            this.childLinksNode.style.maxHeight = this.childLinksNode.scrollHeight + "px";
            this.childLinks.forEach(element => {
                let links = element.getElementsByClassName("c-hamburger__sub-link");
                if (links) {
                    links[0].tabIndex = "0";
                }
            })
            if (this.icon) {
                this.icon.spin();
            }
        }
    }

    makeTabbable() {
        if (this.link) {
            this.link.tabIndex = "0";
        }
    }

    makeUntabbable() {
        if (this.link) {
            this.link.tabIndex = "-1";
        }
    }
}