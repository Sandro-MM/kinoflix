<?php

namespace App\Actions\Titles;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class StoreMediaImageOnDisk
{
    // sizes should be ordered by size (desc), to avoid blurry images
    private array $sizes = [
        'original' => null,
        'large' => 500,
        'medium' => 300,
        'small' => 92,
    ];

    public function execute(UploadedFile $file): string
    {
        $hash = Str::random(30);

        $manager = new ImageManager(new Driver());
        $img = $manager->read($file);

        $extension = $file->extension() ?? 'jpeg';

        foreach ($this->sizes as $key => $size) {
            if ($size) {
                $img->scale($size);
            }

            Storage::disk('public')->put(
                "media-images/backdrops/$hash/$key.$extension",
                $extension === 'png' ? $img->toPng() : $img->toJpeg(),
            );
        }

        $endpoint = config('common.site.file_preview_endpoint');
        $uri = "media-images/backdrops/$hash/original.$extension";
        return $endpoint
            ? "$endpoint/storage/$uri"
            : Storage::disk('public')->url($uri);
    }
}
