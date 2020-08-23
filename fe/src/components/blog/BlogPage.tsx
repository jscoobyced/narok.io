import * as React from 'react';
import { ArticleData, sortByInverseId } from '../../models/blog/ArticleData';
import { AppContext } from '../../services/context/context';
import CMS from '../../services/i18n/cms';
import { buildArticleComponent } from './BlogContentBuilder';
import { Button } from '../common/Button';
import './BlogPage.scss';

export const BlogPage = () => {
  const { getContent, user, dataService } = React.useContext(AppContext);
  const [articles, setArticles] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [currentCount, setCurrentCount] = React.useState(0);
  const perPage = 5;
  const nextPageText = getContent(CMS.NEXTPAGE);
  const previousPageText = getContent(CMS.PREVIOUSPAGE);

  const getArticles = async (): Promise<void> => {
    const articleResponse = await dataService.getArticlesByPage(currentPage, perPage);
    if (!articleResponse
      || !articleResponse.articles
      || articleResponse.articles.length === 0
      || articleResponse.articles.length === undefined) {
      return;
    }
    const { articles: data, count } = articleResponse;
    setCurrentCount(count);
    setArticles(data.sort(sortByInverseId));
  };

  const buildArticles = (rawArticles: ArticleData[]): JSX.Element[] => {
    const noResult = getContent(CMS.NORESULT);
    if (!rawArticles || rawArticles.length === 0) {
      return [<article key="bc-0">{noResult}</article>];
    }
    const loadedArticles = rawArticles.map(
      article => buildArticleComponent(article,
        user,
        noResult,
        false),
    );
    return loadedArticles;
  };

  const nextPageAction = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setCurrentPage(currentPage + 1);
  };

  const previousPageAction = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const hasNextPage = currentCount > ((currentPage + 1) * perPage);
  const hasPreviousPage = currentPage > 0;

  const nextPageButton = hasNextPage ? (
    <Button
      onClick={nextPageAction}
      className="article__ender"
    >
      {nextPageText}
    </Button>
  ) : <></>;

  const previousPageButton = hasPreviousPage ? (
    <Button
      onClick={previousPageAction}
      className="article__beginner"
    >
      {previousPageText}
    </Button>
  ) : <></>;

  const pagination = hasPreviousPage || hasNextPage ? (
    <article>
      {nextPageButton}
      {previousPageButton}
    </article>
  ) : <></>;

  React.useEffect(() => {
    getArticles();
  }, [user, currentPage]);

  return (
    <>
      {buildArticles(articles)}
      {pagination}
    </>
  );
};
