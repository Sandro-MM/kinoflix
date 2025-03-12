import {TitleCredit} from '@app/titles/models/title';
import {Trans} from '@ui/i18n/trans';
import {SiteSectionHeading} from '@app/titles/site-section-heading';
import {Button} from '@ui/buttons/button';
import {Link} from 'react-router';
import {ArrowForwardIcon} from '@ui/icons/material/ArrowForward';
import {TitleCreditsGrid} from '@app/titles/pages/title-page/title-credits-grid/title-credits-grid';

interface Props {
  credits: TitleCredit[] | undefined;
}
export function TitlePageCast({credits = []}: Props) {
  const cast = credits.filter(credit => credit.pivot.department === 'actors');
  return (
    <div className="mt-48">
      <SiteSectionHeading>
        <Trans message="Cast" />
      </SiteSectionHeading>
      <TitleCreditsGrid credits={cast} />
      <Button
        className="mt-24"
        variant="outline"
        color="primary"
        elementType={Link}
        to="full-credits"
        endIcon={<ArrowForwardIcon />}
      >
        <Trans message="All cast and crew" />
      </Button>
    </div>
  );
}
