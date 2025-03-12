import {GetPersonResponse} from '@app/people/requests/use-person';
import {Accordion, AccordionItem} from '@ui/accordion/accordion';
import {Trans} from '@ui/i18n/trans';
import {TitlePoster} from '@app/titles/title-poster/title-poster';
import {SiteSectionHeading} from '@app/titles/site-section-heading';
import {TitleLink} from '@app/titles/title-link';
import {PersonCredit} from '@app/titles/models/title';
import {BulletSeparatedItems} from '@app/titles/bullet-separated-items';
import {CompactSeasonEpisode} from '@app/episodes/compact-season-episode';
import {EpisodeLink} from '@app/episodes/episode-link';
import {Button} from '@ui/buttons/button';
import {Fragment, useState} from 'react';
import {useFullPersonCreditsForTitle} from '@app/people/requests/use-full-person-credits-for-title';
import {CharacterOrJob} from '@app/people/person-page/character-or-job';
import {Person} from '@app/titles/models/person';

interface Props {
  data: GetPersonResponse;
}
export function PersonPageCredits({data: {credits, person}}: Props) {
  return (
    <div className="mt-34">
      <SiteSectionHeading fontSize="text-xl">
        <Trans message="Credits" />
      </SiteSectionHeading>
      <Accordion mode="multiple" defaultExpandedValues={[0]} isLazy>
        {Object.entries(credits).map(([department, credits]) => (
          <AccordionItem
            labelClassName="font-semibold text-base"
            description={
              <Trans
                message="(:count credits)"
                values={{count: credits.length}}
              />
            }
            key={department}
            label={
              <span className="capitalize">
                <Trans
                  message={department === 'actors' ? 'Acting' : department}
                />
              </span>
            }
          >
            {credits.map((credit, index) => {
              const isLast = credit === credits[credits.length - 1];
              return (
                <Fragment key={credit.id}>
                  <div className="flex items-start py-6">
                    <TitlePoster
                      title={credit}
                      size="w-40"
                      className="mr-12"
                      lazy
                      srcSize="sm"
                    />
                    <div className="mr-24 pt-2">
                      <div className="text-base font-semibold">
                        <TitleLink title={credit} />
                      </div>
                      <CharacterOrJob
                        className="text-sm text-muted"
                        credit={credit}
                      />
                      {credit.credited_episode_count ? (
                        <EpisodeList
                          credit={credit}
                          department={department}
                          person={person}
                        />
                      ) : null}
                    </div>
                    <div className="ml-auto text-sm text-muted">
                      {credit.year}
                    </div>
                  </div>
                  {!isLast && credit.year !== credits[index + 1]?.year && (
                    <div className="my-8 h-1 w-full bg-divider" />
                  )}
                </Fragment>
              );
            })}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

interface EpisodeListProps {
  credit: PersonCredit;
  department: string;
  person: Person;
}
function EpisodeList({credit, department, person}: EpisodeListProps) {
  const [loadMoreEpisodes, setLoadMoreEpisodes] = useState(false);
  const query = useFullPersonCreditsForTitle(
    {person, department, credit},
    {
      enabled: loadMoreEpisodes,
    },
  );
  const allEpisodesLoaded =
    credit.episodes.length === credit.credited_episode_count ||
    query.data != null;
  const isLoadingMore = query.isLoading && query.fetchStatus !== 'idle';
  const shouldShowLoadMoreBtn = isLoadingMore || !allEpisodesLoaded;
  const episodeCredits = query.data?.credits.length
    ? query.data.credits
    : credit.episodes;

  return (
    <div className="mt-4">
      <div>
        {episodeCredits.map(episodeCredit => (
          <div className="mb-4 pl-10 text-xs" key={episodeCredit.id}>
            <BulletSeparatedItems>
              <span>
                -{' '}
                <EpisodeLink
                  title={credit}
                  episode={episodeCredit}
                  seasonNumber={episodeCredit.season_number}
                />{' '}
                ({episodeCredit.year})
              </span>
              <CompactSeasonEpisode episode={episodeCredit} />
              <CharacterOrJob credit={episodeCredit} />
            </BulletSeparatedItems>
          </div>
        ))}
      </div>
      {shouldShowLoadMoreBtn && (
        <div className="mt-8">
          <Button
            size="xs"
            disabled={isLoadingMore}
            onClick={() => {
              setLoadMoreEpisodes(true);
            }}
          >
            <Trans
              message="Show all :count episodes"
              values={{count: credit.credited_episode_count}}
            />
          </Button>
        </div>
      )}
    </div>
  );
}
