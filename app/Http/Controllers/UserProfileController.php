<?php

namespace App\Http\Controllers;

use App\Actions\Lists\ListsLoader;
use App\Models\Episode;
use App\Models\Title;
use App\Models\User;
use Auth;
use Common\Auth\Events\UserAvatarChanged;
use Common\Core\BaseController;
use Common\Database\Datasource\Datasource;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class UserProfileController extends BaseController
{
    public function show(User $user)
    {
        $this->authorize('show', $user);

        $user->load(['profile', 'links']);
        $user->loadCount(['followers', 'followedUsers', 'lists']);

        $user->is_pro = $user->subscribed();

        return $this->success(['user' => $user]);
    }

    public function update()
    {
        $user = Auth::user();
        $this->authorize('update', $user);

        $data = $this->validate(request(), [
            'user' => 'array',
            'profile' => 'array',
            'links' => 'array',
        ]);

        User::unguard(true);
        $oldImage = $user->image;
        $user->fill($data['user'])->save();

        if (
            isset($data['user']['image']) &&
            $oldImage !== $data['user']['image']
        ) {
            event(new UserAvatarChanged($user));
        }

        $profile = $user
            ->profile()
            ->updateOrCreate(['user_id' => $user->id], $data['profile']);

        $user->links()->delete();
        $links = $user->links()->createMany($data['links']);

        $user->setRelation('profile', $profile);
        $user->setRelation('links', $links);

        return $this->success(['user' => $user]);
    }

    public function lists(User $user)
    {
        $this->authorize('show', $user);

        $pagination = (new ListsLoader())->forUser($user, request()->all());

        return $this->success(['pagination' => $pagination]);
    }

    public function ratings(User $user)
    {
        $this->authorize('show', $user);

        $datasource = new Datasource(
            $user
                ->reviews()
                ->whereNull('body')
                ->with([
                    'reviewable' => function (MorphTo $morphTo) {
                        $morphTo
                            ->morphWith([
                                Episode::class => ['title'],
                            ])
                            ->with('primaryVideo');
                    },
                    'user',
                ]),
            request()->all(),
        );

        $pagination = $datasource->paginate();

        return $this->success(['pagination' => $pagination]);
    }

    public function reviews(User $user)
    {
        $this->authorize('show', $user);

        $datasource = new Datasource(
            $user
                ->reviews()
                ->where('reviewable_type', Title::MODEL_TYPE)
                ->whereNotNull('body')
                ->with([
                    'reviewable' => function (MorphTo $morphTo) {
                        $morphTo->morphWith([
                            Episode::class => ['title'],
                        ]);
                    },
                    'user',
                ]),
            request()->all(),
        );

        $pagination = $datasource->paginate();

        return $this->success(['pagination' => $pagination]);
    }

    public function comments(User $user)
    {
        $this->authorize('show', $user);

        $datasource = new Datasource(
            $user
                ->comments()
                ->with([
                    'commentable' => function (MorphTo $morphTo) {
                        $morphTo->morphWith([
                            Episode::class => ['title'],
                        ]);
                    },
                    'user',
                ])
                ->where('deleted', false),
            request()->all(),
        );

        $pagination = $datasource->paginate();

        return $this->success(['pagination' => $pagination]);
    }
}
