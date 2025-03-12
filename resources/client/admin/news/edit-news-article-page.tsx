import React, {Fragment, Suspense} from 'react';
import {PageMetaTags} from '@common/http/page-meta-tags';
import {PageStatus} from '@common/http/page-status';
import {FormProvider, useForm} from 'react-hook-form';
import {FileUploadProvider} from '@common/uploads/uploader/file-upload-provider';
import {ArticleEditorTitle} from '@common/article-editor/article-editor-title';
import {ArticleEditorStickyHeader} from '@common/article-editor/article-editor-sticky-header';
import {useNavigate} from '@common/ui/navigation/use-navigate';
import {FullPageLoader} from '@ui/progress/full-page-loader';
import {useNewsArticle} from '@app/admin/news/requests/use-news-article';
import {NewsArticle} from '@app/titles/models/news-article';
import {useUpdateNewsArticle} from '@app/admin/news/requests/use-update-news-article';
import {CreateNewsArticlePayload} from '@app/admin/news/requests/use-create-news-article';
import {FormImageSelector} from '@common/uploads/components/image-selector';

const ArticleBodyEditor = React.lazy(
  () => import('@common/article-editor/article-body-editor'),
);

export function EditNewsArticlePage() {
  const query = useNewsArticle('newsArticlePage');

  return query.data ? (
    <Fragment>
      <PageMetaTags query={query} />
      <PageContent article={query.data.article} />
    </Fragment>
  ) : (
    <div className="relative h-full w-full">
      <PageStatus query={query} />
    </div>
  );
}

interface PageContentProps {
  article: NewsArticle;
}
function PageContent({article}: PageContentProps) {
  const navigate = useNavigate();
  const updateArticle = useUpdateNewsArticle();
  const form = useForm<CreateNewsArticlePayload>({
    defaultValues: {
      title: article.title,
      slug: article.slug,
      body: article.body,
      image: article.image,
    },
  });

  const handleSave = (editorContent: string) => {
    updateArticle.mutate(
      {
        ...form.getValues(),
        body: editorContent,
      },
      {
        onSuccess: () => navigate('../..', {relative: 'path'}),
      },
    );
  };

  return (
    <Suspense fallback={<FullPageLoader />}>
      <ArticleBodyEditor initialContent={article.body}>
        {(content, editor) => (
          <FileUploadProvider>
            <FormProvider {...form}>
              <ArticleEditorStickyHeader
                editor={editor}
                backLink="../.."
                slugPrefix="news"
                isLoading={updateArticle.isPending}
                onSave={handleSave}
              />
              <div className="mx-20">
                <FormImageSelector
                  className="mx-auto mb-32 max-w-[655px]"
                  showEditButtonOnHover
                  variant="square"
                  name="image"
                  diskPrefix="news_images"
                />
                <div className="prose mx-auto flex-auto dark:prose-invert">
                  <ArticleEditorTitle />
                  {content}
                </div>
              </div>
            </FormProvider>
          </FileUploadProvider>
        )}
      </ArticleBodyEditor>
    </Suspense>
  );
}
