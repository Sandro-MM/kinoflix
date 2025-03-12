import {MenuItemConfig} from '@common/menus/menu-config';

export interface LandingPageContent {
  headerTitle: string;
  headerSubtitle: string;
  headerImage: string;
  blurHeaderImage: boolean;
  headerOverlayColor1: string;
  headerOverlayColor2: string;
  headerImageOpacity: string | number;
  footerTitle: string;
  footerSubtitle: string;
  footerImage: string;
  pricingTitle?: string;
  pricingSubtitle?: string;
  actions: {
    inputText: string;
    inputButton: string;
    cta1?: MenuItemConfig;
    cta2?: MenuItemConfig;
    cta3?: MenuItemConfig;
  };
  primaryFeatures: {
    title: string;
    subtitle: string;
    image: string;
  }[];
  secondaryFeatures: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
  }[];
}
