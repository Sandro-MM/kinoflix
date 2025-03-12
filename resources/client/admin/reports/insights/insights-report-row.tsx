import {ReactNode} from 'react';

interface Props {
  children: ReactNode;
}
export function InsightsReportRow({children}: Props) {
  return (
    <div className="mb-12 flex flex-col gap-12 overflow-x-auto md:mb-18 md:gap-18 lg:flex-row lg:items-center">
      {children}
    </div>
  );
}
