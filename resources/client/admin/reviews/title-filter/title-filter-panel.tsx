import {
  BackendFilter,
  CustomFilterControl,
} from '@common/datatable/filters/backend-filter';
import React from 'react';
import {TitleSelect} from '@app/titles/title-select';

interface Props {
  filter: BackendFilter<CustomFilterControl>;
}
export function TitleFilterPanel({filter}: Props) {
  return (
    <TitleSelect
      name={`${filter.key}.value`}
      seasonName={`${filter.key}.season`}
      episodeName={`${filter.key}.episode`}
    />
  );
}
