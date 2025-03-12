@if ($item['model_type'] === 'title')
    <figure>
        @if($image = urls()->image($item['poster']))
            <img
                src="{{ $image }}"
                alt="{{ $item['name'] }} poster"
                width="270px"
            />
        @endif
        <figcaption>
            <a href="{{ urls()->title($item) }}">
                {{ $item['name'] }}
            </a>
        </figcaption>
    </figure>
@elseif($item['model_type'] === 'newsArticle')
    <div>
        <h2><a href="{{urls()->article($item)}}">{{$item['title']}}</a></h2>
        <h3>{{$item['byline']}}</h3>
        <h4>{{$item['source']}}</h4>
        @if(isset($item['image']))
            <img src="{{urls()->image($item['image'])}}" alt="Article image">
        @endif
        <p>
            {!!$item['body']!!}
        </p>
    </div>
@else
    <figure>
        @if($image = urls()->image($item['poster']))
            <img
                src="{{ $image }}"
                alt="{{ $item['name'] }} poster"
                width="270px"
            />
        @endif
        <figcaption>
            <a href="{{ urls()->person($item) }}">
                {{ $item['name'] }}
            </a>
        </figcaption>
    </figure>
@endif
