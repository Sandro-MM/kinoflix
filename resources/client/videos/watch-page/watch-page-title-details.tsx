import {useWatchPageVideo} from '@app/videos/requests/use-watch-page-video';
import {TitlePoster} from '@app/titles/title-poster/title-poster';
import {TitleLink} from '@app/titles/title-link';
import React, {Fragment, ReactNode, useState} from 'react';
import {Skeleton} from '@ui/skeleton/skeleton';
import {AnimatePresence, m} from 'framer-motion';
import {opacityAnimation} from '@ui/animation/opacity-animation';
import {ThumbButtons} from '@common/votes/thumb-buttons';
import {IconButton} from '@ui/buttons/icon-button';
import {ShareIcon} from '@ui/icons/material/Share';
import {FlagIcon} from '@ui/icons/material/Flag';
import {Tooltip} from '@ui/tooltip/tooltip';
import {Trans} from '@ui/i18n/trans';
import {useSubmitReport} from '@common/reports/requests/use-submit-report';
import {useDeleteReport} from '@common/reports/requests/use-delete-report';
import {Video} from '@app/titles/models/video';
import {useIsStreamingMode} from '@app/videos/use-is-streaming-mode';
import {EpisodeLink} from '@app/episodes/episode-link';
import {CompactSeasonEpisode} from '@app/episodes/compact-season-episode';
import {ShareMenuTrigger} from '@app/sharing/share-menu-trigger';
import {getWatchLink} from '@app/videos/watch-page/get-watch-link';

export function WatchPageTitleDetails() {
  const {data} = useWatchPageVideo();
  const isStreamingMode = useIsStreamingMode();

  const content = !data ? (
    <Layout
      key="skeleton"
      poster={<Skeleton variant="rect" size="w-132 aspect-poster" />}
      titleLink={<Skeleton className="max-w-144" />}
      videoName={<Skeleton className="max-w-240" />}
      description={
        <Fragment>
          <Skeleton />
          <Skeleton />
        </Fragment>
      }
      rate={
        <div className="flex h-32 items-center gap-2">
          <Skeleton variant="rect" size="w-56 h-24" className="mr-10" />
          <Skeleton variant="rect" size="w-56 h-24" />
        </div>
      }
    />
  ) : (
    <Layout
      key="loaded"
      poster={
        <TitlePoster
          size="w-132"
          srcSize="md"
          title={data.title}
          showPlayButton
          className="max-md:hidden"
        />
      }
      titleLink={<TitleLink title={data.title} />}
      videoName={!isStreamingMode ? data.video.name : undefined}
      episodeName={
        data.episode ? (
          <EpisodeLink title={data.title} episode={data.episode}>
            {data.episode.name} (<CompactSeasonEpisode episode={data.episode} />
            )
          </EpisodeLink>
        ) : undefined
      }
      description={data.episode?.description || data.title.description}
      rate={
        <div className="flex items-center gap-2">
          <ThumbButtons model={data.video} className="mr-auto" />
          <ReportButton video={data.video} />
          <ShareButton video={data.video} />
        </div>
      }
    />
  );

  return (
    <AnimatePresence initial={false} mode="wait">
      {content}
    </AnimatePresence>
  );
}

interface ShareButtonProps {
  video: Video;
}
function ShareButton({video}: ShareButtonProps) {
  const link = getWatchLink(video, {absolute: true});
  return (
    <ShareMenuTrigger link={link}>
      <Tooltip label={<Trans message="Share" />}>
        <IconButton>
          <ShareIcon />
        </IconButton>
      </Tooltip>
    </ShareMenuTrigger>
  );
}

interface ReportButtonProps {
  video: Video;
}
function ReportButton({video}: ReportButtonProps) {
  const report = useSubmitReport(video);
  const deleteReport = useDeleteReport(video);
  const [isReported, setIsReported] = useState(video.current_user_reported);

  return (
    <Tooltip label={<Trans message="Report" />}>
      <IconButton
        onClick={() => {
          if (isReported) {
            deleteReport.mutate();
          } else {
            report.mutate({});
          }
          setIsReported(!isReported);
        }}
      >
        <FlagIcon />
      </IconButton>
    </Tooltip>
  );
}

interface LayoutProps {
  poster?: ReactNode;
  titleLink: ReactNode;
  videoName: ReactNode;
  episodeName?: ReactNode;
  description: ReactNode;
  rate?: ReactNode;
}
function Layout({
  poster,
  titleLink,
  videoName,
  episodeName,
  description,
  rate,
}: LayoutProps) {
  return (
    <m.div
      className="flex items-start gap-16 overflow-hidden rounded pr-6"
      {...opacityAnimation}
    >
      {poster}
      <div className="flex-auto py-6">
        <h1 className="mb-6 text-2xl font-medium">{titleLink}</h1>
        {episodeName && (
          <div className="text-base font-medium">{episodeName}</div>
        )}
        {videoName && <div className="text-base font-medium">{videoName}</div>}
        <div className="my-12">{rate}</div>
        {description && (
          <p className="max-w-780 text-sm text-muted">{description}</p>
        )}
      </div>
    </m.div>
  );
}
