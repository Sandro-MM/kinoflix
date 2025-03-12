@extends('common::prerender.base')

@section('head')
    @include('seo.episode-page.seo-tags')
@endsection

@section('body')
    @include('seo.menu')

    <h1>{{ $episode->name }}</h1>

    @if($episode->poster)
        <img src="{{urls()->image($episode->poster)}}" alt="Episode poster" width="270px">
    @endif

    <dl>
        @if($episode->rating)
            <dt>{{__('User Rating')}}</dt>
            <dd>{{$episode->rating}}</dd>
        @endif

        <dt>{{__('Running Time')}}</dt>
        <dd>{{$episode->runtime ?? $title->runtime}}</dd>

        <dt>{{__('Release Date')}}</dt>
        <dd>{{$episode->release_date}}</dd>
    </dl>

    <p>{{ $episode->description }}</p>

    <div>
        <h3>{{__('Credits')}}</h3>
        <ul style="display: flex; flex-wrap: wrap;">
            @foreach($credits->flatten(1) as $credit)
                <li>
                    <div>
                        @if($credit['poster'])
                            <img src="{{urls()->image($credit['poster'])}}" alt="Credit poster" width="270px">
                        @endif
                        <div>
                            <dl>
                                <dt>{{__('Job')}}</dt>
                                <dd>{{$credit['pivot']['job']}}</dd>
                                <dt>{{__('Department')}}</dt>
                                <dd>{{$credit['pivot']['department']}}</dd>
                                @if($credit['pivot']['character'])
                                    <dt>{{__('Character')}}</dt>
                                    <dd>{{$credit['pivot']['character']}}</dd>
                                @endif
                            </dl>
                            <a href="{{urls()->person($credit)}}">{{$credit['name']}}</a>
                        </div>
                    </div>
                </li>
            @endforeach
        </ul>
    </div>
@endsection
