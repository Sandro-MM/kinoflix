import React, {Suspense} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {FileUploadProvider} from '@common/uploads/uploader/file-upload-provider';
import {ArticleEditorTitle} from '@common/article-editor/article-editor-title';
import {ArticleEditorStickyHeader} from '@common/article-editor/article-editor-sticky-header';
import {useNavigate} from '@common/ui/navigation/use-navigate';
import {FullPageLoader} from '@ui/progress/full-page-loader';
import {
  CreateNewsArticlePayload,
  useCreatNewsArticle,
} from '@app/admin/news/requests/use-create-news-article';
import {FormImageSelector} from '@common/uploads/components/image-selector';

const ArticleBodyEditor = React.lazy(
  () => import('@common/article-editor/article-body-editor'),
);

export function CreateNewsArticlePage() {
  const navigate = useNavigate();
  const createArticle = useCreatNewsArticle();
  const form = useForm<CreateNewsArticlePayload>({});

  const handleSave = (editorContent: string) => {
    createArticle.mutate(
      {
        ...form.getValues(),
        body: editorContent,
      },
      {
        onSuccess: () => navigate('..', {relative: 'path'}),
      },
    );
  };

  return (
    <Suspense fallback={<FullPageLoader />}>
      <ArticleBodyEditor>
        {(content, editor) => (
          <FileUploadProvider>
            <FormProvider {...form}>
              <ArticleEditorStickyHeader
                editor={editor}
                backLink=".."
                isLoading={createArticle.isPending}
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
