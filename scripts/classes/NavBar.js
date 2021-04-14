import NavMenu from './NavMenu';
import {NavBarLink} from './Link';

export default class NavBar extends NavMenu {

    // Public Int
    get totalWidth() {
        let width = 0;
        this.links.forEach(link => {
            width += link.width;
        });
        return width;
    }

    constructor(menu, labelMappings = {}) {
        super(menu, labelMappings)
        for (let i = 0; i < this.node.children.length; i++) {
            const link = this.node.children[i];
            let newLink = new NavBarLink(link, this.labelMappings, this.closeAllMenus);
            this.links = [...this.links, newLink];
        }

        this.hideOne = this.hideOne.bind(this);
        this.closeAllMenus = this.closeAllMenus.bind(this);
        this.addEventListeners();

    }

    // Public Null
    hideOne() {
        for (let i = this.links.length - 1; i >= 0; i--) {
            const link = this.links[i];
            if (!link.isHidden) {
                link.hide()
                break;
            }
        }
    }

    handleLinks(link) {
        if (link.childLinksNode.classList.contains("show")) {
            link.close();
        } else {
            this.closeAllMenus();
            link.open();
        }
    }
    
    addEventListeners() {
        this.links.forEach(link => {
            if (link.hasChildren) {
                link.node.addEventListener("click", () => {
                    this.handleLinks(link);
                })
            }
        })
    }

    closeAllMenus() {
        this.links.forEach(link => {
            link.close();
        })
    }
}