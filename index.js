/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./scripts/classes/DynamicNavigation.ts":
/*!**********************************************!*\
  !*** ./scripts/classes/DynamicNavigation.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Navigation_1 = __webpack_require__(/*! ./Navigation */ "./scripts/classes/Navigation.ts");
var DynamicNavigation = /** @class */ (function (_super) {
    __extends(DynamicNavigation, _super);
    function DynamicNavigation(nav) {
        var _this = _super.call(this, nav) || this;
        try {
            _this.breakpoint = parseInt(_this.node.dataset.breakpoint);
        }
        catch (error) {
            console.error("Invalid Breakpoint");
        }
        return _this;
    }
    // Public Null
    DynamicNavigation.prototype.handleResize = function () {
        // for mobile
        this.hide();
        if (this.breakpoint) {
            if (document.documentElement.clientWidth <= this.breakpoint) {
                this.moveAllToHamburger();
                this.show();
                return;
            }
        }
        // for desktop
        this.moveAllToNav();
        var timeout = 0;
        while (this.isNavWrapped() && timeout < 1000) {
            this.moveOneToHamburger();
            timeout++;
        }
        if (timeout > 900) {
            throw new Error("Infinite Loop");
        }
        this.show();
    };
    // Private Bool
    DynamicNavigation.prototype.isNavWrapped = function () {
        var navigationRect = this.navBar.node.getBoundingClientRect();
        var navWidth = navigationRect.right - navigationRect.left;
        var linksWidth = this.navBar.totalWidth;
        // 50 is icon width, refactor later to use actual icon width
        if (linksWidth > navWidth - 50) {
            return true;
        }
        return false;
    };
    return DynamicNavigation;
}(Navigation_1.default));
exports.default = DynamicNavigation;


/***/ }),

/***/ "./scripts/classes/FixedNavigation.ts":
/*!********************************************!*\
  !*** ./scripts/classes/FixedNavigation.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Navigation_1 = __webpack_require__(/*! ./Navigation */ "./scripts/classes/Navigation.ts");
var FixedNavigation = /** @class */ (function (_super) {
    __extends(FixedNavigation, _super);
    function FixedNavigation(nav) {
        var _this = _super.call(this, nav) || this;
        try {
            _this.breakpoint = _this.node.dataset.breakpoint;
        }
        catch (error) {
            console.error("Invalid Breakpoint");
        }
        return _this;
    }
    // Public Null
    FixedNavigation.prototype.handleResize = function () {
        // for mobile
        if (document.documentElement.clientWidth <= this.breakpoint) {
            this.moveAllToHamburger();
        }
        // for desktop
        else {
            this.moveAllToNav();
        }
    };
    return FixedNavigation;
}(Navigation_1.default));
exports.default = FixedNavigation;


/***/ }),

/***/ "./scripts/classes/Hamburger.ts":
/*!**************************************!*\
  !*** ./scripts/classes/Hamburger.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var NavMenu_1 = __webpack_require__(/*! ./NavMenu */ "./scripts/classes/NavMenu.ts");
var Link_1 = __webpack_require__(/*! ./Link */ "./scripts/classes/Link.ts");
var Hamburger = /** @class */ (function (_super) {
    __extends(Hamburger, _super);
    function Hamburger(menu) {
        var _this = _super.call(this, menu) || this;
        _this.links = [];
        _this.subMenuType = _this.node.dataset.expand;
        if (!_this.subMenuType) {
            console.warn("No Expand Type Specified");
        }
        var children = _this.node.children;
        for (var i = 0; i < children.length; i++) {
            var link = children[i];
            if (link.classList.contains("c-hamburger__element")) {
                var newLink = new Link_1.HamburgerNavLink(link, _this.subMenuType ? _this.subMenuType : "accordian");
                newLink.makeUntabbable();
                _this.links = __spreadArray(__spreadArray([], _this.links), [newLink]);
            }
        }
        try {
            _this.type = _this.node.dataset.type;
        }
        catch (error) {
            console.error("No Hamburger Type Specified");
        }
        if (_this.type && _this.type == "slideover") {
            var closeDiv = document.createElement("li");
            closeDiv.classList.add("c-hamburger__close-wrapper");
            closeDiv.innerHTML =
                "<svg width=\"12.32781mm\" height=\"12.327812mm\" viewBox=\"0 0 12.32781 12.327812\" version=\"1.1\" class=\"c-hamburger__close-button\">\n                    <defs id=\"defs2\" />\n                    <g inkscape:label=\"Layer 1\" id=\"layer1\" transform=\"translate(-8.837041,-271.65379)\" class=\"c-cross__g\">\n                        <rect class=\"c-cross__rect\" width=\"16.394718\" height=\"1.0394346\" x=\"-194.03687\" y=\"206.53433\" transform=\"rotate(-45)\" />\n                        <rect transform=\"rotate(-135)\" y=\"-186.35922\" x=\"-215.2514\" height=\"1.0394346\" width=\"16.394718\" class=\"c-cross__rect\" />\n                    </g>\n                </svg>";
            _this.node.prepend(closeDiv);
        }
        _this.addEventListeners();
        return _this;
    }
    Object.defineProperty(Hamburger.prototype, "isHidden", {
        // Public Bool
        get: function () {
            if (this.node.classList.contains("show")) {
                return false;
            }
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Hamburger.prototype, "isHamburgerFull", {
        get: function () {
            this.links.forEach(function (link) {
                if (link.isHidden) {
                    return false;
                }
            });
            return true;
        },
        enumerable: false,
        configurable: true
    });
    // Public Null
    Hamburger.prototype.show = function () {
        this.links.forEach(function (link) {
            link.makeTabbable();
        });
        switch (this.type) {
            case "dropdown":
                this.node.classList.add("show");
                break;
            case "slideover":
                this.node.classList.add("show");
                var body = document.getElementsByTagName("body")[0];
                body.classList.add("no-scroll");
                break;
            case "slidewith":
                break;
            case "fullpage":
                this.node.classList.add("show");
                break;
            default:
                throw new Error("Invalid Hamburger Type");
        }
    };
    // Public Null
    Hamburger.prototype.hide = function () {
        var _this = this;
        this.links.forEach(function (link) {
            link.makeUntabbable();
        });
        switch (this.type) {
            case "dropdown":
                this.node.classList.remove("show");
                break;
            case "slideover":
                this.node.classList.remove("show");
                var body = document.getElementsByTagName("body")[0];
                body.classList.remove("no-scroll");
                break;
            case "slidewith":
                break;
            case "fullpage":
                this.node.classList.remove("show");
                break;
            default:
                throw new Error("Invalid Hamburger Type");
        }
        setTimeout(function () {
            _this.closeAllMenus();
        }, 150);
    };
    // Public Null
    Hamburger.prototype.showOne = function () {
        for (var i = this.links.length - 1; i >= 0; i--) {
            var link = this.links[i];
            if (link.isHidden) {
                link.showLink();
                break;
            }
        }
    };
    Hamburger.prototype.handleLinks = function (link) {
        if (!link.isMenuOpen) {
            this.closeAllMenus();
            link.open();
        }
        else {
            link.close();
        }
    };
    Hamburger.prototype.closeAllMenus = function () {
        this.links.forEach(function (link) {
            link.close();
        });
    };
    Hamburger.prototype.addEventListeners = function () {
        var _this = this;
        this.links.forEach(function (link) {
            if (link.hasChildren) {
                link.node.addEventListener("click", function () {
                    _this.handleLinks(link);
                });
            }
        });
        if (this.type == "slideover") {
            var closeButton = document.getElementsByClassName("c-hamburger__close-button")[0];
            closeButton.addEventListener("click", function () {
                _this.hide();
            });
        }
    };
    return Hamburger;
}(NavMenu_1.default));
exports.default = Hamburger;


/***/ }),

/***/ "./scripts/classes/Icon.ts":
/*!*********************************!*\
  !*** ./scripts/classes/Icon.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var Icon = /** @class */ (function () {
    function Icon(icon) {
        this.node = icon;
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }
    // Public Null
    Icon.prototype.show = function () {
        if (this.node.classList.contains("hide")) {
            this.node.classList.remove("hide");
        }
    };
    // Public Null
    Icon.prototype.hide = function () {
        if (!this.node.classList.contains("hide")) {
            this.node.classList.add("hide");
        }
    };
    Icon.prototype.spin = function () {
        this.node.classList.add("spin");
    };
    Icon.prototype.unspin = function () {
        this.node.classList.remove("spin");
    };
    return Icon;
}());
exports.default = Icon;


/***/ }),

/***/ "./scripts/classes/Link.ts":
/*!*********************************!*\
  !*** ./scripts/classes/Link.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HamburgerNavLink = exports.NavBarLink = exports.Link = void 0;
var Icon_1 = __webpack_require__(/*! ./Icon */ "./scripts/classes/Icon.ts");
var Link = /** @class */ (function () {
    function Link(link) {
        this.childLinks = [];
        this.node = link;
    }
    Object.defineProperty(Link.prototype, "hasChildren", {
        get: function () {
            if (this.childLinksNode) {
                return true;
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Link.prototype, "isHidden", {
        get: function () {
            if (this.node.classList.contains("hide")) {
                return true;
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Link.prototype.hideLink = function () {
        if (!this.isHidden) {
            this.node.classList.add("hide");
        }
    };
    Link.prototype.showLink = function () {
        if (this.isHidden) {
            this.node.classList.remove("hide");
        }
    };
    Link.prototype.makeTabbable = function () {
        if (this.link) {
            this.link.tabIndex = 0;
        }
    };
    Link.prototype.makeUntabbable = function () {
        if (this.link) {
            this.link.tabIndex = -1;
        }
    };
    return Link;
}());
exports.Link = Link;
var NavBarLink = /** @class */ (function (_super) {
    __extends(NavBarLink, _super);
    function NavBarLink(link) {
        var _this = _super.call(this, link) || this;
        var children = _this.node.children;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child.classList.contains("c-navbar__link") || child.classList.contains("c-navbar__button")) {
                _this.link = child;
                var linkChildren = child.getElementsByClassName("c-icon");
                if (linkChildren) {
                    _this.icon = new Icon_1.default(linkChildren[0]);
                }
                else {
                    throw new Error("No Icon For Dropdown");
                }
            }
            else if (child.classList.contains("c-navbar__sub-menu")) {
                _this.childLinksNode = child;
            }
        }
        if (_this.hasChildren) {
            var links = _this.childLinksNode.children;
            for (var i = 0; i < links.length; i++) {
                var link_1 = links[i];
                _this.childLinks = __spreadArray(__spreadArray([], _this.childLinks), [link_1]);
            }
        }
        return _this;
    }
    Object.defineProperty(NavBarLink.prototype, "width", {
        // Public Int
        get: function () {
            var linkRect = this.node.getBoundingClientRect();
            return linkRect.right - linkRect.left;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NavBarLink.prototype, "isMenuOpen", {
        get: function () {
            if (this.childLinksNode.classList.contains("show")) {
                return true;
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    NavBarLink.prototype.toggle = function () {
        if (this.isMenuOpen) {
            this.closeMenu();
        }
        else {
            this.openMenu();
        }
    };
    NavBarLink.prototype.openMenu = function () {
        if (this.childLinksNode) {
            this.childLinksNode.classList.add("show");
            var buttonRect = this.node.getBoundingClientRect();
            this.childLinksNode.style.top = buttonRect.bottom + "px";
            this.icon.spin();
        }
    };
    NavBarLink.prototype.closeMenu = function () {
        if (this.childLinksNode) {
            this.childLinksNode.classList.remove("show");
            this.icon.unspin();
        }
    };
    return NavBarLink;
}(Link));
exports.NavBarLink = NavBarLink;
var HamburgerNavLink = /** @class */ (function (_super) {
    __extends(HamburgerNavLink, _super);
    function HamburgerNavLink(link, expandType) {
        var _this = _super.call(this, link) || this;
        _this.expandType = expandType;
        var children = _this.node.children;
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child.classList.contains("c-hamburger__link") || child.classList.contains("c-hamburger__element-button")) {
                _this.link = child;
                var icons = child.getElementsByClassName("c-icon");
                if (icons) {
                    _this.icon = new Icon_1.default(icons[0]);
                }
            }
            else if (child.classList.contains("c-hamburger__sub-menu")) {
                _this.childLinksNode = child;
            }
        }
        if (_this.hasChildren) {
            var linksArray = _this.childLinksNode.children;
            for (var i = 0; i < linksArray.length; i++) {
                var element = linksArray[i];
                var links = element.getElementsByClassName("c-hamburger__sub-link");
                if (links) {
                    links[0].tabIndex = -1;
                }
                _this.childLinks = __spreadArray(__spreadArray([], _this.childLinks), [element]);
            }
        }
        return _this;
    }
    Object.defineProperty(HamburgerNavLink.prototype, "isMenuOpen", {
        get: function () {
            if (this.childLinksNode.style.maxHeight) {
                return true;
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    HamburgerNavLink.prototype.toggle = function () {
        if (this.isMenuOpen) {
            this.close();
        }
        else {
            this.open();
        }
    };
    HamburgerNavLink.prototype.close = function () {
        if (this.childLinksNode) {
            this.childLinksNode.style.maxHeight = null;
            this.childLinks.forEach(function (element) {
                var links = element.getElementsByClassName("c-hamburger__sub-link");
                if (links) {
                    links[0].tabIndex = -1;
                }
            });
            if (this.icon) {
                this.icon.unspin();
            }
        }
    };
    HamburgerNavLink.prototype.open = function () {
        if (this.childLinksNode) {
            this.childLinksNode.style.maxHeight = this.childLinksNode.scrollHeight + "px";
            this.childLinks.forEach(function (element) {
                var links = element.getElementsByClassName("c-hamburger__sub-link");
                if (links) {
                    links[0].tabIndex = 0;
                }
            });
            if (this.icon) {
                this.icon.spin();
            }
        }
    };
    return HamburgerNavLink;
}(Link));
exports.HamburgerNavLink = HamburgerNavLink;


/***/ }),

/***/ "./scripts/classes/NavBar.ts":
/*!***********************************!*\
  !*** ./scripts/classes/NavBar.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var NavMenu_1 = __webpack_require__(/*! ./NavMenu */ "./scripts/classes/NavMenu.ts");
var Link_1 = __webpack_require__(/*! ./Link */ "./scripts/classes/Link.ts");
var NavBar = /** @class */ (function (_super) {
    __extends(NavBar, _super);
    function NavBar(menu) {
        var _this = _super.call(this, menu) || this;
        _this.links = [];
        var children = _this.node.children;
        for (var i = 0; i < children.length; i++) {
            var link = children[i];
            var newLink = new Link_1.NavBarLink(link);
            _this.links = __spreadArray(__spreadArray([], _this.links), [newLink]);
        }
        _this.hideOne = _this.hideOne.bind(_this);
        _this.closeAllMenus = _this.closeAllMenus.bind(_this);
        _this.addEventListeners();
        return _this;
    }
    Object.defineProperty(NavBar.prototype, "totalWidth", {
        // Public Int
        get: function () {
            var width = 0;
            this.links.forEach(function (link) {
                width += link.width;
            });
            return width;
        },
        enumerable: false,
        configurable: true
    });
    // Public Null
    NavBar.prototype.hideOne = function () {
        for (var i = this.links.length - 1; i >= 0; i--) {
            var link = this.links[i];
            if (!link.isHidden) {
                link.hideLink();
                break;
            }
        }
    };
    NavBar.prototype.handleLinks = function (link) {
        if (link.childLinksNode.classList.contains("show")) {
            link.closeMenu();
        }
        else {
            this.closeAllMenus();
            link.openMenu();
        }
    };
    NavBar.prototype.addEventListeners = function () {
        var _this = this;
        this.links.forEach(function (link) {
            if (link.hasChildren) {
                link.node.addEventListener("click", function () {
                    _this.handleLinks(link);
                });
            }
        });
    };
    NavBar.prototype.closeAllMenus = function () {
        this.links.forEach(function (link) {
            link.closeMenu();
        });
    };
    return NavBar;
}(NavMenu_1.default));
exports.default = NavBar;


/***/ }),

/***/ "./scripts/classes/NavMenu.ts":
/*!************************************!*\
  !*** ./scripts/classes/NavMenu.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var NavMenu = /** @class */ (function () {
    function NavMenu(menu) {
        this.links = [];
        this.node = menu;
        this.hideAll = this.hideAll.bind(this);
        this.showAll = this.showAll.bind(this);
    }
    // Public Null
    NavMenu.prototype.hideAll = function () {
        this.links.forEach(function (link) { return link.hideLink(); });
    };
    // Public Null
    NavMenu.prototype.showAll = function () {
        this.links.forEach(function (link) { return link.showLink(); });
    };
    return NavMenu;
}());
exports.default = NavMenu;


/***/ }),

/***/ "./scripts/classes/Navigation.ts":
/*!***************************************!*\
  !*** ./scripts/classes/Navigation.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Hamburger_1 = __webpack_require__(/*! ./Hamburger */ "./scripts/classes/Hamburger.ts");
var NavBar_1 = __webpack_require__(/*! ./NavBar */ "./scripts/classes/NavBar.ts");
var Navigation = /** @class */ (function () {
    function Navigation(nav) {
        this.node = nav;
        this.getNavItems();
        this.addEventListeners();
    }
    // Private Null
    Navigation.prototype.getNavItems = function () {
        var navBars = this.node.getElementsByClassName("c-navbar");
        if (!navBars) {
            throw new Error("No c-navbar present.");
        }
        this.navBar = new NavBar_1.default(navBars[0]);
        var hamburgers = this.node.getElementsByClassName("c-hamburger");
        if (!hamburgers) {
            throw new Error("No c-hamburger present.");
        }
        this.hamburgerWrapper = hamburgers[0];
        var hamburgerMenus = this.hamburgerWrapper.getElementsByClassName("c-hamburger__menu");
        if (!hamburgerMenus) {
            throw new Error("No c-hamburger__menu present.");
        }
        this.hamburger = new Hamburger_1.default(hamburgerMenus[0]);
        var hamburgerButtons = this.node.getElementsByClassName("c-hamburger__button");
        if (!hamburgerButtons) {
            throw new Error("No c-hamburger__button present.");
        }
        this.hamburgerButton = hamburgerButtons[0];
    };
    // Private Null
    Navigation.prototype.moveAllToHamburger = function () {
        this.hamburgerWrapper.classList.remove("hide");
        this.hamburger.showAll();
        this.navBar.hideAll();
    };
    // Private Null
    Navigation.prototype.moveAllToNav = function () {
        this.hamburgerWrapper.classList.add("hide");
        this.hamburger.hideAll();
        this.navBar.showAll();
    };
    // Private Null
    Navigation.prototype.moveOneToHamburger = function () {
        this.hamburgerWrapper.classList.remove("hide");
        this.navBar.hideOne();
        this.hamburger.showOne();
    };
    // Private Null
    Navigation.prototype.handleHamburgerButton = function () {
        // Hamburger hamburger
        if (this.hamburger.isHidden) {
            this.hamburger.show();
        }
        else {
            this.hamburger.hide();
        }
    };
    Navigation.prototype.getParents = function (elem) {
        if (elem.tagName == "HTML") {
            return [elem];
        }
        return __spreadArray([elem.parentElement], this.getParents(elem.parentElement));
    };
    Navigation.prototype.hasParent = function (elem, parentElement) {
        var parents = this.getParents(elem);
        for (var i = 0; i < parents.length; i++) {
            var parent_1 = parents[i];
            if (parent_1 == parentElement) {
                return true;
            }
        }
        return false;
    };
    // Private Null
    Navigation.prototype.handlePageClick = function (e) {
        if (!this.hasParent(e.target, this.hamburgerWrapper)) {
            this.hamburger.hide();
        }
        if (!this.hasParent(e.target, this.navBar.node)) {
            this.navBar.closeAllMenus();
        }
    };
    // Private Null
    Navigation.prototype.show = function () {
        this.node.classList.add("show");
    };
    Navigation.prototype.hide = function () {
        this.node.classList.remove("show");
    };
    // Private Null
    Navigation.prototype.addEventListeners = function () {
        var _this = this;
        this.hamburgerButton.addEventListener("click", function () {
            _this.handleHamburgerButton();
        });
        window.addEventListener("click", function (e) {
            _this.handlePageClick(e);
        });
    };
    Navigation.prototype.handleResize = function () {
        return;
    };
    return Navigation;
}());
exports.default = Navigation;


/***/ }),

/***/ "./scripts/classes/StaticNavigation.ts":
/*!*********************************************!*\
  !*** ./scripts/classes/StaticNavigation.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Navigation_1 = __webpack_require__(/*! ./Navigation */ "./scripts/classes/Navigation.ts");
var StaticNavigation = /** @class */ (function (_super) {
    __extends(StaticNavigation, _super);
    function StaticNavigation(nav) {
        return _super.call(this, nav) || this;
    }
    return StaticNavigation;
}(Navigation_1.default));
exports.default = StaticNavigation;


/***/ }),

/***/ "./scripts/dynamicNav.ts":
/*!*******************************!*\
  !*** ./scripts/dynamicNav.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var DynamicNavigation_1 = __webpack_require__(/*! ./classes/DynamicNavigation */ "./scripts/classes/DynamicNavigation.ts");
var StaticNavigation_1 = __webpack_require__(/*! ./classes/StaticNavigation */ "./scripts/classes/StaticNavigation.ts");
var FixedNavigation_1 = __webpack_require__(/*! ./classes/FixedNavigation */ "./scripts/classes/FixedNavigation.ts");
var navigationBuilder = function (nav) {
    switch (nav.dataset.type) {
        case "dynamic":
            return new DynamicNavigation_1.default(nav);
        case "static":
            return new StaticNavigation_1.default(nav);
        case "fixed":
            return new FixedNavigation_1.default(nav);
        default:
            throw new Error("No Navigation Type Specified");
    }
};
var navigationItems = document.getElementsByClassName("c-navigation");
var navigationArray = [];
for (var i = 0; i < navigationItems.length; i++) {
    var nav = navigationItems[i];
    var navigation = navigationBuilder(nav);
    navigationArray = __spreadArray(__spreadArray([], navigationArray), [navigation]);
}
if (navigationArray) {
    window.addEventListener("DOMContentLoaded", function () {
        navigationArray.forEach(function (nav) {
            nav.handleResize();
        });
    });
    window.addEventListener("resize", function () {
        navigationArray.forEach(function (nav) {
            nav.handleResize();
        });
    });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**************************!*\
  !*** ./scripts/index.ts ***!
  \**************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./dynamicNav */ "./scripts/dynamicNav.ts");

})();

/******/ })()
;
//# sourceMappingURL=index.js.map