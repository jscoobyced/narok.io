import * as React from 'react';
import { AppContext } from '../../services/context/context';
import CMS from '../../services/i18n/cms';
import { BlogContent } from './BlogContent';
import {
  IArticle, toArticle, IContentText, IContentImage, toContentText, toContentImage, Align,
} from '../../models/blog/Article';
import './BlogPage.scss';

export const BlogPage = () => {
  const { getContent, dataService } = React.useContext(AppContext);
  const [articles, setArticles] = React.useState([]);

  const buildArticles = async () => {
    const data = await dataService.getHomePageBlog();
    if (!data || data.length === 0 || data.length === undefined) {
      const noResult = getContent(CMS.NORESULT);
      return [<span key="bc-0">{noResult}</span>];
    }
    const loadedArticles = data.map(article => <BlogContent key={`bc-${article.id}`} article={article} />);
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
