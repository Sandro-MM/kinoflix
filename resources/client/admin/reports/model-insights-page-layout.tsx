import React, {
  cloneElement,
  Fragment,
  ReactElement,
  ReactNode,
  useState,
} from 'react';
import {DateRangeValue} from '@ui/forms/input-field/date/date-range-picker/date-range-value';
import {DateRangePresets} from '@ui/forms/input-field/date/date-range-picker/dialog/date-range-presets';
import {ReportDateSelector} from '@common/admin/analytics/report-date-selector';
import {Trans} from '@ui/i18n/trans';
import {InsightsChartsContext} from '@app/admin/reports/insights/insights-charts-context';
import {IconButton} from '@ui/buttons/icon-button';
import {ArrowBackIcon} from '@ui/icons/material/ArrowBack';
import {Link} from 'react-router';
import {StaticPageTitle} from '@common/seo/static-page-title';

interface Props {
  children: ReactNode;
  reportModel: string;
  name: string;
  backLink?: string;
  title?: ReactElement;
}
export function ModelInsightsPageLayout({
  children,
  reportModel,
  title,
  name,
  backLink,
}: Props) {
  const [dateRange, setDateRange] = useState<DateRangeValue>(() => {
    // This week
    return DateRangePresets[2].getRangeValue();
  });
  return (
    <Fragment>
      <StaticPageTitle>
        <Trans message=":name insights" values={{name}} />
      </StaticPageTitle>
      <div className="flex h-full flex-col">
        <div className="relative flex-auto bg-cover">
          <div className="mx-auto flex min-h-full max-w-[1600px] flex-col overflow-x-hidden p-12 md:p-24">
            <div className="flex-auto">
              <div className="mb-38 mt-14 h-48 items-center gap-12 md:flex">
                <IconButton
                  elementType={Link}
                  to={backLink || '../../'}
                  relative="path"
                  className="text-muted"
                >
                  <ArrowBackIcon />
                </IconButton>
                {title}
                <div className="ml-auto flex flex-shrink-0 items-center justify-between gap-10 md:gap-24">
                  <ReportDateSelector
                    value={dateRange}
                    onChange={setDateRange}
                  />
                </div>
              </div>
              <div className="chart-grid">
                <InsightsChartsContext.Provider
                  value={{dateRange, model: reportModel}}
                >
                  {children}
                </InsightsChartsContext.Provider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

interface ModelInsightsPageTitleProps {
  image: ReactElement<{size: string; className: string}>;
  name: ReactElement;
  description?: ReactElement;
}
export function ModelInsightsPageTitle({
  image,
  name,
  description,
}: ModelInsightsPageTitleProps) {
  return (
    <div className="flex items-center gap-10">
      {cloneElement(image, {size: 'w-48 h-48', className: 'rounded'})}
      <div>
        <h1 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-base">
          “{name}“ <Trans message="insights" />
        </h1>
        {description && <div className="text-sm text-muted">{description}</div>}
      </div>
    </div>
  );
}
