<?php

namespace App\Actions\Titles;

trait HandlesEncodedTmdbId
{
    public static function encodeTmdbId(
        string $provider,
        string $type,
        string|int $id,
    ): string {
        return base64_encode("$provider|$type|$id");
    }

    public static function decodeTmdbId($encodedId): array
    {
        $encodedId = base64_decode($encodedId);
        $parts = explode('|', $encodedId);
        if (count($parts) === 3) {
            return [
                'provider' => $parts[0],
                'type' => $parts[1],
                'id' => $parts[2],
            ];
        } else {
            return ['provider' => null, 'type' => null, 'id' => null];
        }
    }

    public static function decodeTmdbIdOrFail(string $encodedId): array
    {
        [$provider, $type, $id] = array_values(
            static::decodeTmdbId($encodedId),
        );
        if (!$provider || !$type || !$id) {
            abort(404);
        }
        return [(int) $id, $type];
    }
}
