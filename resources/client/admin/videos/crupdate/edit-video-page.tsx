import {useForm} from 'react-hook-form';
import {Trans} from '@ui/i18n/trans';
import React, {useEffect} from 'react';
import {message} from '@ui/i18n/message';
import {CrupdateResourceLayout} from '@common/admin/crupdate-resource-layout';
import {CreateVideoPayload} from '@app/admin/videos/requests/use-create-video';
import {toast} from '@ui/toast/toast';
import {CrupdateVideoForm} from '@app/admin/videos/crupdate/crupdate-video-form';
import {useUpdateVideo} from '@app/admin/videos/requests/use-update-video';
import {useVideo} from '@app/admin/videos/requests/use-video';
import {FullPageLoader} from '@ui/progress/full-page-loader';
import {IconButton} from '@ui/buttons/icon-button';
import {OpenInNewIcon} from '@ui/icons/material/OpenInNew';
import {getWatchLink} from '@app/videos/watch-page/get-watch-link';
import {Link, useParams} from 'react-router';
import {useNavigate} from '@common/ui/navigation/use-navigate';
import {ArrowBackIcon} from '@ui/icons/material/ArrowBack';

export function EditVideoPage() {
  const {titleId} = useParams();
  const navigate = useNavigate();
  const form = useForm<CreateVideoPayload>();
  const query = useVideo();
  const video = query.data?.video;
  const updateVideo = useUpdateVideo(form);
  const link = video ? getWatchLink(video) : video;

  useEffect(() => {
    if (video && !form.getValues().name) {
      form.reset({
        name: video.name,
        title_id: video.title_id,
        season_num: video.season_num,
        episode_num: video.episode_num,
        thumbnail: video.thumbnail,
        type: video.type,
        src: video.src,
        quality: video.quality,
        language: video.language,
        category: video.category,
        captions:
          video.captions?.map(caption => ({
            id: caption.id,
            name: caption.name,
            url: caption.url,
            language: caption.language,
          })) || [],
      });
    }
  }, [video, form]);

  return (
    <CrupdateResourceLayout
      onSubmit={values => {
        updateVideo.mutate(values, {
          onSuccess: () => {
            form.reset(values);
            toast(message('Video updated'));
            if (titleId) {
              navigate(`../../`, {
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
            to="../../"
            relative="path"
          >
            <ArrowBackIcon />
          </IconButton>
        ) : undefined
      }
      form={form}
      title={
        video ? (
          <Trans values={{name: video.name}} message="Edit “:name“" />
        ) : (
          <Trans message="Edit video" />
        )
      }
      actions={
        link ? (
          <IconButton size="sm" elementType={Link} to={link} target="_blank">
            <OpenInNewIcon />
          </IconButton>
        ) : null
      }
      isLoading={query.isLoading || updateVideo.isPending}
      disableSaveWhenNotDirty
    >
      {query.isLoading ? (
        <FullPageLoader />
      ) : (
        <CrupdateVideoForm form={form} video={video} />
      )}
    </CrupdateResourceLayout>
  );
}
