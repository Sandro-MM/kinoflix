<meta property="og:site_name" content="{{ settings('branding.site_name') }}" />
<meta property="twitter:card" content="summary" />
<meta property="og:type" content="profile" />
<title>{{ $person->name }} - {{ settings('branding.site_name') }}</title>
<meta property="og:url" content="{{ urls()->person($person) }}" />
<link rel="canonical" href="{{ urls()->person($person) }}" />
<meta
    property="og:title"
    content="{{ $person->name }} - {{ settings('branding.site_name') }}"
/>

@if ($person->poster)
    <meta property="og:image" content="{{ urls()->image($person->poster) }}" />
    <meta property="og:width" content="300" />
    <meta property="og:height" content="450" />
@endif

@if($person->description)
    <meta property="og:description" content="{{ str($person->description)->limit(160) }}" />
    <meta name="description" content="{{ str($person->description)->limit(160) }}" />
@endif

<meta property="keywords" content="biography, facts, photos, credits" />

<script type="application/ld+json">
    {!! collect([
        '@context' => 'http://schema.org',
        '@type' => 'Person',
        '@id' => urls()->person($person),
        'url' => urls()->person($person),
        'name' => $person->name,
        'image' => urls()->image($person->poster),
        'description' => $person->description ? str($person->description)->limit(160) : null,
        'jobTitle' => $person->known_for,
        'birthDate' => $person->birth_date,
        'birthPlace' => $person->birth_place,
      ])->filter()->toJson() !!}
</script>
