import * as React from 'react';
import { BlogContent } from '../../models/blog/ArticleData';
import { SimpleEditor, SimpleEditorText } from '../editor/SimpleEditor/SimpleEditor';
import './EditableBlogContent.scss';

interface MyProps {
  content: BlogContent;
  onContentChange: (event: any, index: number) => void;
  buttonText: SimpleEditorText;
}

/* eslint-disable react/no-danger, jsx-a11y/control-has-associated-label */
export const EditableBlogContent = (props: MyProps) => {
  const { content, onContentChange, buttonText } = props;
  return (
    <>
      <SimpleEditor
        key={`ebc-se-${content.id}`}
        buttonText={buttonText}
      />
      <div
        onBlur={event => onContentChange(event, content.id)}
        tabIndex={-1}
        id={`ebc-c-${content.id}`}
        key={`ebc-c-${content.id}`}
        className="article__content article__content-editing"
        contentEditable
        dangerouslySetInnerHTML={{ __html: content.value }}
      />
    </>
  );
};
/* eslint-enable react/no-danger, jsx-a11y/control-has-associated-label */
