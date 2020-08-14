import * as React from 'react';
import { ArticleData, sortByInverseId } from '../../models/blog/ArticleData';
import { AppContext } from '../../services/context/context';
import CMS from '../../services/i18n/cms';
import { buildArticleComponent } from './BlogContentBuilder';
import './BlogPage.scss';

export const BlogPage = () => {
  const { getContent, user, dataService } = React.useContext(AppContext);
  const [articles, setArticles] = React.useState([]);

  const getArticles = async (): Promise<void> => {
    const data = await dataService.getHomePageArticles();
    if (!data || data.length === 0 || data.length === undefined) {
      return;
    }
    setArticles(data.sort(sortByInverseId));
  };

  const buildArticles = (rawArticles: ArticleData[]): JSX.Element[] => {
    const noResult = getContent(CMS.NORESULT);
    const fromOwner = getContent(CMS.FROMOWNER);
    const edit = getContent(CMS.EDIT);
    const save = getContent(CMS.SAVE);
    const cms = {
      noResult, fromOwner, save, edit,
    };
    if (!rawArticles || rawArticles.length === 0) {
      return [<article key="bc-0">{noResult}</article>];
    }
    const loadedArticles = rawArticles.map(
      article => buildArticleComponent(article,
        user,
        cms,
        false));
    return loadedArticles;
  };

  React.useEffect(() => {
    getArticles();
  }, [user]);

  return (
    <>
      {buildArticles(articles)}
    </>
  );
};
