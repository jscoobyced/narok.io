import DataService from './data';
import {
  ArticleData, toBlogContentText, toArticle, Align,
} from '../../models/blog/ArticleData';
import { User } from '../../models/User';

const articles: ArticleData[] = [];
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
const contents = [toBlogContentText(lorem, Align.Center, '', 1), toBlogContentText(lorem, Align.Center, '', 2)];
const owner: User = { id: 123456789, name: 'Administrator' };
const textArticle1: ArticleData = toArticle(1, owner, 'Coming soon...', contents, '2020-05-04 22:52');
articles.push(textArticle1);
const textArticle2 = { ...textArticle1 };
textArticle2.id = 2;
articles.push(textArticle2);

export default class DataServiceMock extends DataService {
  private data: any = null;

  constructor(data: any) {
    super('', null);
    this.data = data;
  }

  public setToken = (token: string) => {};

  public getHomePageArticles = async ():
    Promise<ArticleData[]> => Promise.resolve(this.data !== null ? this.data : articles);

  public getArticlesByPage = async (
    page: number,
    perPage: number): Promise<ArticleData[]> => Promise.resolve(this.data !== null ? this.data : articles);

  public getArticleById = async (id: number):
    Promise<ArticleData> => Promise.resolve(this.data !== null ? this.data : textArticle1);

  public saveArticle = async (article: ArticleData):
    Promise<{ id: number, message: string }> => Promise
    .resolve(this.data !== null ? this.data : { id: 1, message: '' });

  public createArticle = async (article: ArticleData):
    Promise<{ id: number, message: string }> => Promise
    .resolve(this.data !== null ? this.data : { id: 1, message: '' });
}
