import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { BlogPage } from './blog/BlogPage';

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={BlogPage} />
    <Route path="/article/:id" component={BlogPage} />
  </Switch>
);
