import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../services/context/context';
import CMS from '../../services/i18n/cms';
import { Article, BlogContent, BlogContentType } from '../../models/blog/Article';
import { SimpleEditor, handleKeyPress } from '../editor/SimpleEditor/SimpleEditor';
import './BlogArticle.scss';

export const BlogArticle = (props: {
  article: Article,
  fromText: string,
  editText: string,
  saveText: string,
  hasEditPermission: boolean,
  isEditing: boolean
}) => {
  const {
    article, fromText, editText, saveText, hasEditPermission, isEditing,
  } = props;
  const { getContent, dataService } = React.useContext(AppContext);
  const [message, setMessage] = React.useState('');
  const [currentArticle, setCurrentArticle] = React.useState(article);
  const {
    id, owner, title, contents, created,
  } = currentArticle;
  const { name } = owner;
  const buttonText = {
    boldText: getContent(CMS.BOLDTEXT),
    italicText: getContent(CMS.ITALICTEXT),
    decreaseFontSizeText: getContent(CMS.DECREASETEXT),
    increaseFontSizeText: getContent(CMS.INCREASETEXT),
    orderedListText: getContent(CMS.ORDEREDLISTTEXT),
    unorderedListText: getContent(CMS.UNORDEREDLISTTEXT),
    justifyLeftText: getContent(CMS.JUSTIFYLEFTTEXT),
    justifyCenterText: getContent(CMS.JUSTIFYCENTERTEXT),
    justifyFullText: getContent(CMS.JUSTIFYFULLTEXT),
    justifyRightText: getContent(CMS.JUSTIFYRIGHTTEXT),
  };

  const createNonEditableText = (content: BlogContent, index: number) => (
    <span
      key={`bp-ac-${index}`}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: content.value }}
      className="article__content"
    />
  );

  const updateContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const {
      target: {
        value,
      },
    } = event;
    const newArticle = { ...currentArticle };
    newArticle.contents[0].value = value;
    setCurrentArticle(newArticle);
  };

  /* eslint-disable react/no-danger, jsx-a11y/control-has-associated-label */
  const createEditableText = (content: BlogContent, index: number) => (
    <textarea
      cols={80}
      rows={10}
      tabIndex={-1}
      id={`bg-${index}`}
      key={`bp-ac-${index}`}
      className="article__content"
      onChange={updateContent}
      value={content.value}
    />
  );
  /* eslint-enable react/no-danger, jsx-a11y/control-has-associated-label */

  const buildContent = (icontent: BlogContent, index: number) => {
    let result = <span key={`bp-ac-${index}`} />;
    switch (icontent.contentType) {
      case BlogContentType.Text:
        if (hasEditPermission && isEditing) result = createEditableText(icontent, index);
        else result = createNonEditableText(icontent, index);
        break;
      case BlogContentType.Image:
        result = (
          <span key={`bp-ac-${index}`} className={`article__image article__image-${icontent.align}`}>
            <img alt={icontent.altText} key={`bp-ac-img-${index}`} src={icontent.value} />
          </span>
        );
        break;
      default:
        break;
    }
    return result;
  };

  let key = 0;
  const allContent = contents.map(content => {
    key += 1;
    return buildContent(content, key);
  });

  const saveArticle = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (currentArticle && currentArticle.id > 0) {
      dataService.saveArticle(currentArticle)
        .then(result => {
          setMessage(result.message);
        });
    } else if (currentArticle && currentArticle.id === 0) {
      dataService.createArticle(currentArticle)
        .then(result => {
          setMessage(result.message);
        });
    }
  };

  const editButton = hasEditPermission && !isEditing && (
    <Link to={`/article/${id}`} className="button article__ender">
      {editText}
    </Link>
  );

  const saveButton = hasEditPermission && isEditing && (
    <span
      onClick={saveArticle}
      onKeyPress={() => { }}
      role="button"
      tabIndex={-1}
      className="button article__ender"
    >
      {saveText}
    </span>
  );

  const textEditor = hasEditPermission && isEditing && (
    <SimpleEditor
      buttonText={buttonText}
    />
  );

  const displayMessage = (message && message.length >= 0)
    ? <span className="article__message">{message}</span>
    : <></>;

  return (
    <article key={`a-${id}`}>
      {displayMessage}
      <h2 className="article__title">{title}</h2>
      <span className="article__created">{created}</span>
      {textEditor}
      {allContent}
      <span className="article__ender">
        {fromText}
        {' '}
        {name}
      </span>
      {editButton}
      {saveButton}
      <span className="article__separator" />
    </article>
  );
};
