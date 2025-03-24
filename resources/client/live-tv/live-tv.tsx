import {LandingPageContent} from '@app/landing-page/landing-page-content';
import {useSettings} from '@ui/settings/use-settings';
import React, {Fragment, useEffect, useState} from 'react';
import {DefaultMetaTags} from '@common/seo/default-meta-tags';

import {Footer} from '@common/ui/footer/footer';
import {MainNavbar} from '@app/main-navbar';
import {SiteVideoPlayer} from '@app/videos/site-video-player';
import {FormattedDate} from '@ui/i18n/formatted-date';

interface ContentProps {
  content: LandingPageContent;
}

const channelMocData = [
  {
    name: 'IMEDI',
    pic: 'https://picsum.photos/30/30',
    id: 1,
  },
];

const mockProgram = [
  {
    time: '15:00',
    id: 1,
    name: 'kurieri',
  },
];


export function LiveTv() {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [channels, setChannels] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);


  const parseCustomTimestamp = (timestamp) => {
    const year = timestamp.substring(0, 4);
    const month = timestamp.substring(4, 6);
    const day = timestamp.substring(6, 8);
    const hours = timestamp.substring(8, 10);
    const minutes = timestamp.substring(10, 12);
    const seconds = timestamp.substring(12, 14);
    const timezone = timestamp.substring(15); // Extract timezone offset

    return `${hours}:${minutes}`;
  };

  const settings = useSettings();


  useEffect(() => {
    fetchChannels();
  }, []);

  useEffect(() => {
    fetchPrograms(selectedChannel?.slug)
  }, [selectedChannel]);



  const fetchChannels = async () => {
    try {
      const response = await fetch("https://api.oho.ge/tv/streaming/channels/");
      const data = await response.json();
      setChannels(data);
      setSelectedChannel(data[0])
      console.log(data)
    } catch (error) {
      console.error("Error fetching channels:", error);
    }
  };
  const fetchPrograms = async (slug:any) => {
    try {
      const response = await fetch(`https://api.oho.ge/tv/streaming/programs/${slug}/`);
      const data = await response.json();
      setPrograms(data?.tv.programme);
      console.log(data)
    } catch (error) {
      console.error("Error fetching channels:", error);
    }
  };




  const appearance = settings.homepage?.appearance;

  if (!appearance) {
    return null;
  }
  return (
    <Fragment >
      <DefaultMetaTags />
      <MainNavbar />

      <div className={'ml-54 flex pt-60'}>
        <div className={'max-h-[calc(100vh-62px)] w-max overflow-y-scroll'}>
          {channels && channels.map(channel => (
            <div
              onClick={() => setSelectedChannel(channel)}
              className={
                'solid gray flex h-[48px] w-[205px] cursor-pointer items-center gap-10 border-1 p-8'
              }
              key={channel?.id}
            >
              <img className={'size-30'} src={channel?.cover} alt={channel?.name?.en} />
              {channel?.name.en}
            </div>
          ))}
        </div>
        <div className={'max-h-[calc(100vh-62px)] w-[300px] overflow-y-scroll'}>
          {programs && programs.map((program, index) => (
            <div
              className={
                'solid gray h-max  cursor-pointer border-1 p-8 text-[12px]'
              }
              key={index}
            >
              {parseCustomTimestamp(program?._start)}
              {" "}&nbsp;&nbsp;
              {program?.title?.__text}

            </div>
          ))}
        </div>

        <div>
          {
            selectedChannel && (
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
                  model_type: 'video'
                }}
                mediaItemId={`123123`}
              />
            )
          }




          <div
            className={'mt-12 flex w-full items-center justify-center gap-5'}
          >
            <div
              className={
                'flex h-34 w-86 cursor-pointer items-center justify-center gap-5 bg-[#FBFBFB] p-8 text-[13px] text-[#555555]'
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="11"
                className="svg-icon--cut svg-icon"
              >
                <path d="M4.2213 3.138c.122-.2708.195-.5715.195-.8883 0-1.197-.9695-2.1667-2.1666-2.1667C1.0527.083.083 1.0526.083 2.2497c0 1.197.9696 2.1666 2.1667 2.1666.3168 0 .6175-.073.8883-.195l1.2783 1.2784L3.138 6.778c-.2708-.122-.5715-.195-.8883-.195-1.197 0-2.1667.9696-2.1667 2.1667 0 1.197.9696 2.1666 2.1667 2.1666 1.197 0 2.1666-.9696 2.1666-2.1666 0-.317-.073-.6175-.195-.8884L5.4997 6.583l3.7916 3.7917h1.625V9.833l-6.695-6.695zm-1.9716.195c-.5986 0-1.0834-.4848-1.0834-1.0833 0-.5986.4848-1.0834 1.0834-1.0834.5985 0 1.0833.4848 1.0833 1.0834 0 .5985-.4848 1.0833-1.0833 1.0833zm0 6.5c-.5986 0-1.0834-.4848-1.0834-1.0833 0-.5986.4848-1.0834 1.0834-1.0834.5985 0 1.0833.4848 1.0833 1.0834 0 .5985-.4848 1.0833-1.0833 1.0833zm3.25-4.0625c-.149 0-.271-.122-.271-.2708 0-.149.122-.271.271-.271.149 0 .2708.122.2708.271 0 .149-.122.2708-.2708.2708zM9.2913.6247l-3.25 3.25L7.1247 4.958l3.7916-3.7917V.6247h-1.625z"></path>
              </svg>
              cut
            </div>

            <div className="flex items-center justify-end gap-5">
              <input
                type="text"
                maxLength="2"
                className="flex h-34 w-34 cursor-pointer items-center justify-center gap-5 bg-[#FBFBFB] p-8 text-[13px] text-[#555555]"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
              <div>:</div>
              <input
                type="text"
                maxLength="2"
                className="flex h-34 w-34 cursor-pointer items-center justify-center gap-5 bg-[#FBFBFB] p-8 text-[13px] text-[#555555]"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
              />
              <div className="rtv-seek-inputs-seperator"></div>

              <button type="button" className="flex h-34 w-34 cursor-pointer items-center justify-center gap-5 bg-[#FBFBFB] p-8 text-[13px] text-[#555555]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="9"
                  height="9"
                  className="svg-icon--enter svg-icon"
                >
                  <path d="M5.2 1.2l-1 1.2L6.6 5 4 8l1.3 1L9 5 5.2 1.3zM0 0h1.7v6H0V0z"></path>
                  <path d="M7 4.2V6H0V4.2h7z"></path>
                </svg>
              </button>

              <div className="rtv-seek-inputs-seperator"></div>
              <div className="rtv-seek-inputs-seperator"></div>
            </div>




            <div
              className={
                'flex h-34 w-86 cursor-pointer items-center justify-center gap-5 bg-[#FBFBFB] p-8 text-[13px] text-[#555555]'
              }
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="10">
                <path d="M13 10V0L6 5l7 5z"></path>
                <path d="M7 10V0L0 5l7 5z"></path>
              </svg>
              - 5 min
            </div>
            <div
              className={
                'flex h-34 w-86 cursor-pointer items-center justify-center gap-5 bg-[#FBFBFB] p-8 text-[13px] text-[#555555]'
              }
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="10">
                <path d="M13 10V0L6 5l7 5z"></path>
                <path d="M7 10V0L0 5l7 5z"></path>
              </svg>
              - 1 min
            </div>
            <div
              className={
                'flex h-34 w-86 cursor-pointer items-center justify-center gap-5 bg-[#FBFBFB] p-8 text-[13px] text-[#555555]'
              }
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="10">
                <path d="M13 10V0L6 5l7 5z"></path>
                <path d="M7 10V0L0 5l7 5z"></path>
              </svg>
              - 30 sec
            </div>

            <div
              className={
                'flex h-34 w-86 cursor-pointer items-center justify-center gap-5 bg-[#FBFBFB] p-8 text-[13px] text-[#555555]'
              }
            >
              <svg
                className={'rotate-180'}
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="10"
              >
                <path d="M13 10V0L6 5l7 5z"></path>
                <path d="M7 10V0L0 5l7 5z"></path>
              </svg>
              + 30 sec
            </div>
            <div
              className={
                'flex h-34 w-86 cursor-pointer items-center justify-center gap-5 bg-[#FBFBFB] p-8 text-[13px] text-[#555555]'
              }
            >
              <svg
                className={'rotate-180'}
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="10"
              >
                <path d="M13 10V0L6 5l7 5z"></path>
                <path d="M7 10V0L0 5l7 5z"></path>
              </svg>
              + 1 min
            </div>
            <div
              className={
                'flex h-34 w-86 cursor-pointer items-center justify-center gap-5 bg-[#FBFBFB] p-8 text-[13px] text-[#555555]'
              }
            >
              <svg
                className={'rotate-180'}
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="10"
              >
                <path d="M13 10V0L6 5l7 5z"></path>
                <path d="M7 10V0L0 5l7 5z"></path>
              </svg>
              + 5 min
            </div>

            <div
              className={
                'flex h-34 w-86 cursor-pointer items-center justify-center gap-5 bg-[#FBFBFB] p-8 text-[13px] text-[#555555]'
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 9 10"
                width="9"
                height="10"
                className="svg-icon--step-forward svg-icon"
              >
                <path d="M0 0v10l7-5-7-5zm7 0h2v10H7V0z"></path>
              </svg>
              Live
            </div>
          </div>
        </div>
      </div>




      <div>


      </div>
      <Footer className="landing-container" />
    </Fragment>
  );
}
