import React from 'react';
import {EpisodeEditorLayout} from '@app/admin/titles/title-editor/episode-editor/episode-editor-layout';
import {CastEditorTable} from '@app/admin/titles/title-editor/credits-editor/cast-editor-table';
import {useTitleCredits} from '@app/admin/titles/requests/use-title-credits';
import {TitleCreditsTableHeader} from '@app/admin/titles/title-editor/credits-editor/title-credits-table-header';

export function EpisodeCastEditor() {
  const query = useTitleCredits({
    department: 'actors',
  });

  return (
    <EpisodeEditorLayout>
      <TitleCreditsTableHeader query={query} isCrew={false} />
      <CastEditorTable query={query} />
    </EpisodeEditorLayout>
  );
}
