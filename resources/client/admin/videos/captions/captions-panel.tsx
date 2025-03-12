import {useFieldArray, useFormContext} from 'react-hook-form';
import {CreateVideoPayload} from '@app/admin/videos/requests/use-create-video';
import {Trans} from '@ui/i18n/trans';
import {DialogTrigger} from '@ui/overlays/dialog/dialog-trigger';
import {Button} from '@ui/buttons/button';
import {AddIcon} from '@ui/icons/material/Add';
import {CrupdateCaptionDialog} from '@app/admin/videos/crupdate/crupdate-caption-dialog';
import {IllustratedMessage} from '@ui/images/illustrated-message';
import {SubtitlesIcon} from '@ui/icons/material/Subtitles';
import {IconButton} from '@ui/buttons/icon-button';
import {DragHandleIcon} from '@ui/icons/material/DragHandle';
import {Tooltip} from '@ui/tooltip/tooltip';
import {CloseIcon} from '@ui/icons/material/Close';
import React, {useRef} from 'react';
import {DragPreviewRenderer} from '@ui/interactions/dnd/use-draggable';
import {DragPreview} from '@ui/interactions/dnd/drag-preview';
import {Video, VideoCaption} from '@app/titles/models/video';
import {SettingsIcon} from '@ui/icons/material/Settings';
import {useSortable} from '@ui/interactions/dnd/sortable/use-sortable';
import {useIsTouchDevice} from '@ui/utils/hooks/is-touch-device';

export function CaptionsPanel() {
  const {watch} = useFormContext<CreateVideoPayload>();
  const {fields, append, remove, swap, update} = useFieldArray<
    CreateVideoPayload,
    'captions',
    'key'
  >({
    name: 'captions',
    keyName: 'key',
  });
  const sourceType = watch('type');
  const supportsCaptions = sourceType === 'video';

  return (
    <div className="mt-24">
      <div className="flex items-center justify-between gap-24">
        <div className="text-xl font-medium">
          <Trans message="Captions" />
        </div>
        <DialogTrigger
          type="modal"
          onClose={values => {
            if (values) {
              append(values);
            }
          }}
        >
          <Button
            variant="outline"
            startIcon={<AddIcon />}
            size="xs"
            disabled={!supportsCaptions}
          >
            <Trans message="Add caption" />
          </Button>
          <CrupdateCaptionDialog />
        </DialogTrigger>
      </div>
      <div className="mt-24">
        {!supportsCaptions || !fields?.length ? (
          <IllustratedMessage
            size="sm"
            image={<SubtitlesIcon />}
            imageHeight="h-24"
            imageMargin="mb-12"
            title={<NoCaptionsMessage sourceType={sourceType} />}
          />
        ) : null}
        {supportsCaptions &&
          fields.map((caption, index) => (
            <CaptionItem
              key={caption.key}
              caption={caption}
              captions={fields}
              onSort={(oldIndex, newIndex) => swap(oldIndex, newIndex)}
              onRemove={() => remove(index)}
              onUpdate={values => update(index, values)}
            />
          ))}
      </div>
    </div>
  );
}

interface CaptionItemProps {
  caption: VideoCaption;
  captions: VideoCaption[];
  onSort: (oldIndex: number, newIndex: number) => void;
  onRemove: () => void;
  onUpdate: (caption: VideoCaption) => void;
}
function CaptionItem({
  caption,
  captions,
  onSort,
  onRemove,
  onUpdate,
}: CaptionItemProps) {
  const domRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<DragPreviewRenderer>(null);
  const isTouchDevice = useIsTouchDevice();

  const {sortableProps, dragHandleRef} = useSortable({
    ref: domRef,
    disabled: isTouchDevice ?? false,
    item: caption,
    items: captions,
    type: 'captionItem',
    preview: previewRef,
    strategy: 'line',
    onSortEnd: (oldIndex, newIndex) => onSort(oldIndex, newIndex),
  });

  return (
    <div
      className="mb-6 flex items-center border-b border-t border-transparent"
      ref={domRef}
      {...sortableProps}
    >
      <IconButton ref={dragHandleRef} aria-label="Sort captions">
        <DragHandleIcon />
      </IconButton>
      <div className="ml-12 capitalize">{caption.name}</div>
      <div className="ml-auto mr-12 rounded border px-8 py-4 text-xs uppercase">
        {caption.language}
      </div>
      <DialogTrigger
        type="modal"
        onClose={values => {
          if (values) {
            onUpdate(values);
          }
        }}
      >
        <Tooltip label={<Trans message="Edit" />}>
          <IconButton onClick={() => onRemove()} className="text-muted">
            <SettingsIcon />
          </IconButton>
        </Tooltip>
        <CrupdateCaptionDialog caption={caption} />
      </DialogTrigger>
      <Tooltip label={<Trans message="Remove" />}>
        <IconButton onClick={() => onRemove()} className="text-danger">
          <CloseIcon />
        </IconButton>
      </Tooltip>
      <CaptionItemDragPreview caption={caption} ref={previewRef} />
    </div>
  );
}

interface CaptionItemDragPreviewProps {
  caption: VideoCaption;
}
const CaptionItemDragPreview = React.forwardRef<
  DragPreviewRenderer,
  CaptionItemDragPreviewProps
>(({caption}, ref) => {
  return (
    <DragPreview ref={ref}>
      {() => (
        <div className="rounded bg-background p-8 text-base shadow">
          {caption.name}
        </div>
      )}
    </DragPreview>
  );
});

interface NoCaptionsMessageProps {
  sourceType: Video['type'];
}
function NoCaptionsMessage({sourceType}: NoCaptionsMessageProps) {
  switch (sourceType) {
    case 'video':
      return <Trans message="No captions have been added to this video yet." />;
    case 'stream':
      return (
        <Trans message="Captions (if available) are embedded within the stream itself." />
      );
    default:
      return <Trans message="This source type does not support captions." />;
  }
}
