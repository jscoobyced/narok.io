import * as React from 'react';
import { AppContext } from '../../services/context/context';
import CMS from '../../services/i18n/cms';
import { BlogContent } from './BlogContent';
import { IArticle, toArticle } from '../../models/blog/Article';
import './BlogPage.scss';

export const BlogPage = () => {
  const { getContent } = React.useContext(AppContext);
  const [articles, setArticles] = React.useState([]);

  const buildContent = async () => {
    // Will be replaced by an API call
    const contents = [getContent(CMS.LOREMIPSUM), getContent(CMS.LOREMIPSUM)];
    let key = 0;
    const loadedArticles = contents.map(content => {
      const article: IArticle = toArticle('This is a title', [content, content], '2020-05-04 12:54');
      key += 1;
      return <BlogContent key={`bc-${key}`} article={article} />;
    });
    return loadedArticles;
  };

  React.useEffect(() => {
    const isLoaded = (articles && articles.length > 0);
    if (!isLoaded) {
      buildContent()
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
