import React from 'react';
import {EpisodeEditorLayout} from '@app/admin/titles/title-editor/episode-editor/episode-editor-layout';
import {useTitleCredits} from '@app/admin/titles/requests/use-title-credits';
import {TitleCreditsTableHeader} from '@app/admin/titles/title-editor/credits-editor/title-credits-table-header';
import {CrewEditorTable} from '@app/admin/titles/title-editor/credits-editor/crew-editor-table';

export function EpisodeCrewEditor() {
  const query = useTitleCredits({
    crewOnly: 'true',
  });

  return (
    <EpisodeEditorLayout>
      <TitleCreditsTableHeader query={query} isCrew />
      <CrewEditorTable query={query} />
    </EpisodeEditorLayout>
  );
}
