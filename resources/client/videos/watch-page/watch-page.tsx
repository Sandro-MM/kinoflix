import React, {Fragment, useState} from 'react';
import {MainNavbar} from '@app/main-navbar';
import {useDarkThemeVariables} from '@ui/themes/use-dark-theme-variables';
import {
  useWatchPageVideo,
  UseWatchPageVideoResponse,
} from '@app/videos/requests/use-watch-page-video';
import {Footer} from '@common/ui/footer/footer';
import {PageErrorMessage} from '@common/errors/page-error-message';
import {CommentList} from '@common/comments/comment-list/comment-list';
import {NewCommentForm} from '@common/comments/new-comment-form';
import {WatchPageTitleDetails} from '@app/videos/watch-page/watch-page-title-details';
import {WatchPageAside} from '@app/videos/watch-page/watch-page-aside';
import {AnimatePresence, m} from 'framer-motion';
import {opacityAnimation} from '@ui/animation/opacity-animation';
import {useScrollToTop} from '@common/ui/navigation/use-scroll-to-top';
import {VideoPlayerSkeleton} from '@app/videos/video-player-skeleton';
import {SiteVideoPlayer} from '@app/videos/site-video-player';
import {useSettings} from '@ui/settings/use-settings';
import {useAuth} from '@common/auth/use-auth';
import {useIsStreamingMode} from '@app/videos/use-is-streaming-mode';
import {WatchPageAlternativeVideos} from '@app/videos/watch-page/watch-page-alternative-videos';
import {AdHost} from '@common/admin/ads/ad-host';
import {Episode} from '@app/titles/models/episode';
import {Title} from '@app/titles/models/title';
import {Video} from '@app/titles/models/video';
import {PageMetaTags} from '@common/http/page-meta-tags';
import {useLayoutEffect} from '@react-aria/utils';
import {VideoThumbnail} from '@app/videos/video-thumbnail';
import {Trans} from '@ui/i18n/trans';
import {Button} from '@ui/buttons/button';
import {Link} from 'react-router';

export function WatchPage() {
  const darkThemeVars = useDarkThemeVariables();
  useScrollToTop();

  return (
    <Fragment>
      <MainNavbar />
      <div style={darkThemeVars} className="dark min-h-screen bg text">
        <div className="container mx-auto p-14 md:p-24">
          <Content />
          <Footer className="mt-48" />
        </div>
      </div>
    </Fragment>
  );
}

function Content() {
  const {titles, comments} = useSettings();
  const {isLoggedIn, hasPermission} = useAuth();
  const query = useWatchPageVideo();
  const {data, isLoading} = query;
  const title = data?.title;
  const episode = data?.episode;
  const video = data?.video;
  let commentable: Episode | Title | Video | undefined = video;

  if (!comments?.per_video) {
    commentable = episode || title;
  }

  const shouldShowComments =
    title && video && titles.enable_comments && hasPermission('comments.view');

  if (data || isLoading) {
    return (
      <Fragment key={video?.id || 'loading'}>
        <PageMetaTags query={query} />
        <VideoWrapper data={data} />
        <WatchPageAlternativeVideos data={data} />
        <AdHost slot="watch_top" className="pt-48" />
        <section className="mt-42 items-start gap-56 lg:flex">
          <div className="flex-auto">
            <WatchPageTitleDetails />
            {shouldShowComments && (
              <CommentList
                commentable={commentable!}
                className="mt-44"
                perPage={20}
              >
                {isLoggedIn && hasPermission('comments.create') && (
                  <NewCommentForm
                    commentable={commentable!}
                    className="mb-14 mt-24"
                  />
                )}
              </CommentList>
            )}
          </div>
          <WatchPageAside />
        </section>
      </Fragment>
    );
  }

  return <PageErrorMessage />;
}

interface VideoWrapperProps {
  data?: UseWatchPageVideoResponse;
}
function VideoWrapper({data}: VideoWrapperProps) {
  const isStreamingMode = useIsStreamingMode();
  const {hasPermission} = useAuth();

  const [isVisible, setIsVisible] = useState(false);
  useLayoutEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <AnimatePresence initial={false} mode="wait">
      {data?.video && isVisible ? (
        <m.div key="player" {...opacityAnimation}>
          {hasPermission('videos.play') ? (
            <SiteVideoPlayer
              title={data.title}
              episode={data.episode}
              video={data.video}
              relatedVideos={data.related_videos}
              autoPlay
              logPlays
              showEpisodeSelector={isStreamingMode}
            />
          ) : (
            <UpgradeMessage video={data.video} />
          )}
        </m.div>
      ) : (
        <m.div className="relative" key="skeleton" {...opacityAnimation}>
          <VideoPlayerSkeleton animate />
        </m.div>
      )}
    </AnimatePresence>
  );
}

interface UpgradeMessageProps {
  video: Video;
}
function UpgradeMessage({video}: UpgradeMessageProps) {
  return (
    <div className="relative flex aspect-video items-center justify-center bg-alt">
      <div className="blur">
        <VideoThumbnail video={video} />
      </div>
      <div className="absolute h-max w-max max-w-full rounded-lg bg-black/60 p-24 text-lg font-medium">
        <div>
          <Trans message="Your current plan does not allow watching videos. Upgrade to unlock this feature." />
        </div>
        <div className="mt-14 text-center">
          <Button
            variant="flat"
            color="primary"
            elementType={Link}
            to="/pricing"
          >
            <Trans message="Upgrade" />
          </Button>
        </div>
      </div>
    </div>
  );
}
