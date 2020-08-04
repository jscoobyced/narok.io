import * as React from 'react';
import { BlogArticle } from './BlogArticle';
import { Article } from '../../models/blog/Article';
import { AppContext } from '../../services/context/context';
import CMS from '../../services/i18n/cms';
import './BlogPage.scss';

export const BlogPage = () => {
  const { getContent, user, dataService } = React.useContext(AppContext);
  const [articles, setArticles] = React.useState([]);

  const getArticles = async (): Promise<void> => {
    const data = await dataService.getHomePageArticles();
    if (!data || data.length === 0 || data.length === undefined) {
      return;
    }
    setArticles(data);
  };

  const buildArticles = (rawArticles: Article[]): JSX.Element[] => {
    if (!rawArticles || rawArticles.length === 0) {
      const noResult = getContent(CMS.NORESULT);
      return [<article key="bc-0">{noResult}</article>];
    }
    const fromOwner = getContent(CMS.FROMOWNER);
    const edit = getContent(CMS.EDIT);
    const save = getContent(CMS.SAVE);
    const loadedArticles = rawArticles.map(article => {
      const { id: ownerId } = article.owner;
      const userId = user.user.id;
      return (
        <BlogArticle
          key={`bc-${article.id}`}
          article={article}
          fromText={fromOwner}
          editText={edit}
          saveText={save}
          hasEditPermission={userId === ownerId}
          isEditing={false}
        />
      );
    });
    return loadedArticles;
  };

  React.useEffect(() => {
    getArticles();
  }, []);

  return (
    <>
      {buildArticles(articles)}
    </>
  );
};
