import {SearchIcon} from '@ui/icons/material/Search';
import {message} from '@ui/i18n/message';
import {Item} from '@ui/forms/listbox/item';
import {ComboBox} from '@ui/forms/combobox/combobox';
import React, {useState} from 'react';
import {useTrans} from '@ui/i18n/use-trans';
import clsx from 'clsx';
import {useNavigate} from '@common/ui/navigation/use-navigate';
import {useParams} from 'react-router';
import {useSearchResults} from '@app/search/requests/use-search-results';
import {TITLE_MODEL} from '@app/titles/models/title';
import {getTitleLink} from '@app/titles/title-link';
import {TitlePoster} from '@app/titles/title-poster/title-poster';
import {PERSON_MODEL} from '@app/titles/models/person';
import {getPersonLink} from '@app/people/person-link';
import {PersonPoster} from '@app/people/person-poster/person-poster';
import {KnownForCompact} from '@app/people/known-for-compact';
import {Trans} from '@ui/i18n/trans';

interface SearchAutocompleteProps {
  className?: string;
}
export function SearchAutocomplete({className}: SearchAutocompleteProps) {
  const {searchQuery} = useParams();
  const {trans} = useTrans();
  const navigate = useNavigate();
  const [query, setQuery] = useState(searchQuery || '');
  const [isOpen, setIsOpen] = useState(false);
  const {isFetching, data} = useSearchResults('searchAutocomplete', query);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (query.trim().length) {
          setIsOpen(false);
          navigate(`/search/${encodeURIComponent(query.trim())}`);
        }
      }}
      className={clsx(
        'flex max-w-580 flex-auto items-center rounded bg-chip/40 text',
        className,
      )}
    >
      <ComboBox
        size="sm"
        startAdornment={
          <button type="submit" aria-label={trans(message('Search'))}>
            <SearchIcon className="flex-shrink-0 text-muted" />
          </button>
        }
        className="w-full"
        offset={6}
        inputClassName="w-full outline-none text-sm placeholder:text-muted"
        isAsync
        hideEndAdornment
        placeholder={trans(
          message('Search for movies, tv shows and people...'),
        )}
        isLoading={isFetching}
        inputValue={query}
        onInputValueChange={setQuery}
        clearInputOnItemSelection
        blurReferenceOnItemSelection
        selectionMode="none"
        openMenuOnFocus
        floatingMaxHeight={670}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        autoFocusFirstItem={false}
        focusLoopingMode="deselect"
      >
        {data?.results?.map(result => {
          switch (result.model_type) {
            case TITLE_MODEL:
              return (
                <Item
                  key={result.id}
                  value={result.id}
                  onSelected={() => {
                    navigate(getTitleLink(result));
                  }}
                  startIcon={
                    <TitlePoster title={result} srcSize="sm" size="w-46" />
                  }
                  description={
                    <div>
                      <div className="mb-4">{result.year}</div>
                      <div>
                        {result.is_series ? (
                          <Trans message="Tv series" />
                        ) : (
                          <Trans message="Movie" />
                        )}
                      </div>
                    </div>
                  }
                  textLabel={result.name}
                >
                  {result.name}
                </Item>
              );
            case PERSON_MODEL:
              return (
                <Item
                  key={result.id}
                  value={result.id}
                  onSelected={() => {
                    navigate(getPersonLink(result));
                  }}
                  startIcon={
                    <PersonPoster
                      person={result}
                      srcSize="sm"
                      className="w-56"
                    />
                  }
                  description={<KnownForCompact person={result} />}
                  textLabel={result.name}
                >
                  {result.name}
                </Item>
              );
          }
        })}
      </ComboBox>
    </form>
  );
}
