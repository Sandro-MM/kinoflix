import React, {useMemo} from 'react';
import {
  BaseMediaLink,
  BaseMediaLinkProps,
  getBaseMediaLink,
} from '@app/base-media-link';
import {ProductionCountry} from '@app/titles/models/production-country';

interface Props extends Omit<BaseMediaLinkProps, 'link'> {
  country: ProductionCountry;
}
export function ProductionCountryLink({
  country,
  children,
  ...otherProps
}: Props) {
  const link = useMemo(() => getKeywordLink(country), [country]);
  return (
    <BaseMediaLink {...otherProps} link={link}>
      {children ?? (country.display_name || country.name)}
    </BaseMediaLink>
  );
}

export function getKeywordLink(
  country: ProductionCountry,
  {absolute}: {absolute?: boolean} = {}
): string {
  return getBaseMediaLink(`/production-countries/${country.name}`, {absolute});
}
