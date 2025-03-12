import {CastEditorTable} from '@app/admin/titles/title-editor/credits-editor/cast-editor-table';
import {useTitleCredits} from '@app/admin/titles/requests/use-title-credits';
import {SeasonEditorLayout} from '@app/admin/titles/title-editor/seasons-editor/season-editor-layout';
import {TitleCreditsTableHeader} from '@app/admin/titles/title-editor/credits-editor/title-credits-table-header';

export function SeasonCastEditor() {
  const query = useTitleCredits({
    department: 'actors',
  });
  return (
    <SeasonEditorLayout>
      <TitleCreditsTableHeader query={query} isCrew={false} />
      <CastEditorTable query={query} />
    </SeasonEditorLayout>
  );
}
