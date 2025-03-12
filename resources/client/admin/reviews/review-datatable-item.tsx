import {User} from '@ui/types/user';
import React, {Fragment, useContext, useState} from 'react';
import {Checkbox} from '@ui/forms/toggle/checkbox';
import {UserAvatar} from '@common/auth/user-avatar';
import {FormattedRelativeTime} from '@ui/i18n/formatted-relative-time';
import {queryClient} from '@common/http/query-client';
import {Button} from '@ui/buttons/button';
import {Trans} from '@ui/i18n/trans';
import {FormTextField} from '@ui/forms/input-field/text-field/text-field';
import {SiteConfigContext} from '@common/core/settings/site-config-context';
import {Link} from 'react-router';
import {LinkStyle} from '@ui/buttons/external-link';
import {NormalizedModel} from '@ui/types/normalized-model';
import {Review} from '@app/titles/models/review';
import {TitleRating} from '@app/reviews/title-rating';
import {useUpdateReview} from '@app/admin/reviews/requests/use-update-review';
import {useForm} from 'react-hook-form';
import {CreateReviewPayload} from '@app/reviews/requests/use-create-review';
import {Form} from '@ui/forms/form';
import {StarSelector} from '@app/reviews/review-list/star-selector';
import {DeleteReviewsButton} from '@app/admin/reviews/delete-reviews-button';
import {BulletSeparatedItems} from '@app/titles/bullet-separated-items';
import {Avatar} from '@ui/avatar/avatar';

interface Props {
  review: Review;
  isSelected: boolean;
  onToggle: () => void;
}
export function ReviewDatatableItem({review, isSelected, onToggle}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const helpfulCount = review.helpful_count || 1;
  const totalFeedbackCount =
    review.helpful_count + review.not_helpful_count || 1;

  return (
    <div className="border-b p-14">
      {review.reviewable && (
        <ReviewableHeader
          isSelected={isSelected}
          onToggle={onToggle}
          reviewable={review.reviewable}
        />
      )}
      <div className="flex items-start gap-10 pt-14 md:pl-20">
        {review.user ? (
          <UserAvatar className="flex-shrink-0" user={review.user} size="md" />
        ) : (
          <Avatar size="md" label="User" />
        )}
        <div className="min-w-0 flex-auto overflow-hidden">
          <ReviewHeader review={review} />
          {isEditing ? (
            <EditReviewForm
              review={review}
              onClose={isSaved => {
                setIsEditing(false);
                if (isSaved) {
                  queryClient.invalidateQueries({queryKey: ['comment']});
                }
              }}
            />
          ) : (
            <Fragment>
              <div className="my-14">
                <TitleRating className="mb-8" score={review.score} />
                {review.title && (
                  <div className="mb-8 text-base font-medium">
                    {review.title}
                  </div>
                )}
                <div className="whitespace-break-spaces text-sm">
                  {review.body}
                </div>
                <div className="mt-8 text-xs text-muted">
                  <BulletSeparatedItems>
                    <Trans
                      message=":helpfulCount out of :total people found this helpful"
                      values={{helpfulCount, total: totalFeedbackCount}}
                    />
                    {review.reports_count ? (
                      <Trans
                        message=":count reports"
                        values={{count: review.reports_count || 0}}
                      />
                    ) : null}
                  </BulletSeparatedItems>
                </div>
              </div>
              <div>
                <DeleteReviewsButton reviewIds={[review.id]} />
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => setIsEditing(true)}
                >
                  <Trans message="Edit" />
                </Button>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

interface ReviewableHeaderProps {
  isSelected: boolean;
  onToggle: Props['onToggle'];
  reviewable: NormalizedModel;
}
function ReviewableHeader({
  isSelected,
  onToggle,
  reviewable,
}: ReviewableHeaderProps) {
  return (
    <div className="flex items-center">
      <div className="mr-14">
        <Checkbox checked={isSelected} onChange={() => onToggle()} />
      </div>
      {reviewable.image && (
        <img
          className="mr-6 h-20 w-20 overflow-hidden rounded object-cover"
          src={reviewable.image}
          alt=""
        />
      )}
      <div className="mr-4 text-sm">{reviewable.name}</div>
      <div className="text-xs text-muted">({reviewable.model_type})</div>
    </div>
  );
}

interface CommentHeaderProps {
  review: Review;
}
function ReviewHeader({review}: CommentHeaderProps) {
  return (
    <div className="flex items-center gap-4 text-sm">
      <div>
        {review.user && <UserDisplayName user={review.user} show="name" />}
      </div>
      <div>&bull;</div>
      <time>
        <FormattedRelativeTime date={review.created_at} />
      </time>
      {review.user && (
        <div className="ml-auto hidden md:block">
          {<UserDisplayName user={review.user} show="email" />}
        </div>
      )}
    </div>
  );
}

interface EditReviewFormProps {
  review: Review;
  onClose: (saved: boolean) => void;
}
function EditReviewForm({review, onClose}: EditReviewFormProps) {
  const [content, setContent] = useState(review.body);
  const updateReview = useUpdateReview(review);
  const form = useForm<CreateReviewPayload>({
    defaultValues: {
      score: review.score,
      title: review.title,
      body: review.body,
    },
  });
  return (
    <Form
      className="mt-24"
      form={form}
      onSubmit={newValues => {
        updateReview.mutate(newValues, {onSuccess: () => onClose(true)});
      }}
    >
      <StarSelector
        className="-ml-8 mb-12"
        count={10}
        value={form.watch('score')}
        onValueChange={newScore => {
          form.setValue('score', newScore);
        }}
      />
      <FormTextField
        name="title"
        className="mb-24"
        label={<Trans message="Title" />}
        labelSuffix={<Trans message="10 character minimum" />}
        autoFocus
        minLength={10}
        required
      />
      <FormTextField
        className="mb-24"
        name="body"
        label={<Trans message="Review" />}
        labelSuffix={<Trans message="100 character minimum" />}
        inputElementType="textarea"
        rows={5}
        minLength={100}
        required
      />
      <Button
        size="xs"
        variant="outline"
        color="primary"
        type="submit"
        className="mr-6"
        disabled={updateReview.isPending}
      >
        <Trans message="Save" />
      </Button>
      <Button
        size="xs"
        variant="outline"
        className="mr-6"
        onClick={e => onClose(false)}
        disabled={updateReview.isPending}
      >
        <Trans message="Cancel" />
      </Button>
    </Form>
  );
}

interface UserDisplayNameProps {
  user: User;
  show: 'name' | 'email';
}
function UserDisplayName({user, show}: UserDisplayNameProps) {
  const {auth} = useContext(SiteConfigContext);
  if (auth.getUserProfileLink) {
    return (
      <Link
        to={auth.getUserProfileLink(user)}
        className={LinkStyle}
        target="_blank"
      >
        {user[show]}
      </Link>
    );
  }
  return <div className="text-muted">{user[show]}</div>;
}
