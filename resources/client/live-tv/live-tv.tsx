import {useSettings} from '@ui/settings/use-settings';
import React, {Fragment, useEffect, useState} from 'react';
import {DefaultMetaTags} from '@common/seo/default-meta-tags';
import {Footer} from '@common/ui/footer/footer';
import {MainNavbar} from '@app/main-navbar';
import {SiteVideoPlayer} from '@app/videos/site-video-player';
import {PastDatesList} from '@app/live-tv/calendar-timeline';
import {VideoControls} from '@app/live-tv/video-controls';
import {Button} from '@ui/buttons/button';
import {DialogTrigger} from '@ui/overlays/dialog/dialog-trigger';
import {DialogHeader} from '@ui/overlays/dialog/dialog-header';
import {Trans} from '@ui/i18n/trans';
import {DialogBody} from '@ui/overlays/dialog/dialog-body';
import {Dialog} from '@ui/overlays/dialog/dialog';
import {useWindowWidth} from '@app/live-tv/width-listener';
import {TimelineItem} from '@app/live-tv/timeline-item';
import {useNavigate, useParams} from 'react-router';
import {useDialogContext} from '@ui/overlays/dialog/dialog-context';
import {ParseCustomTimestamp} from '@app/live-tv/live-tv-time converter';
import {Tooltip} from '@ui/tooltip/tooltip';

import {
  ChipFieldFilterPanel
} from '@common/datatable/filters/panels/chip-field-filter-panel';
import {FormProvider, useForm} from 'react-hook-form';
import {
  CreateNewsArticlePayload
} from '@app/admin/news/requests/use-create-news-article';
import {
  InputFilterPanel
} from '@common/datatable/filters/panels/input-filter-panel';
import {PastDatesListDesktop} from '@app/live-tv/calendar-timeline-desktop';
import {BackendFilter,FilterTextInputControl,FilterChipFieldControl} from '@common/datatable/filters/backend-filter';
import {usePlayerActions} from '@common/player/hooks/use-player-actions';

export interface Channel {
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
  vast: {
    enabled: boolean;
    place: string;
    url: string;
  };
}

interface Program {
  title: {
    lang: string;
    text: string;
  };
  start: string;
  stop: string;
  channel: string;
}



export function LiveTv() {
  const {routeChannelId, routeDate} = useParams();
  const [channels, setChannels] = useState<Channel[] | null>(null);
  const [programs, setPrograms] = useState<Program[] | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const width = useWindowWidth();
  const settings = useSettings();
  const navigate = useNavigate();

  const form = useForm<CreateNewsArticlePayload>({

  });





  useEffect(() => {
    fetchChannels(setChannels, setSelectedChannel, routeChannelId);
    if (routeDate) {
      setSelectedDate(routeDate);
    } else {
      const today = new Date().toISOString().split('T')[0];
      setSelectedDate(today);
      navigate(`/live-tv/${routeChannelId}/${today}`);
    }
  }, [ ]);

  useEffect(() => {
    setPrograms(null)
    fetchPrograms(selectedChannel?.id, selectedDate!);
    if (selectedChannel) {
      console.log(selectedChannel.stream, 'selectedChannel.stream');
      setSelectedVideo(selectedChannel.stream);
    }
  }, [selectedChannel, selectedDate]);

  useEffect(() => {
    if (selectedChannel){
      setSelectedVideo(
        `https://api.oho.ge/tv/streaming/dvr/?start=${selectedTime}&end=${null}&id=${selectedChannel.id}.m3u8`,
      );
      navigate(`/live-tv/${routeChannelId}/${routeDate}/${selectedTime}`);
    }
  }, [selectedTime]);

  const fetchChannels = async (
    setChannels: (channels: Channel[]) => void,
    setSelectedChannel: (channel: Channel) => void,
    routeChannelId: string | undefined,
  ) => {
    try {
      const response = await fetch('https://api.oho.ge/tv/streaming/channels/');
      const data = await response.json();
      setChannels(data);
      // Find channel by slug or select first channel if slug is not found
      const selected =
        data.find((ch: Channel) => ch.id === routeChannelId) || data[0];
      setSelectedChannel(selected);
      console.log(selected.stream, 'selected.channel.stream');
    } catch (error) {
      console.error('Error fetching channels:', error);
    }
  };

  const fetchPrograms = async (slug: any, date: string) => {
    try {
      const response = await fetch(
        `https://api.oho.ge/tv/streaming/programs/?channel_id=${slug}&date=${date}`,
      );
      const data = await response.json();
      setPrograms(data?.tv.programs);
      console.log(data);
    } catch (error) {
      console.error('Error fetching channels:', error);
    }
  };

  const appearance = settings.homepage?.appearance;

  if (!appearance) {
    return null;
  }

  const setChannelToStateAndQuery = (channel: Channel) => {
    setSelectedChannel(channel);
    setSelectedVideo(channel.stream);
    navigate(`/live-tv/${channel.id}/${routeDate}/${selectedTime?.toString()}`);
  };

  const changeDate = (selectedDate: string) => {
    setSelectedDate(selectedDate);
    navigate(`/live-tv/${routeChannelId}/${selectedDate}/${selectedTime?.toString()}`);
  };

  const setProgram = (program: Program) => {
    setSelectedProgram(program);
    setSelectedVideo(
      `https://api.oho.ge/tv/streaming/dvr/?start=${program.start}&end=${program.stop}&id=${program.channel}.m3u8`,
    );
    navigate(`/live-tv/${routeChannelId}/${routeDate}/${program.start}`);
  };





  const channelSelect = (
    <ChannelsSelect
      channels={channels}
      selectedChannel={selectedChannel}
      setSelectedChannel={setChannelToStateAndQuery}
    />
  );
  const channelSelectDesktop = (
    <ChannelsSelectDesktop
      channels={channels}
      selectedChannel={selectedChannel}
      setSelectedChannel={setChannelToStateAndQuery}
    />
  );
  const programSelect = (
    <ProgramSelect
      programs={programs}
      selectedProgram={selectedProgram}
      setSelectedProgram={setProgram}
    />
  );
  const pastDatesList = (
    <PastDatesList
      days={selectedChannel?.archiveDays || 0}
      selectedDay={selectedDate}
      setSelectedDay={changeDate}
    />
  );

  const DesktopSelectMenu = width >= 1024 && (
    <FormProvider {...form}>
      <div>
          <ChipFieldFilterPanel
            filter={
              {
                control: {
                  type: "chipField",
                  placeholder: {
                    message: "Pick Genres"
                  },
                  defaultValue: [],
                  options: [
                    {
                      label: {
                        "message": "United States of America"
                      },
                      key: 1,
                      value: 1
                    },
                    {
                      label: {
                        "message": "United Kingdom"
                      },
                      key: 2,
                      value: 2
                    },
                  ]
                },
                key: "productionCountries",
                label: {
                  message: "Production countries"
                },
                defaultOperator: "hasAll"
              } as BackendFilter<FilterChipFieldControl>}
          />


      <div
        className={
          'flex max-h-[calc(100vh-294px)] w-[260px] min-w-[260px] max-w-[260px] flex-col overflow-y-scroll overflow-x-hidden'
        }
      >
        {channelSelectDesktop}
      </div>
      </div>
      <div>
        <InputFilterPanel
          filter={{
            control: {
              type: "input",
              inputType: "string",
            },
            key: "program",
            label: {
              message: "Program"
            },
          } as BackendFilter<FilterTextInputControl>}
        />
        <div
          className={
            'flex max-h-[calc(100vh-294px)] !w-[300px] !min-w-[300px] !max-w-[300px] flex-col overflow-y-scroll overflow-x-hidden'
          }
        >
          {programSelect}
        </div>
      </div>

    </FormProvider>
  );

  const videoPlayer = (
    <>
      {selectedVideo && (
        <VideoPlayerLiveTV
          setSelectedVideo={setSelectedVideo}
          vastUrl={selectedChannel?.vast.url}
          keyItem={selectedVideo}
          streamink={selectedChannel?.stream}
          stream={selectedVideo || ''}
        />
      )}
    </>
  );

  const mobileSelectMenu = (
    <>
      <DialogTriggerItem
        selectedDate={
          <div
            className={'flex h-[48px] w-max items-center justify-start gap-10'}
          >
            <img
              className={'max-h-26 w-auto'}
              src={selectedChannel?.cover}
              alt={selectedChannel?.name?.en}
            />
            {selectedChannel?.name.en}
          </div>
        }
        message={'Channels'}
      >
        {channelSelect}
      </DialogTriggerItem>
      <DialogTriggerItem selectedDate={selectedDate} message={'Days'}>
        {pastDatesList}
      </DialogTriggerItem>
      <div
        className={
          'flex h-[500px] w-full !min-w-[300px] flex-col overflow-y-scroll'
        }
      >
        {programSelect}
      </div>
    </>
  );

  if (selectedVideo) return (
    <Fragment>
      <DefaultMetaTags />
      <MainNavbar />
      <div className={'px-8'}>
      <div className={'overflow-x-hidden'}>
      <div className={'flex pt-[82px] md:ml-46'}>
        {DesktopSelectMenu}
        <div className={'max-h-[calc(100vh-256px)] w-full'}>
          {selectedChannel && videoPlayer}
        </div>
      </div>
      {width >= 1024 && (
        <div className={'relative'}>

        </div>
      )}
      <div className={'ml-48 mt-60'}>
        {width >= 1024 && selectedChannel && (
          <>
            <TimelineItem
              selectedChannel={selectedChannel}
              selectedDate={selectedDate}
              programs={programs}
              selectedProgram={selectedProgram}
              setSelectedProgram={setProgram}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
            <PastDatesListDesktop  days={selectedChannel?.archiveDays || 0}
                                   selectedDay={selectedDate}
                                   setSelectedDay={changeDate}/>
          </>
        )}
      </div>
      </div>

      </div>
      {width <= 1024 && mobileSelectMenu}
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
  const dialogContext = useDialogContext();




  return (
    <>
      {channels &&
        channels.map(channel => (
          <Button
            variant={selectedChannel === channel ? 'raised' : 'outline'}
            color={selectedChannel === channel ? 'primary' : 'chip'}
            radius={'rounded-[0px]'}
            className="block min-h-56 w-full min-w-[250px] !justify-start !px-12 lg:w-[250px] lg:max-w-[250px]"
            key={channel?.id}
            onClick={() => {
              setSelectedChannel(channel);
              if (dialogContext?.close) {
                dialogContext.close();
              }
            }}
          >
            <div
              className={
                'flex h-[48px] w-max items-center justify-start gap-10'
              }
            >
              <img
                className={'max-h-26 w-auto'}
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

export const ChannelsSelectDesktop: React.FC<ChannelsSelectProps> = ({
  channels,
  selectedChannel,
  setSelectedChannel,
}) => {



  return (
    <>
      {channels &&
        channels.map(channel => (
          <Tooltip
            placement={'right'}
            key={channel?.id}
            label={
              <div>
                <VideoPlayerLiveTV
                  keyItem={channel?.id}
                  stream={`${channel?.stream}?quality=low`}
                  enableControls={false}
                />
              </div>
            }
          >
            <Button
              variant={selectedChannel === channel ? 'raised' : 'outline'}
              color={selectedChannel === channel ? 'primary' : 'chip'}
              radius={'rounded-[0px]'}
              className="block min-h-56 w-full min-w-[250px] !justify-start !px-12 lg:w-[250px] lg:max-w-[250px]"
              onClick={() => setSelectedChannel(channel)}
            >
              <div
                className={
                  'flex h-[48px] w-max items-center justify-start gap-10'
                }
              >
                <img
                  className={'max-h-26 w-auto'}
                  src={channel?.cover}
                  alt={channel?.name?.en}
                />
                {channel?.name.en}
              </div>
            </Button>
          </Tooltip>
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
  return (
    <>
      {programs &&
        programs.map((program, index) => (
          <Button
            variant={selectedProgram === program ? 'raised' : 'outline'}
            color={selectedProgram === program ? 'primary' : 'chip'}
            radius={'rounded-[0px]'}
            className="m-0 h-max min-h-38 w-full min-w-[290px] !justify-start text-wrap !p-12 !text-left lg:w-[290px] lg:max-w-[290px]"
            key={index}
            onClick={() => setSelectedProgram(program)}
          >
            {ParseCustomTimestamp(program?.start)} &nbsp;&nbsp;
            {program?.title?.text}
          </Button>
        ))}
    </>
  );
};

const DialogTriggerItem = ({
  children,
  selectedDate,
  message,
}: {
  children: React.ReactNode;
  selectedDate: string | null | React.ReactNode;
  message: string;
}) => (
  <DialogTrigger type="popover">
    <Button
      variant="raised"
      color="primary"
      radius="rounded-[0px]"
      className="h-32 w-full"
    >
      <div className="text-xl">{selectedDate}</div>
    </Button>
    <Dialog className="!w-full min-w-[300px]" size="auto">
      <DialogHeader
        className="w-full items-center justify-center"
        padding="px-14 py-10"
      >
        <Trans message={message} />
      </DialogHeader>
      <DialogBody padding="p-0 flex flex-col items-center justify-center">
        {children}
      </DialogBody>
    </Dialog>
  </DialogTrigger>
);

export const VideoPlayerLiveTV = ({keyItem,
  stream,
  enableControls,
  vastUrl,
  setSelectedVideo,
  streamink
}: {
  keyItem: string;
  stream: string;
  enableControls?: boolean;
  vastUrl?: string;
  setSelectedVideo?: (video: string) => void;
  streamink?: string;
}) => {


  return (
    <SiteVideoPlayer
      setSelectedVideo={setSelectedVideo}
      streamink={streamink}
      isLiveTvControls={true}
      enableControls={enableControls}
      key={keyItem}
      vastUrl={vastUrl}
      autoPlay={false}
      video={{
        src: stream,
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
        id: 1,
        upvotes: 1,
        downvotes: 1,
        score: 1,
      }}
      mediaItemId={`123123`}
    />

)};
