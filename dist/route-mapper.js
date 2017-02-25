"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_route_recognizer_1 = require("aurelia-route-recognizer");
var RouteMapper = (function () {
    function RouteMapper() {
        this.routeRecognizer = new aurelia_route_recognizer_1.RouteRecognizer();
    }
    RouteMapper.prototype.map = function (routes, parentName) {
        var _this = this;
        if (parentName === void 0) { parentName = ''; }
        routes.forEach(function (config) {
            var name = parentName ? parentName + "/" + config.name : config.name;
            var path = config.route;
            var paths = [];
            if (typeof (path) == 'string')
                paths.push(path);
            else
                paths = path;
            paths.forEach(function (path) {
                _this.routeRecognizer.add({
                    path: path,
                    handler: { name: name },
                    caseSensitive: config.caseSensitive === true
                });
                if (config.settings && config.settings.childRoutes) {
                    _this.map(config.settings.childRoutes, name);
                }
            });
        });
    };
    /**
     * usage: this.routeMapper.generateChildRoute([{ routeName: 'category', params: { id: 12 } }, { routeName: 'product', params: { id: 2 } }]);
     */
    RouteMapper.prototype.generateChildRoute = function (routes) {
        var _this = this;
        var routeName = '';
        return routes.map(function (route) {
            routeName = routeName ? routeName + "/" + route.routeName : route.routeName;
            return _this.routeRecognizer.generate(routeName, route.params);
        }).join('');
    };
    return RouteMapper;
}());
exports.RouteMapper = RouteMapper;
