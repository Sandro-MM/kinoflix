<?php

namespace App\Actions\Demo;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Support\Str;
use Symfony\Component\Console\Output\ConsoleOutput;

class GenerateDemoUsers
{
    public function execute(): void
    {
        $data = collect(
            json_decode(
                file_get_contents(
                    base_path('app/Actions/Demo/demo-users.json'),
                ),
                true,
            ),
        )->unique('email');

        $existing = User::whereIn('email', $data->pluck('email'))->get();
        $unique = $data->reject(
            fn($user) => $existing->contains('email', $user['email']),
        );

        if ($unique->isEmpty()) {
            return;
        }

        $output = new ConsoleOutput();
        $output->write('Generating demo users... ', true);

        $avatarSequence = new Sequence(...range(1, 75));

        $users = $unique->map(function ($user) use ($avatarSequence) {
            $number = $avatarSequence();
            $gender = strtolower($user['gender']);
            return [
                'email' => $user['email'],
                'first_name' => $user['first_name'],
                'last_name' => $user['last_name'],
                'gender' => $gender,
                'password' => Str::random(),
                'email_verified_at' => now(),
                'image' => "https://xsgames.co/randomusers/assets/avatars/$gender/$number.jpg",
            ];
        });

        User::insert($users->toArray());
    }
}
