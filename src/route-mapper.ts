import {RouteConfig} from "aurelia-router";
import {RouteRecognizer} from "aurelia-route-recognizer";

export class RouteMapper {

    private routeRecognizer: RouteRecognizer = new RouteRecognizer();

    public map(routes: RouteConfig[], parentName = ''): void {
        routes.forEach(config => {
            let name = parentName ? `${parentName}/${config.name}` : config.name;

            let path = config.route;
            let paths: string[] = [];
            if (typeof (path) == 'string')
                paths.push(path);
            else
                paths = <string[]>path;

            paths.forEach(path => {
                this.routeRecognizer.add({
                    path: path,
                    handler: { name: name },
                    caseSensitive: config.caseSensitive === true
                });
                if (config.settings && config.settings.childRoutes) {
                    this.map(config.settings.childRoutes, name);
                }
            });
        });
    }

    /**
     * usage: this.routeMapper.generateChildRoute([{ routeName: 'category', params: { id: 12 } }, { routeName: 'product', params: { id: 2 } }]);
     */
    public generateChildRoute(routes: Array<{ routeName: string, params?: any }>): string {
        let routeName: string = '';
        return routes.map(route => {
            routeName = routeName ? `${routeName}/${route.routeName}` : route.routeName;
            return this.routeRecognizer.generate(routeName, route.params);
        }).join('');
    }
}