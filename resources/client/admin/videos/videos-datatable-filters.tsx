import {
  BackendFilter,
  FilterControlType,
  FilterOperator,
} from '@common/datatable/filters/backend-filter';
import {message} from '@ui/i18n/message';
import {USER_MODEL} from '@ui/types/user';
import {
  createdAtFilter,
  updatedAtFilter,
} from '@common/datatable/filters/timestamp-filters';
import {TitleFilterControl} from '@app/admin/reviews/title-filter/title-filter-control';
import {TitleFilterPanel} from '@app/admin/reviews/title-filter/title-filter-panel';

export const VideosDatatableFilters: BackendFilter[] = [
  {
    key: 'user_id',
    label: message('User'),
    description: message('User video was created by'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.SelectModel,
      model: USER_MODEL,
    },
  },
  {
    key: 'title_id',
    label: message('Title'),
    description: message('Movie or series video was created for'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Custom,
      panel: TitleFilterPanel,
      listItem: TitleFilterControl,
    },
  },
  {
    key: 'approved',
    label: message('Status'),
    description: message('Whether video is approved or not'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: false,
      options: [
        {label: message('Approved'), key: 'approved', value: true},
        {label: message('Not approved'), key: 'not_approved', value: false},
      ],
    },
  },
  {
    key: 'origin',
    label: message('Origin'),
    description: message('Whether video origin is local or external'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: 'local',
      options: [
        {label: message('Local'), key: 'local', value: 'local'},
        {
          label: message('External'),
          key: 'external',
          value: {operator: FilterOperator.ne, value: 'local'},
        },
      ],
    },
  },
  {
    key: 'type',
    label: message('Type'),
    description: message('Type of the video'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: 'embed',
      options: [
        {label: message('Embed'), key: 'embed', value: 'embed'},
        {label: message('Direct Video'), key: 'video', value: 'video'},
        {label: message('Stream'), key: 'stream', value: 'stream'},
        {label: message('Remote Link'), key: 'remote', value: 'remote'},
      ],
    },
  },
  {
    key: 'quality',
    label: message('Quality'),
    description: message('Quality of video'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: 'hd',
      options: [
        {label: message('HD'), key: 'hd', value: 'hd'},
        {label: message('SD'), key: 'sd', value: 'sd'},
        {label: message('Stream'), key: 'stream', value: 'stream'},
        {label: message('Remote Link'), key: 'remote', value: 'remote'},
      ],
    },
  },
  {
    key: 'category',
    label: message('Category'),
    description: message('Video category'),
    defaultOperator: FilterOperator.eq,
    control: {
      type: FilterControlType.Select,
      defaultValue: 'trailer',
      options: [
        {label: message('Trailer'), key: 'trailer', value: 'trailer'},
        {label: message('Full Movie or episode'), key: 'full', value: 'full'},
        {label: message('Clip'), key: 'clip', value: 'clip'},
        {label: message('Teaser'), key: 'teaser', value: 'teaser'},
        {label: message('Featurette'), key: 'featurette', value: 'featurette'},
        {
          label: message('Behind the scenes'),
          key: 'behind_the_scenes',
          value: 'behind the scenes',
        },
      ],
    },
  },
  createdAtFilter({
    description: message('Date video was created'),
  }),
  updatedAtFilter({
    description: message('Date video was last updated'),
  }),
];
