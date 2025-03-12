@extends('common::prerender.base')

@section('head')
    @include('seo.search-page.seo-tags')
@endsection

@section('body')
    @include('seo.menu')

    <h1>{{ __('Search results') }}</h1>

    <ul>
        @foreach ($results as $item)
            <li>
                @if ($item['model_type'] === 'title')
                    <figure>
                        <img src="{{ urls()->image($item['poster']) }}" />
                        <figcaption>
                            <a href="{{ urls()->title($item) }}">
                                {{ $item['name'] }}
                            </a>
                        </figcaption>
                    </figure>
                @else
                    <figure>
                        <img src="{{ urls()->image($item['poster']) }}" />
                        <figcaption>
                            <a href="{{ urls()->person($item) }}">
                                {{ $item['name'] }}
                            </a>
                        </figcaption>
                    </figure>
                @endif
            </li>
        @endforeach
    </ul>
@endsection
