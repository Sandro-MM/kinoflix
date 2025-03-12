<meta property="og:site_name" content="{{ settings('branding.site_name') }}" />
<meta property="twitter:card" content="summary" />
<meta property="og:type" content="website" />
<title>{{ $article->title }} - {{ settings('branding.site_name') }}</title>
<meta property="og:url" content="{{ urls()->article($article) }}" />
<link rel="canonical" href="{{ urls()->article($article) }}" />
<meta
    property="og:title"
    content="{{ $article->title }} - {{ settings('branding.site_name') }}"
/>

@if ($article->image)
    <meta property="og:image" content="{{ urls()->image($article->image) }}" />
    <meta property="og:width" content="300" />
    <meta property="og:height" content="450" />
@endif

<meta
    property="og:description"
    content="{{ str($article->body)->limit(300) }}"
/>
<meta name="description" content="{{ str($article->body)->limit(300) }}" />
