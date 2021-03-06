import * as React from 'react';
import { SecureUser } from '../../models/User';
import { BlogContent, BlogContentType, ArticleData } from '../../models/blog/ArticleData';
import { EditableBlogContent } from './EditableBlogContent';
import { StaticBlogContent } from './StaticBlogContent';
import { SimpleEditorText } from '../editor/SimpleEditor/SimpleEditor';
import { Article } from './Article';

export interface CmsContent {
  noResult: string,
  fromOwner: string,
  edit: string,
  save: string
}

export const buildArticleComponent = (
  article: ArticleData,
  user: SecureUser,
  noResult: string,
  isEditing: boolean,
): JSX.Element => {
  if (!article) {
    return <>{noResult}</>;
  }
  const { referenceId: ownerId } = article.owner;
  const userId = user.user.referenceId;
  const hasEditPermission = !!user.user.referenceId && !!userId && userId === ownerId;
  return (
    <Article
      key={`bc-${article.id}`}
      article={article}
      hasEditPermission={hasEditPermission}
      isEditing={isEditing}
    />
  );
};

export const buildContent = (
  content: BlogContent,
  noResult: string,
  hasEditPermission: boolean,
  isEditing: boolean,
  buttonText: SimpleEditorText,
  onContentChange: (event: any, index: number) => void,
  removeText: string,
  removeBlogContent: (event: any, index: number) => void,
): JSX.Element => {
  const index = content.id;
  const result = <span key={`bp-ac-${index}`}>{noResult}</span>;

  switch (content.contentType) {
    case BlogContentType.Text:
      if (hasEditPermission && isEditing) {
        return (
          <EditableBlogContent
            key={`ebc-${content.id}`}
            content={content}
            onContentChange={onContentChange}
            buttonText={buttonText}
            removeText={removeText}
            removeBlogContent={removeBlogContent}
          />
        );
      }
      return <StaticBlogContent key={`sbc-${content.id}`} content={content} />;
    case BlogContentType.Image:
      return (
        <span key={`bp-ac-${index}`} className={`article__image article__image-${content.align}`}>
          <img alt={content.altText} key={`bp-ac-img-${index}`} src={content.value} />
        </span>
      );
    default:
      break;
  }

  return result;
};

export const buildTitle = (
  title: string,
  hasEditPermission: boolean,
  isEditing: boolean,
  onChange: (event: any) => void,
): JSX.Element => {
  /* eslint-disable react/no-danger */
  if (!hasEditPermission || !isEditing) {
    return (
      <h2
        className="article__title"
        dangerouslySetInnerHTML={{ __html: title }}
      />
    );
  }
  return (
    <div
      onBlur={onChange}
      className="input article__title"
      tabIndex={-1}
      contentEditable
      dangerouslySetInnerHTML={{ __html: title }}
    />
  );
  /* eslint-enable react/no-danger */
};
