import {useTrans} from '@ui/i18n/use-trans';
import {useFormContext} from 'react-hook-form';
import React, {useState} from 'react';
import {useTitlesAutocomplete} from '@app/titles/requests/use-titles-autocomplete';
import {FormSelect} from '@ui/forms/select/select';
import {Trans} from '@ui/i18n/trans';
import {message} from '@ui/i18n/message';
import {Option} from '@ui/forms/combobox/combobox';
import {Avatar} from '@ui/avatar/avatar';

interface Props {
  name: string;
  seasonName?: string;
  episodeName?: string;
  disableTitleField?: boolean;
  className?: string;
}
export function TitleSelect({
  name,
  seasonName,
  episodeName,
  disableTitleField,
  className,
}: Props) {
  const {trans} = useTrans();
  const form = useFormContext();
  const selectedTitleId = form.watch(name);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedSeason = seasonName ? form.watch(seasonName) : undefined;
  const query = useTitlesAutocomplete({
    searchQuery,
    selectedTitleId,
    seasonNumber: selectedSeason,
  });
  const isLoading = query.isLoading || query.isPlaceholderData;

  const selectedTitle = query.data?.titles.find(t => t.id === selectedTitleId);
  const seasonCount = selectedTitle?.seasons_count || 0;
  const episodeNumbers = selectedTitle?.episode_numbers || [];

  return (
    <div className={className}>
      <FormSelect
        selectionMode="single"
        name={name}
        label={<Trans message="Title" />}
        placeholder={trans(message('Select a title'))}
        showSearchField
        searchPlaceholder={trans(message('Search titles'))}
        inputValue={searchQuery}
        onInputValueChange={setSearchQuery}
        isAsync
        isLoading={isLoading}
        required
        disabled={disableTitleField}
      >
        {query.data?.titles.map(title => (
          <Option
            key={title.id}
            value={title.id}
            description={title.description}
            startIcon={<Avatar src={title.image} />}
          >
            {title.name}
          </Option>
        ))}
      </FormSelect>
      {seasonCount > 0 && seasonName && (
        <FormSelect
          className="mt-12"
          name={seasonName}
          placeholder={trans(message('Select a season (optional)'))}
          selectionMode="single"
          label={<Trans message="Season" />}
        >
          <Option
            key="none"
            value=""
            onSelected={() => form.resetField(seasonName)}
          >
            <Trans message="None" />
          </Option>
          {[...new Array(seasonCount).keys()].map(i => {
            const number = i + 1;
            return (
              <Option key={number} value={number}>
                <Trans message="Season :number" values={{number}} />
              </Option>
            );
          })}
        </FormSelect>
      )}
      {!!episodeNumbers.length && episodeName && (
        <FormSelect
          className="mt-12"
          name={episodeName}
          placeholder={trans(message('Select an episode (optional)'))}
          selectionMode="single"
          label={<Trans message="Episode" />}
        >
          <Option
            key="none"
            value=""
            onSelected={() => form.resetField(episodeName)}
          >
            <Trans message="None" />
          </Option>
          {episodeNumbers.map(number => (
            <Option key={number} value={number}>
              <Trans message="Episode :number" values={{number}} />
            </Option>
          ))}
        </FormSelect>
      )}
    </div>
  );
}
