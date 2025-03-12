import {Title} from '@app/titles/models/title';
import {Episode} from '@app/titles/models/episode';
import {TitleBackdrop} from '@app/titles/title-poster/title-backdrop';
import {useSettings} from '@ui/settings/use-settings';
import {IconButton} from '@ui/buttons/icon-button';
import {MediaPlayIcon} from '@ui/icons/media/media-play';
import {Link} from 'react-router';
import {getWatchLink} from '@app/videos/watch-page/get-watch-link';
import {Season} from '@app/titles/models/season';

interface Props {
  title: Title;
  season?: Season;
  episode?: Episode;
}
export function TitlePageHeaderImage({title, season, episode}: Props) {
  const {streaming} = useSettings();
  const watchItem = episode || season || title;
  const backdropUrl = episode?.poster || title.backdrop;

  if (!backdropUrl) {
    return null;
  }

  const backdrop = (
    <TitleBackdrop
      title={title}
      episode={episode}
      size="w-full h-full"
      className="object-top"
      lazy={false}
    />
  );
  return (
    <header className="relative isolate max-h-320 overflow-hidden bg-black md:max-h-400 lg:max-h-450">
      <div className="container relative left-0 right-0 top-0 z-20 mx-auto h-full w-full px-24">
        {backdrop}
      </div>
      <div className="h-[calc(100% + 20px)] absolute left-1/2 top-1/2 z-10 w-[calc(100%+100px)] -translate-x-1/2 -translate-y-1/2 bg-black opacity-50 blur-md">
        {backdrop}
      </div>
      <div className="pointer-events-none absolute left-0 top-0 z-30 h-full w-full bg-gradient-to-b from-black/20 md:from-black/40" />
      {streaming?.show_header_play && watchItem?.primary_video ? (
        <PlayButton item={watchItem} />
      ) : null}
    </header>
  );
}

interface PlayButtonProps {
  item: Season | Episode | Title;
}
function PlayButton({item}: PlayButtonProps) {
  const link = getWatchLink(item.primary_video!);
  return (
    <IconButton
      radius="rounded-full"
      color="white"
      variant="raised"
      size="lg"
      className="absolute inset-0 z-40 m-auto"
      elementType={Link}
      to={link}
    >
      <MediaPlayIcon />
    </IconButton>
  );
}
