import {TitleBackdrop} from '@app/titles/title-poster/title-backdrop';
import {DialogTrigger} from '@ui/overlays/dialog/dialog-trigger';
import {ImageZoomDialog} from '@ui/overlays/dialog/image-zoom-dialog';
import {Button} from '@ui/buttons/button';
import {Trans} from '@ui/i18n/trans';
import {IconButton} from '@ui/buttons/icon-button';
import {ZoomOutMapIcon} from '@ui/icons/material/ZoomOutMap';
import {useDeleteImage} from '@app/admin/titles/requests/use-delete-image';
import {FileUploadProvider} from '@common/uploads/uploader/file-upload-provider';
import {openUploadWindow} from '@ui/utils/files/open-upload-window';
import {useUploadImage} from '@app/admin/titles/requests/use-upload-image';
import {useOutletContext, useParams} from 'react-router';
import {AddIcon} from '@ui/icons/material/Add';
import {toast} from '@ui/toast/toast';
import {TitleEditorLayout} from '@app/admin/titles/title-editor/title-editor-layout';
import {Title} from '@app/titles/models/title';
import {IllustratedMessage} from '@ui/images/illustrated-message';
import React from 'react';
import {ImageIcon} from '@ui/icons/material/Image';
import {FileInputType} from '@ui/utils/files/file-input-config';
import {validateFile} from '@ui/utils/files/validate-file';

export function TitleImagesEditor() {
  const title = useOutletContext<Title>();
  return (
    <TitleEditorLayout>
      <FileUploadProvider>
        <UploadButton />
      </FileUploadProvider>
      <div className="mt-24 grid grid-cols-2 gap-24 md:grid-cols-3">
        {title.images.map((image, index) => (
          <div key={image.id}>
            <TitleBackdrop src={image.url} srcSize="md" className="rounded" />
            <div className="mt-6 flex items-center justify-between gap-14">
              <DeleteButton imageId={image.id} />
              <DialogTrigger type="modal">
                <IconButton variant="outline" size="xs">
                  <ZoomOutMapIcon />
                </IconButton>
                <ImageZoomDialog
                  images={title.images.map(img => img.url)}
                  defaultActiveIndex={index}
                />
              </DialogTrigger>
            </div>
          </div>
        ))}
      </div>
      {!title.images.length && <NoImagesMessage />}
    </TitleEditorLayout>
  );
}

function NoImagesMessage() {
  return (
    <IllustratedMessage
      className="mt-40"
      imageMargin="mb-8"
      image={
        <div className="text-muted">
          <ImageIcon size="xl" />
        </div>
      }
      imageHeight="h-auto"
      title={<Trans message="No images have been added yet" />}
    />
  );
}

const MAX_IMAGE_SIZE = 5000000;
function UploadButton() {
  const {titleId} = useParams();
  const uploadImage = useUploadImage();

  const selectAndUploadFile = async () => {
    const files = await openUploadWindow({
      types: [FileInputType.image],
    });
    const errorMessage = validateFile(files[0], {
      maxFileSize: MAX_IMAGE_SIZE,
    });
    if (errorMessage) {
      toast.danger(errorMessage);
      return;
    }

    uploadImage.mutate({
      file: files[0].native,
      titleId: titleId!,
    });
  };

  return (
    <Button
      variant="outline"
      color="primary"
      startIcon={<AddIcon />}
      disabled={uploadImage.isPending}
      onClick={() => selectAndUploadFile()}
    >
      <Trans message="Upload image" />
    </Button>
  );
}

interface ImageItemProps {
  imageId: number;
}
function DeleteButton({imageId}: ImageItemProps) {
  const deleteImage = useDeleteImage(imageId);
  return (
    <Button
      variant="outline"
      size="xs"
      disabled={deleteImage.isPending}
      onClick={() => deleteImage.mutate()}
    >
      <Trans message="Delete" />
    </Button>
  );
}
