import {CastEditorTable} from '@app/admin/titles/title-editor/credits-editor/cast-editor-table';
import {TitleEditorLayout} from '@app/admin/titles/title-editor/title-editor-layout';
import {useTitleCredits} from '@app/admin/titles/requests/use-title-credits';
import {TitleCreditsTableHeader} from '@app/admin/titles/title-editor/credits-editor/title-credits-table-header';

export function TitleCastEditor() {
  const query = useTitleCredits({
    department: 'actors',
  });

  return (
    <TitleEditorLayout>
      <TitleCreditsTableHeader query={query} isCrew={false} />
      <CastEditorTable query={query} />
    </TitleEditorLayout>
  );
}
