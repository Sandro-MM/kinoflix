import React, {useState} from 'react';
import {Button} from '@ui/buttons/button';

export const VideoControls = () => {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");

return(
  <div
    className={'mt-12 flex w-max items-center justify-center gap-5 h-34 absolute 2xl:right-[10%] right-0 top-0'}
  >
    <Button
      variant={"flat"}
      color={"chip" }
      radius={'rounded-[0px]'}
      className="flex h-34 w-86 cursor-pointer items-center justify-center gap-5  p-8 text-[13px]"


    >
      <div className={'flex items-center justify-end gap-5'}>
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
    </Button>

    <div className="flex items-center justify-end gap-5">
      <Button
        variant={"flat"}
        color={"chip" }
        radius={'rounded-[0px]'}
        className="size-34"
      >
      <input
        type="text"
        maxLength="2"
        className="flex size-34 cursor-pointer items-center justify-center gap-5 bg-transparent p-8 text-[13px]"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
      />
      </Button>

      <div>:</div>
      <Button
        variant={"flat"}
        color={"chip" }
        radius={'rounded-[0px]'}
        className="size-34"
      >
      <input
        type="text"
        maxLength="2"
        className="flex h-34 w-34 cursor-pointer items-center justify-center  bg-transparent gap-5 p-8 text-[13px]"
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
      />
      </Button>

      <div className="rtv-seek-inputs-seperator"></div>

      <Button
        variant={"flat"}
        color={"chip" }
        radius={'rounded-[0px]'}
        className="flex h-34 w-34 cursor-pointer items-center justify-center gap-5  p-8 text-[13px]"


      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="9"
          height="9"
          className="svg-icon--enter svg-icon"
        >
          <path d="M5.2 1.2l-1 1.2L6.6 5 4 8l1.3 1L9 5 5.2 1.3zM0 0h1.7v6H0V0z"></path>
          <path d="M7 4.2V6H0V4.2h7z"></path>
        </svg>
      </Button>

      <div className="rtv-seek-inputs-seperator"></div>
      <div className="rtv-seek-inputs-seperator"></div>
    </div>




    <Button
      variant={"flat"}
      color={"chip" }
      radius={'rounded-[0px]'}
      className="flex h-34 w-86 cursor-pointer items-center justify-center gap-5  p-8 text-[13px]"


    >
      <div className={'flex items-center justify-end gap-5'}>
        <svg className={'svg-icon'} xmlns="http://www.w3.org/2000/svg" width="13" height="10">
          <path d="M13 10V0L6 5l7 5z"></path>
          <path d="M7 10V0L0 5l7 5z"></path>
        </svg>
        - 5 min
      </div>
    </Button>

    <Button
      variant={"flat"}
      color={"chip" }
      radius={'rounded-[0px]'}
      className="flex h-34 w-86 cursor-pointer items-center justify-center gap-5  p-8 text-[13px]"


    >
      <div className={'flex items-center justify-end gap-5'}>
        <svg className={'svg-icon'} xmlns="http://www.w3.org/2000/svg" width="13" height="10">
          <path d="M13 10V0L6 5l7 5z"></path>
          <path d="M7 10V0L0 5l7 5z"></path>
        </svg>
        - 1 min
      </div>
    </Button>

    <Button
      variant={"flat"}
      color={"chip" }
      radius={'rounded-[0px]'}
      className="flex h-34 w-86 cursor-pointer items-center justify-center gap-5  p-8 text-[13px]"


    >
      <div className={'flex items-center justify-end gap-5'}>
        <svg  className={'svg-icon'} xmlns="http://www.w3.org/2000/svg" width="13" height="10">
          <path d="M13 10V0L6 5l7 5z"></path>
          <path d="M7 10V0L0 5l7 5z"></path>
        </svg>
        - 30 sec
      </div>
    </Button>

    <Button
      variant={"flat"}
      color={"chip" }
      radius={'rounded-[0px]'}
      className="flex h-34 w-86 cursor-pointer items-center justify-center gap-5  p-8 text-[13px]"


    >
      <div className={'flex items-center justify-end gap-5'}>
      <svg
        className={'rotate-180 svg-icon'}
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="10"
      >
        <path d="M13 10V0L6 5l7 5z"></path>
        <path d="M7 10V0L0 5l7 5z"></path>
      </svg>
      + 30 sec
    </div>
    </Button>



    <Button
      variant={"flat"}
      color={"chip" }
      radius={'rounded-[0px]'}
      className="flex h-34 w-86 cursor-pointer items-center justify-center gap-5  p-8 text-[13px]"


    >
      <div className={'flex items-center justify-end gap-5'}>
      <svg
        className={'rotate-180 svg-icon'}
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="10"
      >
        <path d="M13 10V0L6 5l7 5z"></path>
        <path d="M7 10V0L0 5l7 5z"></path>
      </svg>
      + 1 min
    </div>
    </Button>
    <Button
      variant={"flat"}
      color={"chip" }
      radius={'rounded-[0px]'}
      className="flex h-34 w-86 cursor-pointer items-center justify-center gap-5  p-8 text-[13px]"


    >
      <div className={'flex items-center justify-end gap-5'}>
      <svg
        className={'rotate-180 svg-icon'}
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="10"
      >
        <path d="M13 10V0L6 5l7 5z"></path>
        <path d="M7 10V0L0 5l7 5z"></path>
      </svg>
      + 5 min
    </div>
    </Button>

    <Button
      variant={"flat"}
      color={"chip" }
      radius={'rounded-[0px]'}
      className="flex h-34 w-86 cursor-pointer items-center justify-center gap-5  p-8 text-[13px]"


    >
      <div className={'flex items-center justify-end gap-5'}>
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
    </Button>
  </div>
)
}
