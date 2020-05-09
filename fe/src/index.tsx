import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Home } from './components/main/Home/Home';
import { Article, toArticle, toBlogContentText } from './models/blog/Article';
import HttpServiceMock from './services/http/http.mock';
import './styles/_main.scss';
import HttpService from './services/http/http';

/* eslint-disable */
let httpService;

const mode = process.env.mode as string;
if (mode === 'development') {
  const articles: Article[] = [];
  const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ultricies ut augue eu imperdiet. Donec tincidunt congue tortor, eu finibus ex facilisis ut. Etiam aliquam augue non magna commodo auctor. Phasellus nec tellus egestas, gravida ipsum nec, semper augue. In facilisis quam purus, congue egestas augue gravida at. Aenean et justo placerat, ultrices nisi sit amet, molestie risus. Duis eu nulla eget nisi interdum interdum. Curabitur ornare vel odio rhoncus aliquet. Praesent luctus rutrum pharetra. Nullam sed eros pharetra urna porttitor viverra. Nulla facilisi. Sed molestie sodales rhoncus. Cras gravida porttitor nulla ac suscipit. Suspendisse sed neque nunc. Praesent ac varius nisi. Donec suscipit elit sit amet eros scelerisque tempor. Curabitur bibendum turpis id rhoncus ultricies. Maecenas hendrerit finibus felis, ac lobortis ex vestibulum sit amet. Donec condimentum aliquet nulla, sed scelerisque orci. Phasellus massa felis, maximus eget dolor ut, dapibus semper ante.";
  const contents = [toBlogContentText(lorem)];
  const textArticle: Article = toArticle(1, 'Coming soon...', contents, '2020-05-04 22:52');
  articles.push(textArticle);
  articles.push(textArticle);
  httpService = new HttpServiceMock(articles);
} else {
  httpService = new HttpService();
}

ReactDOM.render(
  <Home httpService={httpService} mode={mode} />,
  document.getElementById('root'),
);
