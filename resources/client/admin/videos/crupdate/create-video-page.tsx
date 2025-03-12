import {useForm} from 'react-hook-form';
import {Trans} from '@ui/i18n/trans';
import React, {ReactNode} from 'react';
import {message} from '@ui/i18n/message';
import {CrupdateResourceLayout} from '@common/admin/crupdate-resource-layout';
import {
  CreateVideoPayload,
  useCreateVideo,
} from '@app/admin/videos/requests/use-create-video';
import {useNavigate} from '@common/ui/navigation/use-navigate';
import {toast} from '@ui/toast/toast';
import {CrupdateVideoForm} from '@app/admin/videos/crupdate/crupdate-video-form';
import {Link, useParams} from 'react-router';
import {IconButton} from '@ui/buttons/icon-button';
import {ArrowBackIcon} from '@ui/icons/material/ArrowBack';

interface Props {
  children?: ReactNode;
}
export function CreateVideoPage({children}: Props) {
  const {titleId, season, episode} = useParams();
  const navigate = useNavigate();
  const form = useForm<CreateVideoPayload>({
    defaultValues: {
      quality: 'regular',
      language: 'en',
      category: 'trailer',
      type: 'embed',
      title_id: titleId ? Number(titleId) : undefined,
      season_num: season ? Number(season) : undefined,
      episode_num: episode ? Number(episode) : undefined,
    },
  });
  const createVideo = useCreateVideo(form);

  return (
    <CrupdateResourceLayout
      onSubmit={values => {
        createVideo.mutate(values, {
          onSuccess: response => {
            toast(message('Video created'));
            if (titleId) {
              navigate(`../`, {
                relative: 'path',
              });
            } else {
              navigate(`../${response.video.id}/edit`, {
                relative: 'path',
              });
            }
          },
        });
      }}
      backButton={
        titleId ? (
          <IconButton
            className="text-muted"
            elementType={Link}
            to="../"
            relative="path"
          >
            <ArrowBackIcon />
          </IconButton>
        ) : undefined
      }
      form={form}
      title={<Trans message="New video" />}
      isLoading={createVideo.isPending}
      disableSaveWhenNotDirty
    >
      {children}
      <CrupdateVideoForm form={form} />
    </CrupdateResourceLayout>
  );
}
