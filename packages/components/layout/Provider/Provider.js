"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styled_1 = require("../../../utils/styled");
var theme_1 = require("../../../common/theme");
var Root_1 = require("./Root");
var resetCss_1 = require("./resetCss");
var Provider = /** @class */ (function (_super) {
    __extends(Provider, _super);
    function Provider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Provider.prototype.componentDidMount = function () {
        this.stylesheet = document.createElement("style");
        this.stylesheet.type = "text/css";
        this.stylesheet.innerHTML = resetCss_1.default;
        if (document && document.head) {
            document.head.appendChild(this.stylesheet);
        }
    };
    Provider.prototype.componentWillUnmount = function () {
        if (this.stylesheet && document && document.head) {
            document.head.removeChild(this.stylesheet);
            delete this.stylesheet;
        }
    };
    Provider.prototype.render = function () {
        var _a = this.props, theme = _a.theme, props = __rest(_a, ["theme"]);
        return (React.createElement(styled_1.ThemeProvider, { theme: __assign({}, theme_1.default, theme) },
            React.createElement(Root_1.default, __assign({}, props))));
    };
    Provider.displayName = "W.Provider";
    Provider.defaultProps = {
        theme: {}
    };
    return Provider;
}(React.PureComponent));
exports.default = Provider;
//# sourceMappingURL=Provider.js.map