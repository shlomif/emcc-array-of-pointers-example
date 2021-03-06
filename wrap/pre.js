(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require("./mysqrt"));
    } else {
        root.Mysqrt = factory();
    }
}(this, function () {
