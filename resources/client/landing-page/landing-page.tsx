import clsx from 'clsx';
import {LandingPageContent} from './landing-page-content';
import {Button, ButtonProps} from '@ui/buttons/button';
import {Footer} from '@common/ui/footer/footer';
import {Trans} from '@ui/i18n/trans';
import {Link} from 'react-router';
import {createSvgIconFromTree} from '@ui/icons/create-svg-icon';
import {MenuItemConfig} from '@common/menus/menu-config';
import React, {Fragment, useState} from 'react';
import {DefaultMetaTags} from '@common/seo/default-meta-tags';
import {useSettings} from '@ui/settings/use-settings';
import {PricingTable} from '@common/billing/pricing-table/pricing-table';
import {BillingCycleRadio} from '@common/billing/pricing-table/billing-cycle-radio';
import {UpsellBillingCycle} from '@common/billing/pricing-table/find-best-price';
import {useProducts} from '@common/billing/pricing-table/use-products';
import {LandingPageTrendingTitles} from '@app/landing-page/landing-page-trending-titles';
import {Navbar} from '@common/ui/navigation/navbar/navbar';
import {MixedImage} from '@ui/images/mixed-image';

interface ContentProps {
  content: LandingPageContent;
}
export function LandingPage() {
  const settings = useSettings();
  const appearance = settings.homepage?.appearance;
  const showPricing = settings.homepage?.pricing && settings.billing.enable;
  const showTrending = settings.homepage?.trending;

  if (!appearance) {
    return null;
  }

  return (
    <Fragment>
      <DefaultMetaTags />
      <HeroHeader content={appearance} />
      <PrimaryFeatures content={appearance} />
      <SecondaryFeatures content={appearance} />
      {showTrending && <LandingPageTrendingTitles />}
      <BottomCta content={appearance} />
      {showPricing && <PricingSection content={appearance} />}
      <Footer className="landing-container" />
    </Fragment>
  );
}

function HeroHeader({content}: ContentProps) {
  const {
    headerTitle,
    headerSubtitle,
    headerImage,
    headerImageOpacity,
    actions,
    headerOverlayColor1,
    headerOverlayColor2,
    blurHeaderImage,
  } = content;
  let overlayBackground = undefined;

  if (headerOverlayColor1 && headerOverlayColor2) {
    overlayBackground = `linear-gradient(45deg, ${headerOverlayColor1} 0%, ${headerOverlayColor2} 100%)`;
  } else if (headerOverlayColor1) {
    overlayBackground = headerOverlayColor1;
  } else if (headerOverlayColor2) {
    overlayBackground = headerOverlayColor2;
  }

  return (
    <header className="relative isolate mb-14 overflow-hidden md:mb-60">
      <img
        src={headerImage}
        style={{
          opacity: headerImageOpacity,
        }}
        alt=""
        width="2347"
        height="1244"
        decoding="async"
        loading="lazy"
        className={clsx(
          'absolute left-1/2 top-1/2 z-20 max-w-none -translate-x-1/2 -translate-y-1/2',
          blurHeaderImage && 'blur-sm',
        )}
      />
      {overlayBackground && (
        <div
          className="absolute z-10 h-full w-full bg-alt"
          style={{background: overlayBackground}}
        />
      )}
      <div className="gradient absolute inset-0 z-30 m-auto"></div>
      <div className="relative z-30 flex h-full flex-col">
        <Navbar
          color="transparent"
          darkModeColor="transparent"
          className="flex-shrink-0"
          menuPosition="landing-page-navbar"
          primaryButtonColor="white"
        />
        <div className="mx-auto flex max-w-850 flex-auto flex-col items-center justify-center px-14 py-50 text-center text-white lg:py-140">
          {headerTitle && (
            <h1
              className="text-3xl font-normal md:text-5xl"
              data-testid="headerTitle"
            >
              <Trans message={headerTitle} />
            </h1>
          )}
          {headerSubtitle && (
            <div
              className="max-auto mt-24 max-w-640 text-lg tracking-tight md:text-xl"
              data-testid="headerSubtitle"
            >
              <Trans message={headerSubtitle} />
            </div>
          )}
          <div className="flex min-h-50 gap-20 pb-30 pt-40 empty:min-h-0 md:pb-50 md:pt-60">
            <CtaButton
              item={actions.cta1}
              variant="raised"
              color="white"
              size="lg"
              radius="rounded-full"
              className="min-w-180"
            />
            <CtaButton
              item={actions.cta2}
              variant="text"
              color="paper"
              size="lg"
              radius="rounded-full"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 z-20 h-[6vw] w-full translate-y-1/2 -skew-y-3 transform bg"></div>
    </header>
  );
}

interface CtaButtonProps extends ButtonProps {
  item?: MenuItemConfig;
}
function CtaButton({item, ...buttonProps}: CtaButtonProps) {
  if (!item?.label || !item?.action) return null;
  const Icon = item.icon ? createSvgIconFromTree(item.icon) : undefined;
  return (
    <Button
      elementType={item.type === 'route' ? Link : 'a'}
      href={item.action}
      to={item.action}
      startIcon={Icon ? <Icon /> : undefined}
      {...buttonProps}
    >
      <Trans message={item.label} />
    </Button>
  );
}

function PrimaryFeatures({content}: ContentProps) {
  if (!content.primaryFeatures?.length) {
    return null;
  }
  return (
    <Fragment>
      <div
        className="landing-container z-20 items-stretch gap-26 md:flex"
        id="primary-features"
      >
        {content.primaryFeatures.map((feature, index) => (
          <div
            key={index}
            className="mb-14 flex-1 rounded-2xl px-24 py-36 text-center shadow-[0_10px_30px_rgba(0,0,0,0.08)] dark:bg-alt md:mb-0"
            data-testid={`primary-root-${index}`}
          >
            <MixedImage
              className="mx-auto mb-30 h-128"
              data-testid={`primary-image-${index}`}
              src={feature.image}
            />
            <h2
              className="my-16 text-lg font-medium"
              data-testid={`primary-title-${index}`}
            >
              <Trans message={feature.title} />
            </h2>
            <div
              className="text-md text-[0.938rem]"
              data-testid={`primary-subtitle-${index}`}
            >
              <Trans message={feature.subtitle} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-100 h-1 bg-divider" />
    </Fragment>
  );
}

function SecondaryFeatures({content}: ContentProps) {
  return (
    <div
      className={clsx(
        'relative overflow-hidden',
        content.primaryFeatures?.length && 'pt-100',
      )}
    >
      <div className="landing-container relative" id="features">
        {content.secondaryFeatures.map((feature, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={index}
              data-testid={`secondary-root-${index}`}
              className={clsx(
                'relative z-20 mb-14 py-16 md:mb-80 md:flex',
                isEven && 'flex-row-reverse',
              )}
            >
              <img
                src={feature.image}
                className="mr-auto aspect-[600/382] w-580 max-w-full rounded-lg shadow-lg dark:border"
                alt=""
              />
              <div className="ml-30 mr-auto max-w-350 pt-30">
                <small
                  className="mb-16 text-xs font-medium uppercase tracking-widest text-muted"
                  data-testid={`secondary-subtitle-${index}`}
                >
                  <Trans message={feature.subtitle} />
                </small>
                <h3
                  className="py-16 text-3xl"
                  data-testid={`secondary-title-${index}`}
                >
                  <Trans message={feature.title} />
                </h3>
                <div className="h-2 w-50 bg-black/90 dark:bg-divider" />
                <div
                  className="my-20 text-[0.938rem]"
                  data-testid={`secondary-description-${index}`}
                >
                  <Trans message={feature.description} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface PricingSectionProps {
  content: LandingPageContent;
}
function PricingSection({content}: PricingSectionProps) {
  const query = useProducts('landingPage');
  const [selectedCycle, setSelectedCycle] =
    useState<UpsellBillingCycle>('yearly');

  return (
    <div className="py-80 sm:py-128" id="pricing">
      <div className="mx-auto max-w-1280 px-24 lg:px-32">
        <div className="text-center">
          {content.pricingTitle && (
            <h2
              className="font-display text-3xl tracking-tight sm:text-4xl"
              data-testid="pricingTitle"
            >
              <Trans message={content.pricingTitle} />
            </h2>
          )}
          {content.pricingSubtitle && (
            <p
              className="mt-16 text-lg text-muted"
              data-testid="pricingSubtitle"
            >
              <Trans message={content.pricingSubtitle} />
            </p>
          )}
        </div>
        <BillingCycleRadio
          products={query.data?.products}
          selectedCycle={selectedCycle}
          onChange={setSelectedCycle}
          className="my-50 flex justify-center"
          size="lg"
        />
        <PricingTable
          selectedCycle={selectedCycle}
          productLoader="landingPage"
        />
      </div>
    </div>
  );
}

function BottomCta({
  content: {footerSubtitle, footerImage, footerTitle, actions},
}: ContentProps) {
  if (!footerTitle && !footerSubtitle) {
    return null;
  }

  return (
    <div
      className="relative overflow-hidden bg-black py-90 text-white before:pointer-events-none before:absolute before:inset-0 before:z-10 before:bg-gradient-to-r before:from-black before:to-transparent md:py-128"
      data-testid="footerImage"
    >
      {footerImage && (
        <img
          draggable={false}
          src={footerImage}
          alt=""
          width="2347"
          height="1244"
          decoding="async"
          loading="lazy"
          className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 blur-sm"
        />
      )}
      <div className="relative z-20 mx-auto max-w-1280 px-24 text-center sm:px-16 lg:px-32">
        <div className="mx-auto max-w-512 text-center">
          {footerTitle && (
            <h2
              className=" font-display text-3xl tracking-tight sm:text-4xl"
              data-testid="footerTitle"
            >
              <Trans message={footerTitle} />
            </h2>
          )}
          {footerSubtitle && (
            <p
              className="mt-16 text-lg tracking-tight"
              data-testid="footerSubtitle"
            >
              <Trans message={footerSubtitle} />
            </p>
          )}
          <CtaButton
            item={actions.cta3}
            size="lg"
            radius="rounded-full"
            variant="flat"
            color="white"
            className="mt-40 block"
            data-testid="cta3"
          />
        </div>
      </div>
    </div>
  );
}
