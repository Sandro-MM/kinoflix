import {TitleEditorLayout} from '@app/admin/titles/title-editor/title-editor-layout';
import {useTitleCredits} from '@app/admin/titles/requests/use-title-credits';
import {CrewEditorTable} from '@app/admin/titles/title-editor/credits-editor/crew-editor-table';
import {TitleCreditsTableHeader} from '@app/admin/titles/title-editor/credits-editor/title-credits-table-header';

export function TitleCrewEditor() {
  const query = useTitleCredits({
    crewOnly: 'true',
  });
  return (
    <TitleEditorLayout>
      <TitleCreditsTableHeader query={query} isCrew />
      <CrewEditorTable query={query} />
    </TitleEditorLayout>
  );
}
