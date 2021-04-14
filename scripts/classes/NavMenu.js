export default class NavMenu {
    node; // HTMLElement
    links = []; // Array<Link>
    labelMappings = {};
    constructor(menu) {
        this.node = menu;
        this.hideAll = this.hideAll.bind(this)
        this.showAll = this.showAll.bind(this)
    }

    // Public Null
    hideAll() {
        this.links.forEach(link => link.hide());
    }

    // Public Null
    showAll() {
        this.links.forEach(link => link.show());
    }
}