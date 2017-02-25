import { RouteConfig } from "aurelia-router";
export declare class RouteMapper {
    private routeRecognizer;
    map(routes: RouteConfig[], parentName?: string): void;
    /**
     * usage: this.routeMapper.generateChildRoute([{ routeName: 'category', params: { id: 12 } }, { routeName: 'product', params: { id: 2 } }]);
     */
    generateChildRoute(routes: Array<{
        routeName: string;
        params?: any;
    }>): string;
}
