import {useTitleCredits} from '@app/admin/titles/requests/use-title-credits';
import {SeasonEditorLayout} from '@app/admin/titles/title-editor/seasons-editor/season-editor-layout';
import {TitleCreditsTableHeader} from '@app/admin/titles/title-editor/credits-editor/title-credits-table-header';
import {CrewEditorTable} from '@app/admin/titles/title-editor/credits-editor/crew-editor-table';

export function SeasonCrewEditor() {
  const query = useTitleCredits({
    crewOnly: 'true',
  });
  return (
    <SeasonEditorLayout>
      <TitleCreditsTableHeader query={query} isCrew />
      <CrewEditorTable query={query} />
    </SeasonEditorLayout>
  );
}
