import {ColumnConfig} from '@common/datatable/column-config';
import {NewsArticle} from '@app/titles/models/news-article';
import {Trans} from '@ui/i18n/trans';
import {FormattedDate} from '@ui/i18n/formatted-date';
import {Link} from 'react-router';
import {Tooltip} from '@ui/tooltip/tooltip';
import {IconButton} from '@ui/buttons/icon-button';
import {EditIcon} from '@ui/icons/material/Edit';
import {useContext} from 'react';
import {TableContext} from '@common/ui/tables/table-context';
import clsx from 'clsx';
import {useDeleteNewsArticle} from '@app/admin/news/requests/use-delete-news-article';
import {DialogTrigger} from '@ui/overlays/dialog/dialog-trigger';
import {DeleteIcon} from '@ui/icons/material/Delete';
import {ConfirmationDialog} from '@ui/overlays/dialog/confirmation-dialog';
import {useDialogContext} from '@ui/overlays/dialog/dialog-context';
import {NewsArticleLink} from '@app/news/news-article-link';
import {NewsArticleImage} from '@app/news/news-article-image';

export const newsDatatableColumns: ColumnConfig<NewsArticle>[] = [
  {
    key: 'name',
    width: 'flex-3 min-w-200',
    visibleInMode: 'all',
    header: () => <Trans message="Title" />,
    body: article => <ArticleColumn article={article} />,
  },
  {
    key: 'updatedAt',
    allowsSorting: true,
    width: 'w-96',
    header: () => <Trans message="Last updated" />,
    body: article => (
      <time>
        <FormattedDate date={article.updated_at} />
      </time>
    ),
  },
  {
    key: 'actions',
    header: () => <Trans message="Actions" />,
    width: 'w-84 flex-shrink-0',
    hideHeader: true,
    align: 'end',
    visibleInMode: 'all',
    body: article => (
      <div className="text-muted">
        <Link to={`${article.id}/edit`}>
          <Tooltip label={<Trans message="Edit article" />}>
            <IconButton size="md">
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Link>
        <DialogTrigger type="modal">
          <Tooltip label={<Trans message="Delete article" />}>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <DeleteArticleDialog article={article} />
        </DialogTrigger>
      </div>
    ),
  },
];

interface ArticleColumnProps {
  article: NewsArticle;
}
function ArticleColumn({article}: ArticleColumnProps) {
  const {isCollapsedMode} = useContext(TableContext);
  return (
    <div className="flex gap-14">
      <NewsArticleImage article={article} size="w-52 h-52" lazy={false} />
      <div className="min-w-0">
        <div
          className={clsx(
            isCollapsedMode
              ? 'whitespace-normal'
              : 'overflow-hidden overflow-ellipsis whitespace-nowrap font-medium',
          )}
        >
          <NewsArticleLink article={article} target="_blank" />
        </div>
        {!isCollapsedMode && (
          <p className="mt-4 max-w-680 whitespace-normal text-xs text-muted">
            {article.body}
          </p>
        )}
      </div>
    </div>
  );
}

interface DeleteArticleDialogProps {
  article: NewsArticle;
}
export function DeleteArticleDialog({article}: DeleteArticleDialogProps) {
  const deleteArticle = useDeleteNewsArticle();
  const {close} = useDialogContext();
  return (
    <ConfirmationDialog
      isDanger
      isLoading={deleteArticle.isPending}
      title={<Trans message="Delete article" />}
      body={<Trans message="Are you sure you want to delete this article?" />}
      confirm={<Trans message="Delete" />}
      onConfirm={() => {
        deleteArticle.mutate(
          {articleId: article.id},
          {onSuccess: () => close()},
        );
      }}
    />
  );
}
