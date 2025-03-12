import {TitleRating} from '@app/reviews/title-rating';
import React from 'react';
import {Episode} from '@app/titles/models/episode';
import {EpisodePoster} from '@app/episodes/episode-poster/episode-poster';
import {Title} from '@app/titles/models/title';
import {TitleLinkWithEpisodeNumber} from '@app/titles/title-link';

export interface EpisodePortraitGridItemProps {
  item: Episode;
  title: Title;
  rating?: number;
}
export function EpisodePortraitGridItem({
  item,
  title,
  rating,
}: EpisodePortraitGridItemProps) {
  return (
    <div>
      <EpisodePoster
        episode={item}
        title={title}
        srcSize="lg"
        aspect="aspect-poster"
        showPlayButton
      />
      <div className="mt-10 text-sm">
        <TitleRating score={rating ?? item.rating} className="mb-4" />
        <TitleLinkWithEpisodeNumber
          title={title}
          episode={item}
          className="block font-medium text-base"
        />
      </div>
    </div>
  );
}
