import {useFormContext} from 'react-hook-form';
import {AdminSettings} from '@common/admin/settings/admin-settings';
import {Fragment} from 'react';
import {FormSwitch} from '@ui/forms/toggle/switch';
import {Trans} from '@ui/i18n/trans';
import {FormSelect} from '@ui/forms/select/select';
import {Item} from '@ui/forms/listbox/item';

export function ContentSettingsGeneralPanel() {
  const {watch} = useFormContext<AdminSettings>();
  return (
    <Fragment>
      <SortingMethodSelect />
      <FormSwitch
        className="mb-24"
        name="client.titles.enable_reviews"
        description={
          <Trans
            message={
              'Enable or disable all review functionality across the site.'
            }
          />
        }
      >
        <Trans message="Enable reviews" />
      </FormSwitch>
      <FormSwitch
        className="mb-24"
        name="client.titles.enable_comments"
        description={
          <Trans
            message={
              'Enable or disable all comment functionality across the site.'
            }
          />
        }
      >
        <Trans message="Enable comments" />
      </FormSwitch>
      {watch('client.titles.enable_comments') && (
        <FormSwitch
          name="client.comments.per_video"
          description={
            <Trans
              message={
                'When enabled, individual videos will have their own separate comment section (if there are multiple videos), otherwise comments will be shared by all videos for the same title.'
              }
            />
          }
        >
          <Trans message="Per video comments" />
        </FormSwitch>
      )}
    </Fragment>
  );
}

function SortingMethodSelect() {
  return (
    <FormSelect
      className="mb-24"
      name="server.rating_column"
      label={<Trans message="Rating used for sorting" />}
      selectionMode="single"
      description={
        <Trans
          message="When ordering titles by rating, should local user rating or TheMovieDB rating average be
            used."
        />
      }
    >
      <Item value="tmdb_vote_average">
        <Trans message="TheMovieDB" />
      </Item>
      <Item value="local_vote_average">
        <Trans message="Local (Ratings and reviews from site users)" />
      </Item>
    </FormSelect>
  );
}
