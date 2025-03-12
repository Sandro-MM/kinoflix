<?php

namespace App\Console\Commands;

use App\Models\User;
use Common\Auth\Permissions\Permission;
use Common\Auth\Permissions\Traits\SyncsPermissions;
use Common\Core\Install\CreateDefaultCustomPages;
use Common\Localizations\Localization;
use Common\Pages\CustomPage;
use Illuminate\Console\Command;

class CleanDemoSite extends Command
{
    use SyncsPermissions;

    protected $signature = 'demo:clean';

    public function handle(): void
    {
        // reset admin user
        $this->cleanAdminUser('admin@admin.com');

        // delete localizations
        Localization::get()->each(function (Localization $localization) {
            if (strtolower($localization->name) !== 'english') {
                $localization->delete();
            }
        });

        // delete custom pages
        CustomPage::truncate();
        (new CreateDefaultCustomPages())->execute();
    }

    private function cleanAdminUser($email): void
    {
        $admin = User::where('email', $email)->first();

        if (!$admin) {
            $admin = User::create([
                'email' => $email,
            ]);
        }

        $admin->image = null;
        $admin->username = 'admin';
        $admin->first_name = 'Demo';
        $admin->last_name = 'Admin';
        $admin->password = 'admin';
        $admin->email_verified_at = now()->subDays(10);
        $admin->save();

        $adminPermission = app(Permission::class)
            ->where('name', 'admin')
            ->first();
        $this->syncPermissions($admin, [$adminPermission]);
    }
}
