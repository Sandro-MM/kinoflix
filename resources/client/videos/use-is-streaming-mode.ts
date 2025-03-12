import {useSettings} from '@ui/settings/use-settings';

export function useIsStreamingMode() {
  const {streaming} = useSettings();
  return streaming?.prefer_full || false;
}
