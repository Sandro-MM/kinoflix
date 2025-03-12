import {useForm} from 'react-hook-form';
import {CreatePersonPayload} from '@app/admin/people/requests/use-create-person';
import {CrupdateResourceLayout} from '@common/admin/crupdate-resource-layout';
import {Trans} from '@ui/i18n/trans';
import React, {Fragment} from 'react';
import {FileUploadProvider} from '@common/uploads/uploader/file-upload-provider';
import {useNavigate} from '@common/ui/navigation/use-navigate';
import {useUpdatePerson} from '@app/admin/people/requests/use-update-person';
import {GetPersonResponse, usePerson} from '@app/people/requests/use-person';
import {PageMetaTags} from '@common/http/page-meta-tags';
import {PageStatus} from '@common/http/page-status';
import {Tabs} from '@ui/tabs/tabs';
import {TabList} from '@ui/tabs/tab-list';
import {Tab} from '@ui/tabs/tab';
import {Link, Outlet, useLocation} from 'react-router';

export function UpdatePersonPage() {
  const query = usePerson('editPersonPage');

  return query.data ? (
    <Fragment>
      <PageMetaTags query={query} />
      <PageContent data={query.data} />
    </Fragment>
  ) : (
    <div className="relative h-full w-full">
      <PageStatus query={query} loaderClassName="absolute inset-0 m-auto" />
    </div>
  );
}

interface PageContentProps {
  data: GetPersonResponse;
}
function PageContent({data}: PageContentProps) {
  const {person} = data;
  const navigate = useNavigate();

  const form = useForm<CreatePersonPayload>({
    defaultValues: {
      name: person.name,
      known_for: person.known_for,
      poster: person.poster,
      birth_date: person.birth_date,
      death_date: person.death_date,
      birth_place: person.birth_place,
      description: person.description,
      gender: person.gender,
      popularity: person.popularity,
    },
  });
  const updatePersonPage = useUpdatePerson(form);

  const {pathname} = useLocation();
  const tabName = pathname.split('/').pop();
  const selectedTab = tabName === 'credits' ? 1 : 0;

  return (
    <CrupdateResourceLayout
      onSubmit={values =>
        updatePersonPage.mutate(values, {
          onSuccess: () => {
            navigate('../../../', {relative: 'path', replace: true});
          },
        })
      }
      form={form}
      title={<Trans values={{name: person.name}} message="Edit “:name“" />}
      isLoading={updatePersonPage.isPending}
      disableSaveWhenNotDirty
    >
      <Tabs selectedTab={selectedTab}>
        <TabList>
          <Tab elementType={Link} to={`primary-facts`} replace>
            <Trans message="Primary facts" />
          </Tab>
          <Tab elementType={Link} to={`credits`} replace>
            <Trans message="Credits" />
          </Tab>
        </TabList>
        <div className="min-h-512 pt-24">
          <FileUploadProvider>
            <Outlet context={data} />
          </FileUploadProvider>
        </div>
      </Tabs>
    </CrupdateResourceLayout>
  );
}
