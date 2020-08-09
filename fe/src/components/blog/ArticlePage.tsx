import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArticleData, toArticle } from '../../models/blog/ArticleData';
import { AppContext } from '../../services/context/context';
import CMS from '../../services/i18n/cms';
import { Article } from './Article';
import { toUser } from '../../models/User';
import './ArticlePage.scss';

export const ArticlePage = () => {
  const { getContent, user, dataService } = React.useContext(AppContext);
  const { articleId } = useParams();
  const [article, setArticle] = React.useState(toArticle(0, toUser('', '', '', '', ''), '', [], ''));
  const backText = getContent(CMS.BACK);

  const getArticle = async (): Promise<void> => {
    dataService.getArticleById(+articleId)
      .then(data => {
        setArticle(data);
      });
  };

  const buildArticle = (rawArticle: ArticleData): JSX.Element => {
    const noArticle = getContent(CMS.NORESULT);
    if (!rawArticle) {
      return <>{noArticle}</>;
    }
    const fromOwner = getContent(CMS.FROMOWNER);
    const edit = getContent(CMS.EDIT);
    const save = getContent(CMS.SAVE);
    const { id: ownerId } = rawArticle.owner;
    const userId = user.user.id;
    return (
      <Article
        key={`bc-${rawArticle.id}`}
        article={rawArticle}
        fromText={fromOwner}
        editText={edit}
        saveText={save}
        hasEditPermission={userId === ownerId}
        isEditing
      />
    );
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
