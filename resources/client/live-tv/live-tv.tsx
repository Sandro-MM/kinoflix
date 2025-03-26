import {LandingPageContent} from '@app/landing-page/landing-page-content';
import {useSettings} from '@ui/settings/use-settings';
import React, {Fragment, useEffect, useState} from 'react';
import {DefaultMetaTags} from '@common/seo/default-meta-tags';
import {Footer} from '@common/ui/footer/footer';
import {MainNavbar} from '@app/main-navbar';
import {SiteVideoPlayer} from '@app/videos/site-video-player';
import {PastDatesList} from '@app/live-tv/calendar-timeline';
import {VideoControls} from '@app/live-tv/video-controls';
import {Button} from '@ui/buttons/button';
import {AddFilterDialog} from '@common/datatable/filters/add-filter-dialog';
import {DialogTrigger} from '@ui/overlays/dialog/dialog-trigger';
import {DialogHeader} from '@ui/overlays/dialog/dialog-header';
import {Trans} from '@ui/i18n/trans';
import {DialogBody} from '@ui/overlays/dialog/dialog-body';
import {Dialog} from '@ui/overlays/dialog/dialog';

interface ContentProps {
  content: LandingPageContent;
}

interface Channel {
  id: string;
  name: {
    en: string;
    ru: string;
  };
  cover: string;
  live: boolean;
  slug: string;
  stream: string;
  archiveDays: number;
  vast: any;
}

interface Program {
  title: {
    _lang: string;
    __text: string;
  };
  _start: string;
  _stop: string;
  _channel: string;
}

export function LiveTv() {
  const [channels, setChannels] = useState<Channel[] | null | []>(null);
  const [programs, setPrograms] = useState<Program[] | null | []>([]);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const settings = useSettings();

  useEffect(() => {
    fetchChannels();
  }, []);

  useEffect(() => {
    fetchPrograms(selectedChannel?.slug);
  }, [selectedChannel]);

  const fetchChannels = async () => {
    try {
      const response = await fetch('https://api.oho.ge/tv/streaming/channels/');
      const data = await response.json();
      setChannels(data);
      setSelectedChannel(data[0]);
      console.log(data);
    } catch (error) {
      console.error('Error fetching channels:', error);
    }
  };
  const fetchPrograms = async (slug: any) => {
    try {
      const response = await fetch(
        `https://api.oho.ge/tv/streaming/programs/${slug}/`,
      );
      const data = await response.json();
      setPrograms(data?.tv.programme);
      console.log(data);
    } catch (error) {
      console.error('Error fetching channels:', error);
    }
  };

  const appearance = settings.homepage?.appearance;

  if (!appearance) {
    return null;
  }



  const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
      let timeout: NodeJS.Timeout;
      const handleResize = () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => setWidth(window.innerWidth), 200);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        clearTimeout(timeout);
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return width;
  };



  const  channelSelect = <ChannelsSelect channels={channels} selectedChannel={selectedChannel} setSelectedChannel={setSelectedChannel} />
  const programSelect =  <ProgramSelect programs={programs} selectedProgram={selectedProgram} setSelectedProgram={setSelectedProgram} />
  const pastDatesList =
    <PastDatesList
    days={selectedChannel?.archiveDays || 0}
    selectedDay={selectedDate}
    setSelectedDay={setSelectedDate}
  />

  return (
    <Fragment>
      <DefaultMetaTags />
      <MainNavbar />

      <div className={'flex pt-60 md:ml-54'}>
        {window.innerWidth >= 1080 && (
          <>
          <div
            className={
              'flex max-h-[calc(100vh-262px)] w-[260px] min-w-[260px] max-w-[260px] flex-col overflow-y-scroll'
            }
          >
            {channelSelect}
          </div>
            <div
              className={
                'flex max-h-[calc(100vh-262px)] !w-[300px] !min-w-[300px] !max-w-[300px] flex-col overflow-y-scroll'
              }
            >
              {programSelect}
            </div>
          </>
        )}

        <div className={'max-h-[calc(100vh-262px)] w-full'}>
          {selectedChannel && (
            <SiteVideoPlayer
              key={selectedChannel?.id} // Force re-render when channel changes
              autoPlay={true}
              video={{
                src: `https:${selectedChannel?.stream}.m3u8`,
                name: '123',
                type: 'stream',

                category: 'full',
                origin: 'local',
                quality: '480',
                approved: true,
                user_id: 1,
                season_num: 1,
                episode_num: 1,
                title_id: 1,
                model_type: 'video',
              }}
              mediaItemId={`123123`}
            />
          )}
        </div>
      </div>

      {window.innerWidth >= 1080 && (
        <div className={'relative'}>
          <VideoControls />
        </div>
      )}

      <div className={'mt-60'}>
        {window.innerWidth >= 1080 && selectedChannel && (
          <>{pastDatesList}</>
        )}
      </div>
      {window.innerWidth <= 1080 && (
        <>
          <DialogTrigger type="popover">
            <Button
              variant={'raised'}
              color={'primary'}
              radius={'rounded-[0px]'}
              className="w-full h-32"
            >Channels</Button>


            <Dialog className="min-w-[300px] !w-full" size="auto">
              <DialogHeader
                className={'w-full items-center justify-center'}
                padding="px-14 py-10"
              >
                <Trans message="Channels" />
              </DialogHeader>
              <DialogBody padding="p-0 flex flex-col items-center justify-center">
                {channelSelect}
              </DialogBody>
            </Dialog>

          </DialogTrigger>



          <DialogTrigger type="popover">
            <Button
              variant={'raised'}
              color={'primary'}
              radius={'rounded-[0px]'}
              className="w-full h-32"
            >Time Line</Button>

            <Dialog className="min-w-[300px] !w-full" size="auto">
              <DialogHeader
                className={'w-full items-center justify-center'}
                padding="px-14 py-10"
              >
                <Trans message="Days" />
              </DialogHeader>
              <DialogBody padding="p-0 flex flex-col items-center justify-center">
                {pastDatesList}
              </DialogBody>
            </Dialog>



          </DialogTrigger>
        </>
      )}
      <div></div>
      <Footer className="landing-container" />
    </Fragment>
  );
}




interface ChannelsSelectProps {
  channels: Channel[] | null;
  selectedChannel: Channel | null;
  setSelectedChannel: (channel: Channel) => void;
}




export const ChannelsSelect: React.FC<ChannelsSelectProps> = ({
  channels,
  selectedChannel,
  setSelectedChannel,
}) => {
  return (
   <>
      {channels &&
        channels.map(channel => (
          <Button
            variant={selectedChannel === channel ? 'raised' : 'outline'}
            color={selectedChannel === channel ? 'primary' : 'chip'}
            radius={'rounded-[0px]'}
            className="block min-h-56 lg:w-[250px] min-w-[250px] lg:max-w-[250px] w-full !justify-start !px-12"
            key={channel?.id}
            onClick={() => setSelectedChannel(channel)}
          >
            <div
              className={
                'flex h-[48px] w-max items-center justify-start gap-10'
              }
            >
              <img
                className={'size-30'}
                src={channel?.cover}
                alt={channel?.name?.en}
              />
              {channel?.name.en}
            </div>
          </Button>
        ))}
    </>
  );
};


interface ProgramSelectProps {
  programs: Program[] | null;
  selectedProgram: Program | null;
  setSelectedProgram: (program: Program) => void;
}




export const ProgramSelect: React.FC<ProgramSelectProps> = ({
                                                               programs,
                                                               selectedProgram,
                                                               setSelectedProgram,
}) => {
  const parseCustomTimestamp = (timestamp: string) => {
    const year = timestamp.substring(0, 4);
    const month = timestamp.substring(4, 6);
    const day = timestamp.substring(6, 8);
    const hours = timestamp.substring(8, 10);
    const minutes = timestamp.substring(10, 12);
    const seconds = timestamp.substring(12, 14);
    const timezone = timestamp.substring(15);

    return `${hours}:${minutes}`;
  };

  return (
    <>
      {programs &&
        programs.map((program, index) => (
          <Button
            variant={'outline'}
            color={selectedProgram === program ? 'primary' : 'chip'}
            radius={'rounded-[0px]'}
            className="m-0 h-max min-h-38 w-[290px] min-w-[290px] max-w-[290px] !justify-start text-wrap !p-12 !text-left"
            key={index}
            onClick={() => setSelectedProgram(program)}
          >
            {parseCustomTimestamp(program?._start)} &nbsp;&nbsp;
            {program?.title?.__text}
          </Button>
        ))}
    </>
  );
};
