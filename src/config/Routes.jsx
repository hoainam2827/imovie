import React from "react";

import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Detail from "../pages/detail/Detail";
import Catalog from "../pages/Catalog";

// Nếu tìm /X vào Catalog; /X/X... vào Detail; /X/search/X vào Catalog
const Routes = () => {
    return (
        <Switch>
            <Route path="/:category/search/:keyword" component={Catalog} />
            <Route path="/:category/:id" component={Detail} />
            <Route path="/:category" component={Catalog} />
            <Route path="/" exact component={Home} />
        </Switch>
    );
};

export default Routes;
