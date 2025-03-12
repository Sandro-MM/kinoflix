import {Dialog} from '@ui/overlays/dialog/dialog';
import {DialogHeader} from '@ui/overlays/dialog/dialog-header';
import {Trans} from '@ui/i18n/trans';
import {DialogBody} from '@ui/overlays/dialog/dialog-body';
import {useForm} from 'react-hook-form';
import {Form} from '@ui/forms/form';
import {useDialogContext} from '@ui/overlays/dialog/dialog-context';
import {FormTextField} from '@ui/forms/input-field/text-field/text-field';
import {DialogFooter} from '@ui/overlays/dialog/dialog-footer';
import {Button} from '@ui/buttons/button';
import {
  ImportMediaItemPayload,
  useImportSingleFromTmdb,
} from '@app/admin/titles/requests/use-import-single-from-tmdb';
import {FormSelect, Option} from '@ui/forms/select/select';
import {TITLE_MODEL} from '@app/titles/models/title';
import {PERSON_MODEL} from '@app/titles/models/person';

interface ImportFromTmdbDialogProps {
  modelType: typeof TITLE_MODEL | typeof PERSON_MODEL;
}
export function ImportSingleFromTmdbDialog({
  modelType,
}: ImportFromTmdbDialogProps) {
  const form = useForm<ImportMediaItemPayload>({
    defaultValues: {
      media_type: modelType === TITLE_MODEL ? 'movie' : 'person',
    },
  });
  const {formId, close} = useDialogContext();
  const importItem = useImportSingleFromTmdb();
  return (
    <Dialog>
      <DialogHeader>
        <Trans message="Import from TheMovieDB" />
      </DialogHeader>
      <DialogBody>
        <Form
          id={formId}
          form={form}
          onSubmit={values => {
            importItem.mutate(values, {
              onSuccess: response => {
                close(response.mediaItem);
              },
            });
          }}
        >
          {modelType === TITLE_MODEL && (
            <FormSelect
              name="media_type"
              label={<Trans message="Type" />}
              className="mb-24"
              selectionMode="single"
            >
              <Option value="movie">
                <Trans message="Movie" />
              </Option>
              <Option value="series">
                <Trans message="Series" />
              </Option>
            </FormSelect>
          )}
          <FormTextField
            autoFocus
            required
            name="tmdb_id"
            min={1}
            type="number"
            label={<Trans message="TheMovieDB ID" />}
          />
        </Form>
      </DialogBody>
      <DialogFooter>
        <Button onClick={() => close()}>
          <Trans message="Cancel" />
        </Button>
        <Button
          form={formId}
          variant="flat"
          color="primary"
          type="submit"
          disabled={importItem.isPending}
        >
          <Trans message="Import" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
