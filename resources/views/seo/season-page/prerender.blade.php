@extends('common::prerender.base')

@section('head')
    @include('seo.title-page.seo-tags')
@endsection

@section('body')
    @include('seo.menu')

    <h1>
        {{ $title->name }}: {{ __('Season') }}
        {{ $season->number }}
    </h1>

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

    @if ($episodes)
        <div>
            <ul>
                @foreach ($episodes as $episode)
                    <li>
                        <figure>
                            <img
                                src="{{ urls()->image($episode['poster']) }}"
                                alt="Episode poster"
                                width="270px"
                            />
                            <figcaption>
                                <a
                                    href="{{ urls()->episode($episode, $title) }}"
                                >
                                    {{ $episode['name'] }}
                                </a>
                            </figcaption>
                        </figure>
                        <p>{{ $episode['description'] }}</p>
                    </li>
                @endforeach
            </ul>
        </div>
    @endif
@endsection
