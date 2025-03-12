import {useOutletContext} from 'react-router';
import {Title} from '@app/titles/models/title';
import {TitleEditorLayout} from '@app/admin/titles/title-editor/title-editor-layout';
import {CommentsDatatablePage} from '@common/comments/comments-datatable-page/comments-datatable-page';

export function TitleCommentsEditor() {
  const title = useOutletContext<Title>();
  return (
    <TitleEditorLayout>
      <CommentsDatatablePage hideTitle commentable={title} />
    </TitleEditorLayout>
  );
}
