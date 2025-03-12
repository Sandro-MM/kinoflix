import React, {Fragment} from 'react';
import {FormTextField} from '@ui/forms/input-field/text-field/text-field';
import {Trans} from '@ui/i18n/trans';
import {useTrans} from '@ui/i18n/use-trans';
import {message} from '@ui/i18n/message';

export function ChannelSeoFields() {
  const {trans} = useTrans();
  return (
    <Fragment>
      <FormTextField
        name="config.seoTitle"
        label={<Trans message="SEO title" />}
        className="mb-24"
        placeholder={trans(message('Optional'))}
      />
      <FormTextField
        name="config.seoDescription"
        label={<Trans message="SEO description" />}
        inputElementType="textarea"
        rows={6}
        placeholder={trans(message('Optional'))}
      />
    </Fragment>
  );
}
