import {Trans} from '@ui/i18n/trans';
import React, {Fragment, ReactNode, useRef, useState} from 'react';
import {DragPreviewRenderer} from '@ui/interactions/dnd/use-draggable';
import {useFormContext} from 'react-hook-form';
import {moveItemInNewArray} from '@ui/utils/array/move-item-in-new-array';
import {IconButton} from '@ui/buttons/icon-button';
import {DragHandleIcon} from '@ui/icons/material/DragHandle';
import {Checkbox} from '@ui/forms/toggle/checkbox';
import {DragPreview} from '@ui/interactions/dnd/drag-preview';
import clsx from 'clsx';
import {TitlePageSections} from '@app/titles/pages/title-page/sections/title-page-sections';
import {MessageDescriptor} from '@ui/i18n/message-descriptor';
import {AdminSettings} from '@common/admin/settings/admin-settings';
import {useSortable} from '@ui/interactions/dnd/sortable/use-sortable';
import {AdminSettingsWithFiles} from '@common/admin/settings/requests/use-update-admin-settings';

interface SectionItem {
  name: (typeof TitlePageSections)[number];
  title: MessageDescriptor;
}

const defaultItems: SectionItem[] = [
  {name: 'episodes', title: {message: 'Episode grid'}},
  {name: 'seasons', title: {message: 'Season grid'}},
  {name: 'videos', title: {message: 'Video grid'}},
  {name: 'images', title: {message: 'Image grid'}},
  {name: 'reviews', title: {message: 'Reviews'}},
  {name: 'cast', title: {message: 'Cast grid'}},
  {name: 'related', title: {message: 'Related titles'}},
];

export function ContentSettingsTitlePagePanel() {
  const {getValues, setValue} = useFormContext<AdminSettings>();
  const getSavedValue = (): string[] => {
    return getValues('client.title_page.sections') || [];
  };

  const [items, setItems] = useState(() => {
    const savedValue = getSavedValue();
    const sortFn = (x: string) =>
      savedValue.includes(x) ? savedValue.indexOf(x) : savedValue.length;
    return [...defaultItems].sort((a, b) => sortFn(a.name) - sortFn(b.name));
  });

  return (
    <div>
      <div className="mb-14 text-sm">
        <Trans message="Title page sections" />
        <div className="text-xs text-muted">
          <Trans message="Select which sections should appear on title page and in which order." />
        </div>
      </div>
      {items.map((section, index) => (
        <ListItemLayout
          items={items}
          isFirst={index === 0}
          key={section.name}
          section={section}
          title={<Trans {...section.title} />}
          onToggle={(section, checked) => {
            const savedValue = getSavedValue();
            const newValue = checked
              ? [...savedValue, section.name]
              : savedValue.filter(x => x !== section.name);
            setValue('client.title_page.sections', newValue as any, {
              shouldDirty: true,
            });
          }}
          onSortEnd={(oldIndex, newIndex) => {
            const sortedItems = moveItemInNewArray(items, oldIndex, newIndex);
            setItems(sortedItems);
            const savedValue = getSavedValue();
            const newValue = sortedItems
              .filter(x => savedValue.includes(x.name))
              .map(x => x.name);
            setValue('client.title_page.sections', newValue, {
              shouldDirty: true,
            });
          }}
        />
      ))}
    </div>
  );
}

interface ListItemLayoutProps {
  isFirst: boolean;
  items: SectionItem[];
  section: SectionItem;
  title: ReactNode;
  onSortEnd: (oldIndex: number, newIndex: number) => void;
  onToggle: (section: SectionItem, checked: boolean) => void;
}
function ListItemLayout({
  isFirst,
  title,
  items,
  section,
  onSortEnd,
  onToggle,
}: ListItemLayoutProps) {
  const ref = useRef<HTMLDivElement>(null);
  const previewRef = useRef<DragPreviewRenderer>(null);
  const {watch} = useFormContext<AdminSettingsWithFiles>();

  const savedValue = watch('client.title_page.sections') || [];
  const isChecked = savedValue.includes(section.name);

  const {sortableProps, dragHandleRef} = useSortable({
    ref,
    item: section,
    items,
    type: 'titlePageSections',
    preview: previewRef,
    strategy: 'line',
    onSortEnd,
  });

  return (
    <Fragment>
      <div
        className={clsx(
          'flex w-full items-center gap-8 border-b py-6',
          isFirst && 'border-t border-t-transparent',
        )}
        ref={ref}
        {...sortableProps}
      >
        <IconButton ref={dragHandleRef}>
          <DragHandleIcon />
        </IconButton>
        <div className="flex-auto">
          <div className="text-sm">{title}</div>
        </div>
        <Checkbox
          checked={isChecked}
          onChange={() => {
            onToggle(section, !isChecked);
          }}
        />
      </div>
      <TabDragPreview title={title} ref={previewRef} />
    </Fragment>
  );
}

interface DragPreviewProps {
  title: ReactNode;
}
const TabDragPreview = React.forwardRef<DragPreviewRenderer, DragPreviewProps>(
  ({title}, ref) => {
    return (
      <DragPreview ref={ref}>
        {() => (
          <div className="rounded bg-chip p-8 text-sm shadow">{title}</div>
        )}
      </DragPreview>
    );
  },
);
