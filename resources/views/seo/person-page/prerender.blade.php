@extends('common::prerender.base')

@section('head')
    @include('seo.person-page.seo-tags')
@endsection

@section('body')
    @include('seo.menu')

    <h1>{{ $person->name }}</h1>

    <img
        src="{{ urls()->image($person->poster) }}"
        alt="Poster"
        width="270px"
    />

    <div>
        <h3>{{ __('Biography') }}</h3>
        <p>{{ $person->description }}</p>
    </div>

    <div>
        <h3>{{ __('Personal Facts') }}</h3>
        <dl>
            <dt>{{ __('Known For') }}</dt>
            <dd>{{ $person->known_for }}</dd>

            <dt>{{ __('Gender') }}</dt>
            <dd>{{ $person->gender }}</dd>

            <dt>{{ __('Known Credits') }}</dt>
            <dd>{{ $total_credits_count }}</dd>

            @if ($person->birth_date)
                <dt>{{ __('Birth Date') }}</dt>
                <dd>{{ $person->birth_date }}</dd>
            @endif

            @if ($person->birth_place)
                <dt>{{ __('Birth Place') }}</dt>
                <dd>{{ $person->birth_place }}</dd>
            @endif
        </dl>
    </div>

    <div>
        <h3>{{ __('Known For') }}</h3>
        <ul style="display: flex; flex-wrap: wrap">
            @foreach ($knownFor as $credit)
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
                            <a href="{{ urls()->title($credit) }}">
                                {{ $credit['name'] }}
                            </a>
                        </div>
                    </div>
                </li>
            @endforeach
        </ul>
    </div>

    <div>
        <h3>{{ __('Credits') }}</h3>
        <ul>
            @foreach ($credits as $groupName => $creditGroup)
                <li style="margin-bottom: 15px">
                    <h4 style="text-transform: capitalize">
                        {{ $groupName }} ({{ count($creditGroup) }} credits)
                    </h4>
                    <ul>
                        @foreach ($creditGroup as $credit)
                            @if($credit)
                                <li style="margin-bottom: 15px">
                                    <div class="meta">
                                        <a
                                            href="{{ urls()->title($credit) }}"
                                        >
                                            {{ $credit['name'] }}
                                        </a>
                                        @if (isset($credit['pivot']))
                                            <div>
                                                {{ $credit['pivot']['character'] }}
                                            </div>
                                            <div>
                                                {{ $credit['pivot']['job'] }}
                                            </div>
                                            <div>
                                                {{ $credit['pivot']['department'] }}
                                            </div>
                                        @endif

                                        @if (isset($credit['episodes']))
                                            <div class="episode-list">
                                                @foreach ($credit['episodes'] as $episodeCredit)
                                                    <div class="episode-credit">
                                                        <div class="episode-name">
                                                            <span>-</span>
                                                            <a
                                                                href="{{ urls()->episode($episodeCredit, $credit) }}"
                                                            >
                                                                {{ $episodeCredit['name'] }}
                                                            </a>
                                                            <span>
                                                            ({{ $episodeCredit['year'] }})
                                                        </span>
                                                            <span
                                                                class="episode-separator"
                                                            >
                                                            ...
                                                        </span>
                                                            <span>
                                                            <span>
                                                                {{ $episodeCredit['pivot']['character'] }}
                                                            </span>
                                                            <span>
                                                                {{ $episodeCredit['pivot']['job'] }}
                                                            </span>
                                                            <span>
                                                                {{ $episodeCredit['pivot']['department'] }}
                                                            </span>
                                                        </span>
                                                        </div>
                                                    </div>
                                                @endforeach
                                            </div>
                                        @endif
                                    </div>
                                    <div class="year">{{ $credit['year'] }}</div>
                                </li>
                            @endif
                        @endforeach
                    </ul>
                </li>
            @endforeach
        </ul>
    </div>
@endsection
