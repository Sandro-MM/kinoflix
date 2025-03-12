<meta property="og:site_name" content="{{ settings('branding.site_name') }}" />
<meta property="twitter:card" content="summary" />
<meta property="og:type" content="video.other" />
<title>
    {{ $title->name }} - {{ $video->name }} -
    {{ settings('branding.site_name') }}
</title>
<meta property="og:url" content="{{ urls()->watch($video) }}" />
<link rel="canonical" href="{{ urls()->watch($video) }}" />
<meta
    property="og:title"
    content="{{ $title->name }} - {{ $video->name }} - {{ settings('branding.site_name') }}"
/>

@if ($image = $video->image ?? $title->backdrop)
    <meta property="og:image" content="{{ urls()->image($image) }}" />
    <meta property="og:width" content="1280" />
    <meta property="og:height" content="720" />
@endif

<meta
    property="og:description"
    content="Watch {{ $video->name }} on {{ settings('branding.site_name') }}"
/>
<meta
    name="description"
    content="Watch {{ $video->name }} on {{ settings('branding.site_name') }}"
/>

<script type="application/ld+json">
      {!! collect([
        '@context' => 'http://schema.org',
        '@type' => 'VideoObject',
        '@id' => urls()->watch($video),
        'url' => urls()->watch($video),
        'embedUrl' => urls()->watch($video),
        'name' => $title->name . ' - ' . $video->name,
        'thumbnail' => [
            '@type' => 'ImageObject',
            'url' => urls()->image($video->image ?? $title->backdrop)
        ],
        'thumbnailUrl' => $video->image ?? $title->backdrop,
        'description' => $title->description,
        'uploadDate' => $video->created_at,
      ])->filter()->toJson() !!}
</script>
