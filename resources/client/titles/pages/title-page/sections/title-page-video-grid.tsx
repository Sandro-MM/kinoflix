import {Title} from '@app/titles/models/title';
import {Episode} from '@app/titles/models/episode';
import {getEpisodeLink} from '@app/episodes/episode-link';
import {getTitleLink} from '@app/titles/title-link';
import {VideoGrid} from '@app/titles/video-grid';
import {SiteSectionHeading} from '@app/titles/site-section-heading';
import {Trans} from '@ui/i18n/trans';

interface Props {
  title: Title;
  episode?: Episode;
}
export function TitlePageVideoGrid({title, episode}: Props) {
  const videos = episode ? episode.videos : title.videos;
  const link = episode
    ? `${getEpisodeLink(
        title,
        episode.season_number,
        episode.episode_number,
      )}/videos`
    : `${getTitleLink(title)}/videos`;
  return (
    <VideoGrid
      videos={videos}
      title={title}
      episode={episode}
      heading={
        <SiteSectionHeading link={link}>
          <Trans message="Videos" />
        </SiteSectionHeading>
      }
    />
  );
}
