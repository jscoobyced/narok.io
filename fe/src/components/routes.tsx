import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { BlogPage } from './blog/BlogPage';
import { ArticlePage } from './blog/ArticlePage';

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={BlogPage} />
    <Route path="/article/:articleId" component={ArticlePage} />
  </Switch>
);
