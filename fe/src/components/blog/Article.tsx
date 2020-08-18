import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../services/context/context';
import CMS from '../../services/i18n/cms';
import { Button } from '../common/Button';
import {
  ArticleData, sortById, toBlogContentText, Align,
} from '../../models/blog/ArticleData';
import { buildContent, buildTitle } from './BlogContentBuilder';
import './Article.scss';

export const Article = (props: {
  article: ArticleData,
  hasEditPermission: boolean,
  isEditing: boolean
}) => {
  const {
    article, hasEditPermission, isEditing,
  } = props;
  const { getContent, dataService, user } = React.useContext(AppContext);
  const [message, setMessage] = React.useState('');
  const [currentArticle, setCurrentArticle] = React.useState(article);
  const {
    id, owner, title, contents, created, modified,
  } = currentArticle;
  const { name } = owner;
  const noResult = getContent(CMS.NORESULT);
  const fromText = getContent(CMS.FROMOWNER);
  const editText = getContent(CMS.EDIT);
  const saveText = getContent(CMS.SAVE);
  const addBlogContentText = getContent(CMS.ADDBLOGCONTENT);
  const contentModified = getContent(CMS.CONTENTMODIDIED);
  const buttonText = {
    boldText: getContent(CMS.BOLDTEXT),
    italicText: getContent(CMS.ITALICTEXT),
    strikeThroughText: getContent(CMS.STRIKETHROUGHTEXT),
    decreaseFontSizeText: getContent(CMS.DECREASETEXT),
    increaseFontSizeText: getContent(CMS.INCREASETEXT),
    orderedListText: getContent(CMS.ORDEREDLISTTEXT),
    unorderedListText: getContent(CMS.UNORDEREDLISTTEXT),
    justifyLeftText: getContent(CMS.JUSTIFYLEFTTEXT),
    justifyCenterText: getContent(CMS.JUSTIFYCENTERTEXT),
    justifyFullText: getContent(CMS.JUSTIFYFULLTEXT),
    justifyRightText: getContent(CMS.JUSTIFYRIGHTTEXT),
  };

  const onContentChange = (event: React.FocusEvent<HTMLDivElement>, index: number) => {
    event.preventDefault();
    const value = (event.target as HTMLDivElement).innerHTML;
    if (!value || value === '') return;
    const newArticle = { ...currentArticle };
    const newContents = newArticle.contents.map(content => {
      const newContent = { ...content };
      if (content.id === index) {
        newContent.value = value;
      }
      return newContent;
    });
    newArticle.contents = newContents;
    setCurrentArticle(newArticle);
  };

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = (event.target as HTMLDivElement).innerHTML;
    if (!value || value === '') return;
    const newArticle = { ...currentArticle };
    newArticle.title = value;
    setCurrentArticle(newArticle);
  };

  const saveArticle = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (currentArticle.id > 0) {
      dataService.saveArticle(currentArticle)
        .then(result => {
          setMessage(result.message);
        });
    } else if (currentArticle.id === -1) {
      const newArticle = { ...currentArticle, owner: user.user };
      dataService.createArticle(newArticle)
        .then(result => {
          setMessage(result.message);
        });
    }
  };

  const addBlogContent = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const newBlogContent = Object.assign([], currentArticle.contents);
    newBlogContent.push(toBlogContentText('', Align.Left, '', 0 + newBlogContent.length));
    const newArticle = { ...currentArticle, contents: newBlogContent };
    setCurrentArticle(newArticle);
  };

  const allContent = contents.map(content => buildContent(
    content,
    noResult,
    hasEditPermission,
    isEditing,
    buttonText,
    onContentChange,
  )).sort(sortById);

  const titleElement = buildTitle(title, hasEditPermission, isEditing, onTitleChange);

  const editButton = hasEditPermission && !isEditing && (
    <Link
      to={`/article/${id}`}
      className="input button article__ender"
    >
      {editText}
    </Link>
  );

  const saveButton = hasEditPermission && isEditing && (
    <Button
      onClick={saveArticle}
      className="article__ender"
    >
      {saveText}
    </Button>
  );

  const addBlogContentButton = hasEditPermission && isEditing && (
    <Button
      onClick={addBlogContent}
      className="article__ender"
    >
      {addBlogContentText}
    </Button>
  );

  const displayMessage = (message && message.length >= 0)
    ? <span className="article__message">{message}</span>
    : <></>;

  return (
    <article key={`a-${id}`}>
      {displayMessage}
      {titleElement}
      <span className="article__created" title={`${contentModified} ${modified}`}>{created}</span>
      {allContent}
      <span className="article__ender">
        {fromText}
        {' '}
        {name}
      </span>
      {editButton}
      {addBlogContentButton}
      {saveButton}
      <span className="article__separator" />
    </article>
  );
};
