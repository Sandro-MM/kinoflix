import {DialogTrigger} from '@ui/overlays/dialog/dialog-trigger';
import {Button} from '@ui/buttons/button';
import {AddIcon} from '@ui/icons/material/Add';
import {Trans} from '@ui/i18n/trans';
import {AddCreditDialog} from '@app/admin/titles/title-editor/credits-editor/add-credit-dialog';
import {TextField} from '@ui/forms/input-field/text-field/text-field';
import {UseInfiniteDataResult} from '@common/ui/infinite-scroll/use-infinite-data';
import {TitleCredit} from '@app/titles/models/title';
import {SearchIcon} from '@ui/icons/material/Search';
import {useTrans} from '@ui/i18n/use-trans';
import {message} from '@ui/i18n/message';

interface Props {
  query: UseInfiniteDataResult<TitleCredit>;
  isCrew: boolean;
}
export function TitleCreditsTableHeader({query, isCrew}: Props) {
  const {trans} = useTrans();
  return (
    <div className="mb-14 flex items-center justify-between gap-24">
      <DialogTrigger type="modal">
        <Button variant="outline" color="primary" startIcon={<AddIcon />}>
          <Trans message="Add credit" />
        </Button>
        <AddCreditDialog isCrew={isCrew} />
      </DialogTrigger>
      <TextField
        size="sm"
        value={query.searchQuery}
        onChange={e => query.setSearchQuery(e.target.value)}
        placeholder={trans(message('Search'))}
        startAdornment={<SearchIcon />}
      />
    </div>
  );
}
