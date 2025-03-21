import {Navbar} from '@common/ui/navigation/navbar/navbar';
import {SearchAutocomplete} from '@app/search/search-autocomplete';
import clsx from 'clsx';
import {IconButton} from '@ui/buttons/icon-button';
import {SearchIcon} from '@ui/icons/material/Search';
import {Link} from 'react-router';
import {Trans} from '@ui/i18n/trans';
import {Tooltip} from '@ui/tooltip/tooltip';

interface Props {
  position?: 'fixed' | 'relative';
}
export function MainNavbar({position = 'relative'}: Props) {
  return (
    <>
      <Navbar
      size="md"
      menuPosition="primary"
      className={'z-40 w-full flex-shrink-0 fixed top-0 pl-[80px]'}
      border="border-none"
      alwaysDarkMode
    >

      <Tooltip label={<Trans message="Search" />}>
        <IconButton elementType={Link} to="/search" className="md:hidden absolute left-[30px]">
          <SearchIcon />
        </IconButton>
      </Tooltip>
      <SearchAutocomplete className="max-md:hidden mx-auto w-full" />
    </Navbar>
    </>
  );
}
