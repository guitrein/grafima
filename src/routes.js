import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main';
import Product from './pages/product';
import Grafima from './pages/grafima';
import Erro from './pages/404';
import Config from './pages/config';

const Routes = () =>(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/products/:id" component={Product} />
            <Route path="/grafima" component={Grafima} />
            <Route exact path="/config" component={Config} />
            <Route path="*" component={Erro} />
        </Switch>
    </BrowserRouter>
);

export default Routes;