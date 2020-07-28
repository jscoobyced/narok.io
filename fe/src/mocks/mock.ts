import HttpServiceMock from '../services/http/http.mock';
import { Article, toArticle, toBlogContentText } from '../models/blog/Article';
import { User } from '../models/User';
import UserServiceMock from '../services/auth/user.mock';
import { UserService } from '../services/auth/user';

export const httpServiceMock = (): HttpServiceMock => {
  const articles: Article[] = [];
  const lorem = '<strong>Lorem ipsum dolor sit amet</strong>, consectetur adipiscing elit. Nam ultricies '
    + 'ut augue eu imperdiet. '
    + 'Donec tincidunt congue tortor, eu finibus ex facilisis ut. Etiam aliquam augue non magna commodo '
    + 'auctor. Phasellus nec tellus egestas, gravida ipsum nec, semper augue. In facilisis quam purus, '
    + 'congue egestas augue gravida at. Aenean et justo placerat, ultrices nisi sit amet, molestie risus. '
    + 'Duis eu nulla eget nisi interdum interdum. Curabitur ornare vel odio rhoncus aliquet. Praesent '
    + 'luctus rutrum pharetra. Nullam sed eros pharetra urna porttitor viverra. Nulla facilisi. Sed '
    + 'molestie sodales rhoncus. Cras gravida porttitor nulla ac suscipit. Suspendisse sed neque nunc. '
    + 'Praesent ac varius nisi. Donec suscipit elit sit amet eros scelerisque tempor. Curabitur bibendum '
    + 'turpis id rhoncus ultricies. Maecenas hendrerit finibus felis, ac lobortis ex vestibulum sit amet. '
    + 'Donec condimentum aliquet nulla, sed scelerisque orci. Phasellus massa felis, maximus eget dolor '
    + 'ut, dapibus semper ante.';
  const contents = [toBlogContentText(lorem), toBlogContentText(lorem)];
  const owner: User = { id: '123456789', name: 'Administrator' };
  const textArticle1: Article = toArticle(1, owner, 'Coming soon...', contents, '2020-05-04 22:52');
  articles.push(textArticle1);
  const textArticle2 = { ...textArticle1 };
  textArticle2.id = 2;
  articles.push(textArticle2);
  return new HttpServiceMock(articles);
};

export const userServiceMock = (): UserService => new UserServiceMock();
