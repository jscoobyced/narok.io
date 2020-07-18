import * as React from 'react';
import { BlogArticle } from './BlogArticle';
import { Article } from '../../models/blog/Article';
import { AppContext } from '../../services/context/context';
import CMS from '../../services/i18n/cms';
import './BlogPage.scss';

export const BlogPage = () => {
  const { getContent, user, dataService } = React.useContext(AppContext);
  const [articles, setArticles] = React.useState([]);

  const getArticles = async (): Promise<Article[]> => {
    const data = await dataService.getHomePageBlog();
    if (!data || data.length === 0 || data.length === undefined) {
      return [];
    }
    return data;
  };

  const buildArticles = (rawArticles: Article[]): JSX.Element[] => {
    if (rawArticles.length === 0) {
      const noResult = getContent(CMS.NORESULT);
      return [<article key="bc-0">{noResult}</article>];
    }
    const fromOwner = getContent(CMS.FROMOWNER);
    const edit = getContent(CMS.EDIT);
    const loadedArticles = rawArticles.map(article => {
      const { id: ownerId } = article.owner;
      const userId = user.user.id;
      return (
        <BlogArticle
          key={`bc-${article.id}`}
          article={article}
          fromText={fromOwner}
          editText={edit}
          canEdit={userId === ownerId}
        />
      );
    });
    return loadedArticles;
  };

  React.useEffect(() => {
    getArticles()
      .then(data => {
        const renderedArticles = buildArticles(data);
        setArticles(renderedArticles);
      });
  }, [user]);

  if (!articles || articles.length === 0) return <></>;

  return (
    <>
      {articles}
    </>
  );
};
