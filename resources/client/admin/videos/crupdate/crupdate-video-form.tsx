import React, {useState} from 'react';
import {useFormContext, UseFormReturn} from 'react-hook-form';
import {FileUploadProvider} from '@common/uploads/uploader/file-upload-provider';
import {FormTextField} from '@ui/forms/input-field/text-field/text-field';
import {Trans} from '@ui/i18n/trans';
import {TitleSelect} from '@app/titles/title-select';
import {FormImageSelector} from '@common/uploads/components/image-selector';
import {FormSelect, Option} from '@ui/forms/select/select';
import {useSettings} from '@ui/settings/use-settings';
import {useTrans} from '@ui/i18n/use-trans';
import {useValueLists} from '@common/http/value-lists';
import {message} from '@ui/i18n/message';
import {CreateVideoPayload} from '@app/admin/videos/requests/use-create-video';
import {InfoDialogTriggerIcon} from '@ui/overlays/dialog/info-dialog-trigger/info-dialog-trigger-icon';
import {Video} from '@app/titles/models/video';
import {VideoPlayerSkeleton} from '@app/videos/video-player-skeleton';
import {SiteVideoPlayer} from '@app/videos/site-video-player';
import {CaptionsPanel} from '@app/admin/videos/captions/captions-panel';
import {RadioGroup} from '@ui/forms/radio-group/radio-group';
import {Radio} from '@ui/forms/radio-group/radio';
import {FormFileEntryField} from '@common/uploads/components/file-entry-field';
import {Disk} from '@common/uploads/uploader/backend-metadata';

interface Props {
  form: UseFormReturn<CreateVideoPayload>;
  video?: Video;
}
export function CrupdateVideoForm({form, video}: Props) {
  return (
    <div className="flex items-start gap-54">
      <div className="flex-auto">
        <VideoPreview video={video} />
        <ReloadMessage form={form} />
        <CaptionsPanel />
      </div>
      <div className="w-440 flex-shrink-0">
        <VideoForm />
      </div>
    </div>
  );
}

function ReloadMessage({form}: Props) {
  const dirty = form.formState.dirtyFields;
  if (!dirty.src && !dirty.thumbnail) return null;

  return (
    <div className="mt-12 flex items-center gap-6 text-sm text-muted">
      <InfoDialogTriggerIcon
        size="xs"
        className="text-muted"
        viewBox="0 0 16 16"
      />
      <Trans message="Save your changes to reload video preview." />
    </div>
  );
}

interface VideoPreviewProps {
  video?: Video;
}
function VideoPreview({video}: VideoPreviewProps) {
  if (!video || !video.src) {
    return <VideoPlayerSkeleton animate={false} />;
  }
  // timestamp will force reload of player when video is updated
  return (
    <SiteVideoPlayer
      video={video}
      mediaItemId={`${video.id}-${video.updated_at}`}
    />
  );
}

function VideoForm() {
  return (
    <FileUploadProvider>
      <FormTextField
        name="name"
        label={<Trans message="Name" />}
        className="mb-24"
        required
      />
      <TitleSelect
        name="title_id"
        seasonName="season_num"
        episodeName="episode_num"
        className="mb-24"
      />
      <FormImageSelector
        name="thumbnail"
        label={<Trans message="Thumbnail" />}
        diskPrefix="video-thumbnails"
        className="mb-24"
      />
      <SourceTypeSelect />
      <SourceField />
      <QualitySelect />
      <LanguageSelect />
      <ContentTypeSelect />
    </FileUploadProvider>
  );
}

function SourceTypeSelect() {
  const {setValue} = useFormContext<CreateVideoPayload>();
  return (
    <FormSelect
      name="type"
      selectionMode="single"
      label={<Trans message="Source type" />}
      className="mb-24"
      onSelectionChange={() => setValue('src', '')}
    >
      <Option
        value="embed"
        description={
          <Trans message="Embed video hosted on another site. Youtube, vimeo etc." />
        }
      >
        <Trans message="Embed" />
      </Option>
      <Option
        value="video"
        description={
          <Trans message="Upload a video file or enter a url to direct video (.mp4, .webm, .avi, .mov etc.) hosted online." />
        }
      >
        <Trans message="Direct" />
      </Option>
      <Option
        value="stream"
        description={<Trans message="Enter a url to HLS or DASH stream." />}
      >
        <Trans message="Adaptive stream" />
      </Option>
      <Option
        value="external"
        description={
          <Trans message="Enter any url. User will be redirected to this url after clicking the video." />
        }
      >
        <Trans message="Basic url" />
      </Option>
    </FormSelect>
  );
}

function SourceField() {
  const {watch} = useFormContext<CreateVideoPayload>();
  const isEmbed = watch('type') === 'embed';
  const isUrl = watch('type') === 'external';
  const canUpload = watch('type') === 'video';
  const {trans} = useTrans();

  if (canUpload) {
    return <DirectSourceField />;
  }

  return (
    <FormTextField
      required
      name="src"
      label={<Trans message="Source" />}
      className="mb-24"
      type={isUrl ? 'url' : undefined}
      placeholder={
        isEmbed
          ? trans(message('Full embed code snippet or just src url'))
          : undefined
      }
      inputElementType={isEmbed ? 'textarea' : 'input'}
      rows={4}
    />
  );
}

function DirectSourceField() {
  const form = useFormContext<CreateVideoPayload>();
  const [type, setType] = useState<'url' | 'file'>(() => {
    const src = form.getValues('src');
    return src.includes('api/v1/file-entries') ||
      src.includes('storage/title-videos')
      ? 'file'
      : 'url';
  });
  return (
    <div className="mb-24">
      <RadioGroup size="sm" className="mb-8" name="direct-type">
        <Radio
          value="url"
          checked={type === 'url'}
          onChange={e => setType(e.target.value as any)}
        >
          <Trans message="Url" />
        </Radio>
        <Radio
          value="file"
          checked={type === 'file'}
          onChange={e => setType(e.target.value as any)}
        >
          <Trans message="File" />
        </Radio>
      </RadioGroup>
      {type === 'file' ? (
        <FormFileEntryField
          required
          name="src"
          disk={Disk.public}
          diskPrefix="title-videos"
          label={<Trans message="Source" />}
        />
      ) : (
        <FormTextField
          name="src"
          label={<Trans message="source" />}
          inputElementType="textarea"
          rows={2}
          required
          type="url"
        />
      )}
    </div>
  );
}

function QualitySelect() {
  const {streaming} = useSettings();
  const qualities = streaming?.qualities || [];
  return (
    <FormSelect
      name="quality"
      selectionMode="single"
      label={<Trans message="Quality" />}
      className="mb-24"
    >
      {qualities.map((quality: string) => (
        <Option value={quality.toLowerCase()} key={quality} capitalizeFirst>
          <Trans message={quality} />
        </Option>
      ))}
    </FormSelect>
  );
}

function LanguageSelect() {
  const {trans} = useTrans();
  const query = useValueLists(['languages']);
  return (
    <FormSelect
      name="language"
      selectionMode="single"
      showSearchField
      searchPlaceholder={trans(message('Search languages'))}
      label={<Trans message="Language" />}
      className="mb-24"
    >
      {query.data?.languages?.map(language => (
        <Option value={language.code} key={language.code} capitalizeFirst>
          <Trans message={language.name} />
        </Option>
      ))}
    </FormSelect>
  );
}

function ContentTypeSelect() {
  return (
    <FormSelect
      name="category"
      selectionMode="single"
      label={<Trans message="Content type" />}
      className="mb-24"
    >
      <Option value="trailer">
        <Trans message="Trailer" />
      </Option>
      <Option value="clip">
        <Trans message="Clip" />
      </Option>
      <Option value="featurette">
        <Trans message="Featurette" />
      </Option>
      <Option value="teaser">
        <Trans message="Teaser" />
      </Option>
      <Option value="full">
        <Trans message="Full Movie or Episode" />
      </Option>
    </FormSelect>
  );
}
