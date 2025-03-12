import {Trans} from '@ui/i18n/trans';
import {Item} from '@ui/forms/listbox/item';
import {FormSelect} from '@ui/forms/select/select';
import React, {useState} from 'react';
import {KEYWORD_MODEL} from '@app/titles/models/keyword';
import {useValueLists} from '@common/http/value-lists';
import {message} from '@ui/i18n/message';
import {useTrans} from '@ui/i18n/use-trans';
import {useFormContext} from 'react-hook-form';
import {UpdateChannelPayload} from '@common/admin/channels/requests/use-update-channel';
import {ChannelRestrictionField} from '@common/admin/channels/channel-editor/controls/channel-restriction-field';
import {ChannelContentConfig} from '@common/admin/channels/channel-editor/channel-content-config';

interface Props {
  className?: string;
  config: ChannelContentConfig;
}
export function AppChannelRestrictionField({className, config}: Props) {
  return (
    <ChannelRestrictionField config={config} className={className}>
      <RestrictionModelField config={config} />
    </ChannelRestrictionField>
  );
}

interface RestrictionModelFieldProps {
  config: ChannelContentConfig;
}
function RestrictionModelField({config}: RestrictionModelFieldProps) {
  const {trans} = useTrans();
  const [searchValue, setSearchValue] = useState('');
  const {watch} = useFormContext<UpdateChannelPayload>();
  const {data} = useValueLists(['genres', 'productionCountries'], {
    type: watch('config.autoUpdateProvider'),
  });

  const selectedRestriction = watch('config.restriction');
  const selectedKeywordId = watch('config.restrictionModelId');
  const keywordQuery = useValueLists(['keywords'], {
    searchQuery: searchValue,
    selectedValue: selectedKeywordId,
    type: watch('config.autoUpdateProvider'),
  });

  if (!selectedRestriction) return null;

  const options = {
    genre: data?.genres,
    keyword: keywordQuery.data?.keywords,
    productionCountry: data?.productionCountries,
  } as Record<string, {value: string; name: string}[]>;
  const restrictionLabel = config.restrictions[selectedRestriction]?.label;

  // allow setting keyword to custom value, because there are too many keywords
  // to put into autocomplete, ideally it would use async search from backend though

  return (
    <FormSelect
      className="w-full flex-auto"
      name="config.restrictionModelId"
      selectionMode="single"
      showSearchField
      searchPlaceholder={trans(message('Search...'))}
      isAsync={selectedRestriction === KEYWORD_MODEL}
      isLoading={
        selectedRestriction === KEYWORD_MODEL && keywordQuery.isLoading
      }
      inputValue={searchValue}
      onInputValueChange={setSearchValue}
      label={
        <Trans
          message=":restriction name"
          values={{restriction: trans(restrictionLabel)}}
        />
      }
    >
      <Item value="urlParam">
        <Trans message="Dynamic (from url)" />
      </Item>
      {options[selectedRestriction]?.map(option => (
        <Item key={option.value} value={option.value}>
          <Trans message={option.name} />
        </Item>
      ))}
    </FormSelect>
  );
}
