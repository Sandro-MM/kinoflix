<meta property="og:site_name" content="{{ settings('branding.site_name') }}" />
<meta property="twitter:card" content="summary" />
<title>
    {{ $title->name }} ({{ $title->year }}) -
    {{ settings('branding.site_name') }}
</title>
<meta property="og:url" content="{{ urls()->title($title) }}" />
<link rel="canonical" href="{{ urls()->title($title) }}" />
<meta
    property="og:title"
    content="{{ $title->name }} ({{ $title->year }}) - {{ settings('branding.site_name') }}"
/>

@if ($title->poster)
    <meta property="og:image" content="{{ urls()->image($title->poster) }}" />
    <meta property="og:width" content="300" />
    <meta property="og:height" content="450" />
@endif

<meta property="og:description" content="{{ str($title->description)->limit(160) }}" />
<meta name="description" content="{{ str($title->description)->limit(160) }}" />
<meta
    property="keywords"
    content="reviews,photos,user ratings,synopsis,trailers,credits"
/>
<meta property="og:type" content="video.movie" />

<script type="application/ld+json">
    {!! collect([
        '@context' => 'http://schema.org',
        '@type' => 'Movie',
        'name' => $title->name,
        '@id' => urls()->title($title),
        'url' => urls()->title($title),
        'image' => urls()->image($title->poster),
        'description' => str($title->description)->limit(160),
        'genre' => $title->genres->pluck('name')->toArray(),
        'keywords' => $title->keywords->pluck('name')->join(','),
        'contentRating' => $title->certification,
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
        'datePublished' => $title->year,
        'duration' => $title->runtime,
        'aggregateRating' => $title->rating ? [
            '@type' => 'AggregateRating',
            'ratingValue' => $title->rating,
            'ratingCount' => $title->vote_count,
            'bestRating' => '10',
            'worstRating' => '1',
        ] : null,
    ])->filter()->toJson() !!}
</script>
