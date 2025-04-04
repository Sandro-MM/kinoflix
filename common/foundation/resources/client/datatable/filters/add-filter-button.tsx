import {Button, ButtonProps} from '@ui/buttons/button';
import {BackendFilter} from './backend-filter';
import {FilterAltIcon} from '@ui/icons/material/FilterAlt';
import {Trans} from '@ui/i18n/trans';
import {useIsMobileMediaQuery} from '@ui/utils/hooks/is-mobile-media-query';
import {IconButton} from '@ui/buttons/icon-button';
import {DialogTrigger} from '@ui/overlays/dialog/dialog-trigger';
import {AddFilterDialog} from './add-filter-dialog';
import {ReactElement} from 'react';

interface AddFilterButtonProps {
  filters: BackendFilter[];
  icon?: ReactElement;
  color?: ButtonProps['color'];
  variant?: ButtonProps['variant'];
  disabled?: boolean;
  size?: ButtonProps['size'];
  className?: string;
  modalType?: 'component' | 'modal' | 'popover' | 'tray'
}
export function AddFilterButton({
  filters,
  icon = <FilterAltIcon />,
  color = 'primary',
  variant = 'flat',
  size = 'md',
  disabled,
  className,
  modalType = 'component',
}: AddFilterButtonProps) {
  const isMobile = useIsMobileMediaQuery();

  const desktopButton = (
    <Button
      variant={variant}
      color={color}
      startIcon={icon}
      disabled={disabled}
      size={size}
      className={`${className} w-full`}
    >
      <Trans message="Filter" />
    </Button>
  );

  const mobileButton = (
    <IconButton
      color={color}
      size="sm"
      variant={variant}
      disabled={disabled}
      className={className}
    >
      {icon}
    </IconButton>
  );

  return (
    isMobile ? (
      <DialogTrigger type="popover">
        {desktopButton}
        <AddFilterDialog filters={filters} />
      </DialogTrigger>
    ) : (
      <div className="w-full">
        <DialogTrigger type={modalType} alwaysVisible>
          <AddFilterDialog filters={filters} />
        </DialogTrigger>
      </div>
    )
  );
}
