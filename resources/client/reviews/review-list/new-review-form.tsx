import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {useAuth} from '@common/auth/use-auth';
import {
  CreateReviewPayload,
  useCreateReview,
} from '@app/reviews/requests/use-create-review';
import {useForm} from 'react-hook-form';
import {Form} from '@ui/forms/form';
import {Avatar} from '@ui/avatar/avatar';
import {Trans} from '@ui/i18n/trans';
import {StarSelector} from '@app/reviews/review-list/star-selector';
import {Button} from '@ui/buttons/button';
import {FormTextField} from '@ui/forms/input-field/text-field/text-field';
import {Reviewable} from '@app/reviews/reviewable';
import {toast} from '@ui/toast/toast';
import {message} from '@ui/i18n/message';
import clsx from 'clsx';
import {Review} from '@app/titles/models/review';

export interface NewReviewFormActions {
  openReviewPanel: () => void;
}

interface Props {
  reviewable: Reviewable;
  currentReview?: Review;
  className?: string;
  disabled?: boolean;
}
export const NewReviewForm = forwardRef<NewReviewFormActions, Props>(
  ({reviewable, currentReview, className, disabled}, ref) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const {user} = useAuth();
    const form = useForm<CreateReviewPayload>({
      defaultValues: {
        score: 8,
      },
    });

    useEffect(() => {
      if (currentReview) {
        form.setValue('title', currentReview.title);
        form.setValue('body', currentReview.body);
        form.setValue('score', currentReview.score);
      }
    }, [form, currentReview]);

    const openReviewPanel = useCallback(() => {
      setIsExpanded(true);
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        openReviewPanel,
      }),
      [openReviewPanel],
    );

    const createReview = useCreateReview(form);
    return (
      <Form
        className={clsx('rounded border bg-alt p-14', className)}
        form={form}
        onSubmit={newValues => {
          if (disabled) return;
          createReview.mutate(
            {
              ...newValues,
              reviewable,
            },
            {
              onSuccess: () => {
                toast(message('Review posted'));
                setIsExpanded(false);
              },
            },
          );
        }}
      >
        <div className="items-center gap-24 lg:flex">
          <Avatar size="xl" circle src={user?.image} label={user?.name} />
          <div className="flex-auto">
            <div className="mb-4 text-xs text-muted max-md:mt-10">
              <Trans
                message="Review as :name"
                values={{
                  name: <span className="font-medium text">{user?.name}</span>,
                }}
              />
            </div>
            <StarSelector
              readonly={disabled}
              className="-ml-8 max-lg:mb-12"
              count={10}
              value={disabled ? 0 : form.watch('score')}
              onValueChange={newScore => {
                form.setValue('score', newScore);
              }}
            />
          </div>
          {!isExpanded && (
            <Button
              variant="flat"
              color="primary"
              onClick={() => openReviewPanel()}
              disabled={!user || disabled}
            >
              {currentReview ? (
                <Trans message="Update review" />
              ) : (
                <Trans message="Add review" />
              )}
            </Button>
          )}
        </div>
        {isExpanded && (
          <div className="mt-24">
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
              name="body"
              label={<Trans message="Review" />}
              labelSuffix={<Trans message="100 character minimum" />}
              inputElementType="textarea"
              rows={5}
              minLength={100}
              required
            />
            <div className="mt-16 flex items-center justify-end gap-8">
              <Button
                variant="outline"
                className="min-w-100"
                onClick={() => {
                  setIsExpanded(false);
                  form.reset(currentReview);
                }}
              >
                <Trans message="Cancel" />
              </Button>
              <Button
                type="submit"
                variant="flat"
                color="primary"
                className="min-w-100"
                disabled={createReview.isPending}
              >
                <Trans message="Post" />
              </Button>
            </div>
          </div>
        )}
      </Form>
    );
  },
);
