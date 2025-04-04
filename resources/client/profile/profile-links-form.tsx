import {useFieldArray} from 'react-hook-form';
import {FormTextField} from '@ui/forms/input-field/text-field/text-field';
import {Trans} from '@ui/i18n/trans';
import {IconButton} from '@ui/buttons/icon-button';
import {CloseIcon} from '@ui/icons/material/Close';
import {Button} from '@ui/buttons/button';
import {AddIcon} from '@ui/icons/material/Add';
import React from 'react';
import {UserLink} from '@app/profile/user-link';

export function ProfileLinksForm() {
  const {fields, append, remove} = useFieldArray<{links: UserLink[]}>({
    name: 'links',
  });
  return (
    <div>
      {fields.map((field, index) => {
        return (
          <div key={field.id} className="mb-10 flex items-end gap-10">
            <FormTextField
              required
              type="url"
              label={<Trans message="URL" />}
              name={`links.${index}.url`}
              size="sm"
              className="flex-auto"
            />
            <FormTextField
              required
              label={<Trans message="Short title" />}
              name={`links.${index}.title`}
              size="sm"
              className="flex-auto"
            />
            <IconButton
              size="sm"
              color="primary"
              className="flex-shrink-0"
              onClick={() => {
                remove(index);
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        );
      })}
      <Button
        variant="text"
        color="primary"
        startIcon={<AddIcon />}
        size="xs"
        onClick={() => {
          append({url: '', title: ''});
        }}
      >
        <Trans message="Add another link" />
      </Button>
    </div>
  );
}
