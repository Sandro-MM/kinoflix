@extends('common::prerender.base')

@section('head')
    @include('seo.channel-page.seo-tags')
@endsection

@section('body')
    @include('seo.menu')

    <h1>{{ $channel->name }}</h1>

    <ul style="display: flex; flex-wrap: wrap">
        @foreach ($channel->content as $item)
            <li>
                @if ($item['model_type'] === 'channel')
                    @foreach ($item->content as $subItem)
                        @include('seo.channel-page.channel-content', ['item' => $subItem])
                    @endforeach
                @else
                    @include('seo.channel-page.channel-content', ['item' => $item])
                @endif
            </li>
        @endforeach
    </ul>
@endsection
