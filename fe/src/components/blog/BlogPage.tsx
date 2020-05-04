import * as React from 'react';
import { AppContext } from '../../services/context/context';
import CMS from '../../services/i18n/cms';
import { BlogContent } from './BlogContent';
import {
  IArticle, toArticle, IContentText, IContentImage, toContentText, toContentImage, Align,
} from '../../models/blog/Article';
import './BlogPage.scss';

export const BlogPage = () => {
  const { getContent } = React.useContext(AppContext);
  const [articles, setArticles] = React.useState([]);

  const buildArticles = async () => {
    // Will be replaced by an API call
    const contents = [getContent(CMS.LOREMIPSUM), getContent(CMS.LOREMIPSUM)];
    let key = 0;
    const loadedArticles = contents.map(content => {
      key += 1;
      const icontent: IContentText = toContentText(content);
      const image: IContentImage = toContentImage('/images/flame-small.png', Align.Right);
      const article: IArticle = toArticle(
        key,
        'Coming soon...',
        [icontent, image],
        '2020-05-04 12:54',
      );
      return <BlogContent key={`bc-${article.id}`} article={article} />;
    });
    return loadedArticles;
  };

  React.useEffect(() => {
    const isLoaded = (articles && articles.length > 0);
    if (!isLoaded) {
      buildArticles()
        .then(data => {
          setArticles(data);
        });
    }
  });

  if (!articles || articles.length === 0) return <></>;
  return (
    <>
      {articles}
    </>
  );
};
