@extends('common::prerender.base')

@section('head')
    @include('seo.news-article-page.seo-tags')
@endsection

@section('body')
    @include('seo.menu')

    <h1>{{$article->title}}</h1>

    <h2>{{$article->byline}}</h2>
    <h3>{{$article->source}}</h3>

    @if($article->image)
        <img src="{{urls()->image($article->image)}}" alt="Article image">
    @endif

    <article>
        {!!$article->body!!}
    </article>
@endsection
