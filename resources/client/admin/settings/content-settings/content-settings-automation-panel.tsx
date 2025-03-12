import {Fragment} from 'react';
import {FormSwitch} from '@ui/forms/toggle/switch';
import {Trans} from '@ui/i18n/trans';
import {FormSelect} from '@ui/forms/select/select';
import {Item} from '@ui/forms/listbox/item';
import {useFormContext} from 'react-hook-form';
import {AdminSettings} from '@common/admin/settings/admin-settings';
import {FormTextField} from '@ui/forms/input-field/text-field/text-field';
import {useValueLists} from '@common/http/value-lists';
import {SettingsErrorGroup} from '@common/admin/settings/form/settings-error-group';
import {SettingsSeparator} from '@common/admin/settings/form/settings-separator';
import {LearnMoreLink} from '@common/admin/settings/form/learn-more-link';

export function ContentSettingsAutomationPanel() {
  const {watch} = useFormContext<AdminSettings>();
  return (
    <Fragment>
      <SearchMethodSelect />
      <FormSwitch
        className="mb-24"
        name="client.content.title_provider"
        value="tmdb"
        description={
          <Trans message="This will automatically import, and periodically update, all metadata available on TheMovieDB about the title when user visits that title's page." />
        }
      >
        <Trans message="Title automation" />
      </FormSwitch>
      <FormSwitch
        className="mb-24"
        name="client.content.force_season_update"
        description={
          <Trans message="When this is enabled, season episodes will be automatically updated, even if title automation is disabled." />
        }
      >
        <Trans message="Always update seasons" />
      </FormSwitch>
      <SettingsSeparator />
      <FormSwitch
        className="mb-24"
        name="client.content.people_provider"
        value="tmdb"
        description={
          <Trans message="This will automatically import, and periodically update, all metadata available on TheMovieDB about a person, when user visits that person's page." />
        }
      >
        <Trans message="People automation" />
      </FormSwitch>
      {watch('client.content.people_provider') === 'tmdb' && (
        <FormSwitch
          className="mb-24"
          name="client.content.automate_filmography"
          description={
            <Trans message="Whether full filmograpy for a person should be imported from TheMovieDB when auto updating the person metadata." />
          }
        >
          <Trans message="Full filmography" />
        </FormSwitch>
      )}
      <TmdbFields />
    </Fragment>
  );
}

function SearchMethodSelect() {
  return (
    <FormSelect
      className="mb-24"
      name="client.content.search_provider"
      selectionMode="single"
      label={<Trans message="Search method" />}
      description={
        <Trans message="Which method should be used for user facing search on the site." />
      }
    >
      <Item
        value="tmdb"
        description={
          <Trans message="Search on the site will directly connect to, and search TheMovieDB. Any movie, series and artist available on TheMovieDB will be discoverable via search, without needing to import or create it first." />
        }
      >
        <Trans message="TheMovieDB" />
      </Item>
      <Item
        value="local"
        description={
          <Trans message="Will only search content that was created or imported from admin area. This can be further configured from 'Local search' settings page." />
        }
      >
        <Trans message="Local" />
      </Item>
      <Item
        value="all"
        description={
          <Trans message="Will combine search results from both 'Local' and 'TheMovieDB' methods. If there are identical matches, local results will be preferred." />
        }
      >
        <Trans message="Local and TheMovieDB" />
      </Item>
    </FormSelect>
  );
}

function TmdbFields() {
  const {data} = useValueLists(['tmdbLanguages']);
  const {watch: w} = useFormContext<AdminSettings>();
  const shouldShow = [
    w('client.content.people_provider'),
    w('client.content.title_provider'),
    w('client.content.search_provider'),
  ].some(provider => `${provider}`.toLowerCase().includes('tmdb'));

  if (!shouldShow) {
    return null;
  }

  return (
    <SettingsErrorGroup name="tmdb_group" separatorBottom={false}>
      {isInvalid => (
        <Fragment>
          <FormTextField
            invalid={isInvalid}
            name="server.tmdb_api_key"
            label={<Trans message="TheMovieDB API Key" />}
            className="mb-24"
            required
            description={
              <LearnMoreLink link="https://support.vebto.com/hc/articles/35/65/221/creating-themoviedb-api-key" />
            }
          />
          <FormSelect
            className="mb-24"
            selectionMode="single"
            showSearchField
            invalid={isInvalid}
            name="client.tmdb.language"
            label={<Trans message="TheMovieDB language" />}
            description={
              <Trans message="In what language should content be fetched from TMDb. If translation is not available, data will be in original language for that movie or series." />
            }
          >
            {data?.tmdbLanguages.map(({code, name}) => (
              <Item value={code} key={code}>
                {name}
              </Item>
            ))}
          </FormSelect>
          <FormSwitch name="client.tmdb.includeAdult">
            <Trans message="Import adult content" />
          </FormSwitch>
        </Fragment>
      )}
    </SettingsErrorGroup>
  );
}
