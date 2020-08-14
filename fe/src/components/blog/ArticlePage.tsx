import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArticleData, toArticle } from '../../models/blog/ArticleData';
import { AppContext } from '../../services/context/context';
import CMS from '../../services/i18n/cms';
import { toUser } from '../../models/User';
import { buildArticleComponent } from './BlogContentBuilder';
import './ArticlePage.scss';

export const ArticlePage = () => {
  const { getContent, user, dataService } = React.useContext(AppContext);
  const { articleId } = useParams();
  const [article, setArticle] = React.useState(toArticle(0, toUser(0, '', '', ''), '', [], ''));
  const backText = getContent(CMS.BACK);

  const getArticle = async (): Promise<void> => {
    dataService.getArticleById(+articleId)
      .then(data => {
        setArticle(data);
      });
  };

  const buildArticle = (rawArticle: ArticleData): JSX.Element => {
    const noResult = getContent(CMS.NORESULT);
    const fromOwner = getContent(CMS.FROMOWNER);
    const edit = getContent(CMS.EDIT);
    const save = getContent(CMS.SAVE);
    return buildArticleComponent(
      rawArticle,
      user,
      {
        noResult,
        fromOwner,
        save,
        edit,
      },
      true);
  };

  React.useEffect(() => {
    getArticle();
  }, []);

  return (
    <>
      <Link className="link-back" to="/">{backText}</Link>
      {buildArticle(article)}
    </>
  );
};
