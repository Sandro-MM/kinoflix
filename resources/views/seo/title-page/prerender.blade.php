@extends('common::prerender.base')

@section('head')
    @include('seo.title-page.seo-tags')
@endsection

@section('body')
    @include('seo.menu')

    <h1>{{ $title->name }}</h1>

    @if ($title->poster)
        <img src="{{ urls()->image($title->poster) }}" alt="Title poster" width="270px" />
    @endif

    @if ($seasonCount = $title->seasons_count)
        <div>
            <h3>{{ __('Seasons') }}</h3>
            <ul>
                @foreach (range(0, $seasonCount) as $number)
                    <li>
                        <a
                            href="{{ urls()->season(['title_id' => $title->id, 'number' => $number], $title) }}"
                        >
                            Season: {{ $number + 1 }}
                        </a>
                    </li>
                @endforeach
            </ul>
        </div>
    @endif

    @if ($title->genres)
        <div>
            <h3>{{ __('Genres') }}</h3>
            <ul>
                @foreach ($title->genres as $genre)
                    <li>
                        <a href="{{ urls()->genre($genre) }}">
                            {{ $genre['display_name'] }}
                        </a>
                    </li>
                @endforeach
            </ul>
        </div>
    @endif

    <dl>
        <dt>{{ __('User Rating') }}</dt>
        <dd>{{ $title->rating }}</dd>

        <dt>{{ __('Running Time') }}</dt>
        <dd>{{ $title->runtime }}</dd>

        @if ($cert = $title->certification)
            <dt>{{ __('Certification') }}</dt>
            <dd>{{ $cert }}</dd>
        @endif

        @if ($tagline = $title->tagline)
            <dt>{{ __('Tagline') }}</dt>
            <dd>{{ $tagline }}</dd>
        @endif

        @if ($originalTitle = $title->original_title)
            <dt>{{ __('Original Title') }}</dt>
            <dd>{{ $originalTitle }}</dd>
        @endif

        <dt>{{ __('Release Date') }}</dt>
        <dd>{{$title->release_date}}</dd>

        @if (! $title->is_series)
            <dt>{{ __('Budget') }}</dt>
            <dd>{{ $title->budget }}</dd>

            <dt>{{ __('Revenue') }}</dt>
            <dd>{{ $title->revenue }}</dd>
        @endif
    </dl>

    <p>{{ $title->description }}</p>

    @if ($credits)
        <div>
            <h3>{{ __('Credits') }}</h3>
            <ul style="display: flex; flex-wrap: wrap">
                @foreach ($credits->flatten(1) as $credit)
                    <li>
                        <div>
                            @if ($credit['poster'])
                                <img
                                    src="{{ urls()->image($credit['poster']) }}"
                                    alt="Credit poster"
                                    width="270px"
                                />
                            @endif

                            <div>
                                <dl>
                                    <dt>{{ __('Job') }}</dt>
                                    <dd>{{ $credit['pivot']['job'] }}</dd>
                                    <dt>{{ __('Department') }}</dt>
                                    <dd>
                                        {{ $credit['pivot']['department'] }}
                                    </dd>
                                    @if ($credit['pivot']['character'])
                                        <dt>{{ __('Character') }}</dt>
                                        <dd>
                                            {{ $credit['pivot']['character'] }}
                                        </dd>
                                    @endif
                                </dl>
                                <a href="{{ urls()->person($credit) }}">
                                    {{ $credit['name'] }}
                                </a>
                            </div>
                        </div>
                    </li>
                @endforeach
            </ul>
        </div>
    @endif

    @if ($videos = $title->videos)
        <div>
            <h3>{{ __('Videos') }}</h3>
            <ul style="display: flex; flex-wrap: wrap">
                @foreach ($videos as $video)
                    <li>
                        <figure>
                            <img
                                src="{{ urls()->image($video['thumbnail'] ?: $title->poster) }}"
                                alt="Video thumbnail"
                                width="180px"
                            />
                            <figcaption>
                                <a href="{{ urls()->watch($video) }}">
                                    {{ $video['name'] }}
                                </a>
                            </figcaption>
                        </figure>
                    </li>
                @endforeach
            </ul>
        </div>
    @endif

    @if ($images = $title->images)
        <div>
            <h3>{{ __('Images') }}</h3>
            <ul style="display: flex; flex-wrap: wrap">
                @foreach ($images as $image)
                    <li>
                        <img
                            src="{{ urls()->image($image['url']) }}"
                            alt="Media image"
                            width="270px"
                        />
                    </li>
                @endforeach
            </ul>
        </div>
    @endif
@endsection
