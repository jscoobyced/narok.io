import * as React from 'react';
import { BlogContent, BlogContentType } from '../../models/blog/ArticleData';
import { EditableBlogContent } from './EditableBlogContent';
import { StaticBlogContent } from './StaticBlogContent';
import { SimpleEditorText } from '../editor/SimpleEditor/SimpleEditor';

export const buildContent = (
  content: BlogContent,
  noResult: string,
  hasEditPermission: boolean,
  isEditing: boolean,
  buttonText: SimpleEditorText,
  onContentChange: (event: React.FocusEvent<HTMLDivElement>, index: number) => void,
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
