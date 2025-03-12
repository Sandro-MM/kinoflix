<meta property="og:site_name" content="{{ settings('branding.site_name') }}" />
<meta property="twitter:card" content="summary" />
<title>
    {{ $title->name }} ({{ $title->year }}) - Season {{ $season->number }} -
    {{ settings('branding.site_name') }}
</title>
<meta property="og:url" content="{{ urls()->season($season, $title) }}" />
<link rel="canonical" href="{{ urls()->season($season, $title) }}" />
<meta
    property="og:title"
    content="{{ $title->name }} ({{ $title->year }}) - Season {{ $season->number }} - {{ settings('branding.site_name') }}"
/>

@if ($season->poster)
    <meta property="og:image" content="{{ urls()->image($season->poster) }}" />
    <meta property="og:width" content="300" />
    <meta property="og:height" content="450" />
@endif

<meta property="og:description" content="List of episodes for {{$title->name}}: Season {{$season->number}}" />
<meta name="description" content="List of episodes for {{$title->name}}: Season {{$season->number}}" />
<meta
    property="keywords"
    content="reviews,photos,user ratings,synopsis,trailers,credits"
/>
