<meta property="og:site_name" content="{{ settings('branding.site_name') }}" />
<meta property="twitter:card" content="summary" />
<title>
    {{ $title->name }} ({{ $title->year }}) - {{ $episode->name }} -
    {{ settings('branding.site_name') }}
</title>
<meta property="og:url" content="{{ urls()->episode($episode, $title) }}" />
<link rel="canonical" href="{{ urls()->episode($episode, $title) }}" />
<meta
    property="og:title"
    content="{{ $title->name }} ({{ $title->year }}) - {{ $episode->name }} -{{ settings('branding.site_name') }}"
/>

@if ($episode->poster)
    <meta property="og:image" content="{{ urls()->image($episode->poster) }}" />
    <meta property="og:width" content="300" />
    <meta property="og:height" content="450" />
@endif

<meta property="og:description" content="{{ $episode->description }}" />
<meta name="description" content="{{ $episode->description }}" />
<meta
    property="keywords"
    content="reviews,photos,user ratings,synopsis,trailers,credits"
/>

<script type="application/ld+json">
    {!! collect([
        '@context' => 'http://schema.org',
        '@type' => 'TVEpisode',
        '@id' => urls()->episode($episode, $title),
        'url' => urls()->episode($episode, $title),
        'name' => $episode->name,
        'image' => urls()->image($episode->poster),
        'timeRequired' => $title->runtime,
        'contentRating' => $title->certification,
        'description' => $episode->description,
        'datePublished' => $episode->release_date,
        'partOfSeason' => [
            '@type' => 'TVSeason',
            'seasonNumber' => $episode->season_number,
        ],
        'genre' => $title->genres->pluck('name')->toArray(),
        'keyword' => $title->keywords->pluck('name')->toArray(),
        'actor' => isset($credits['actors']) ? $credits['actors']->slice(0, 10)->map(function ($actor) {
            return [
                '@type' => 'Person',
                'name' => $actor->name,
                'url' => urls()->person($actor),
            ];
        }) : null,
        'director' => isset($credits['directing']) ? $credits['directing']->map(function ($director) {
            return [
                '@type' => 'Person',
                'name' => $director->name,
                'url' => urls()->person($director),
            ];
        }) : null,
        'creator' => isset($credits['creators']) ? $credits['creators']->map(function ($creator) {
            return [
                '@type' => 'Person',
                'name' => $creator->name,
                'url' => urls()->person($creator),
            ];
        }) : null,
        'aggregateRating' => $episode->rating ? [
            '@type' => 'AggregateRating',
            'ratingValue' => $episode->rating,
            'ratingCount' => $episode->vote_count,
            'bestRating' => '10',
            'worstRating' => '1',
        ] : null,
      ])->filter()->toJson() !!}
</script>
