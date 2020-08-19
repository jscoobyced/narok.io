import * as React from 'react';
import { BlogContent } from '../../models/blog/ArticleData';
import { SimpleEditor, SimpleEditorText } from '../editor/SimpleEditor/SimpleEditor';
import { Button } from '../common/Button';
import './EditableBlogContent.scss';

interface MyProps {
  content: BlogContent;
  onContentChange: (event: any, index: number) => void;
  buttonText: SimpleEditorText;
  removeText: string;
  removeBlogContent: (event: any, index: number) => void;
}

/* eslint-disable react/no-danger, jsx-a11y/control-has-associated-label */
export const EditableBlogContent = (props: MyProps) => {
  const {
    content, onContentChange, buttonText, removeText, removeBlogContent,
  } = props;
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
      <Button
        onClick={event => removeBlogContent(event, content.id)}
        className="article__ender"
      >
        {removeText}
      </Button>
    </>
  );
};
/* eslint-enable react/no-danger, jsx-a11y/control-has-associated-label */
