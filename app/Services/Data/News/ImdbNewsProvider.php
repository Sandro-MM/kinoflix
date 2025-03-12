<?php

namespace App\Services\Data\News;

use Illuminate\Support\Facades\Http;
use Symfony\Component\DomCrawler\Crawler;

class ImdbNewsProvider
{
    public function getArticles(): array
    {
        $compiledNews = [];

        $html = Http::withHeaders([
            'User-Agent' =>
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ' .
                'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 ' .
                'Safari/537.36',
        ])
            ->get('https://www.imdb.com/news/top')
            ->getBody()
            ->getContents();
        $strippedHtml = preg_replace(
            '/<script(.*?)>(.*?)<\/script>/is',
            '',
            $html,
        );

        $crawler = new Crawler($strippedHtml);

        // grab every news article on the page
        foreach (
            $crawler->filter(
                '[data-testid="sub-section-news-card-section"] .ipc-list-card',
            )
            as $k => $node
        ) {
            $articleCrawler = new Crawler($node);

            // extract related people and title ids from article
            $links = $articleCrawler->filter('a')->extract(['href']);
            $imdbTitleIds = [];
            $imdbPersonIds = [];
            foreach ($links as $href) {
                preg_match('/\/title\/(tt[0-9]+)\//', $href, $titleMatches);
                preg_match('/\/name\/(nm[0-9]+)\//', $href, $nameMatches);
                if (isset($titleMatches[1])) {
                    $imdbTitleIds[] = $titleMatches[1];
                }
                if (isset($nameMatches[1])) {
                    $imdbPersonIds[] = $nameMatches[1];
                }
            }

            $date = head(
                $articleCrawler
                    ->filter('.ipc-inline-list li')
                    ->extract(['_text']),
            );
            $byline = head(
                $articleCrawler
                    ->filter('.ipc-inline-list li')
                    ->eq(1)
                    ->extract(['_text']),
            );

            $sourceUrl = last(
                $articleCrawler->filter('.ipc-link')->extract(['href']),
            );
            if (!isset(parse_url($sourceUrl)['scheme'])) {
                $sourceUrl = "https://imdb.com{$sourceUrl}";
            }
            $img = head($articleCrawler->filter('img')->extract(['src']));
            $body = trim(
                $articleCrawler->filter('.ipc-html-content-inner-div')->html(),
            );

            $body = preg_replace(
                '/<div data-reactroot="">.+?<\/div>/',
                '',
                $body,
            );
            $body = strip_tags($body, '<br>');

            if (!$img) {
                continue;
            }

            // transform each news article into array
            $compiledNews[$k] = [
                'title' => trim(
                    head(
                        $articleCrawler
                            ->filter('.ipc-link')
                            ->extract(['_text']),
                    ),
                ),
                'body' => $body,
                'imdb_title_ids' => $imdbTitleIds,
                'imdb_person_ids' => $imdbPersonIds,
                'date' => trim($date),
                'source' => trim(
                    last(
                        $articleCrawler
                            ->filter('.ipc-link')
                            ->extract(['_text']),
                    ),
                ),
                'source_url' => $sourceUrl,
                'byline' => str_replace('by ', '', trim($byline)),
                'image' => preg_replace(
                    '/([A-Z]+)([0-9]+)_CR([0-9]+),([0-9]+),100,150/',
                    '${1}400_CR$3,$4,270,400',
                    $img,
                ),
            ];
        }

        return $compiledNews;
    }
}
