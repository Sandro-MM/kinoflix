import {message} from '@ui/i18n/message';
import {Menu, MenuItem, MenuTrigger} from '@ui/menu/menu-trigger';
import {Button, ButtonProps} from '@ui/buttons/button';
import {SortIcon} from '@ui/icons/material/Sort';
import {Trans} from '@ui/i18n/trans';

const SortOptions = [
  {
    value: 'created_at:desc',
    label: message('Newest'),
  },
  {
    value: 'created_at:asc',
    label: message('Oldest'),
  },
  {
    value: 'mostHelpful',
    label: message('Most helpful'),
  },
  {
    value: 'reports_count:desc',
    label: message('Most reported'),
  },
];

interface Props {
  value: string;
  onValueChange: (newValue: string) => void;
  color?: ButtonProps['color'];
  showReportsItem?: boolean;
}
export function ReviewListSortButton({
  value,
  onValueChange,
  color,
  showReportsItem,
}: Props) {
  let selectedOption = SortOptions.find(option => option.value === value);
  if (!selectedOption) {
    selectedOption = SortOptions[0];
  }
  return (
    <MenuTrigger
      selectedValue={value}
      onSelectionChange={newValue => onValueChange(newValue as string)}
      selectionMode="single"
    >
      <Button variant="outline" startIcon={<SortIcon />} color={color}>
        <Trans {...selectedOption.label} />
      </Button>
      <Menu>
        {SortOptions.filter(
          option => option.value !== 'reports_count:desc' || showReportsItem,
        ).map(option => (
          <MenuItem value={option.value} key={option.value}>
            <Trans {...option.label} />
          </MenuItem>
        ))}
      </Menu>
    </MenuTrigger>
  );
}
