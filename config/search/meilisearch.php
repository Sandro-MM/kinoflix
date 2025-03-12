<?php

use App\Models\Title;

return [
    Title::class => [
        'stopWords' => ['the', 'a', 'an'],
        'rankingRules' => [
            'popularity:desc',
            'typo',
            'words',
            'proximity',
            'attribute',
            'exactness',
        ],
    ],
];
