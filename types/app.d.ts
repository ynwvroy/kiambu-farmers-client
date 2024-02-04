declare interface Theme {
  name: string;
  dark: boolean;
  variables?: object;
  colors: {
    primary?: string;
    secondary?: string;
    info?: string;
    success?: string;
    accent?: string;
    warning?: string;
    error?: string;
    lightprimary?: string;
    lightsecondary?: string;
    lightsuccess?: string;
    lighterror?: string;
    lightinfo?: string;
    lightwarning?: string;
    textPrimary?: string;
    textSecondary?: string;
    borderColor?: string;
    hoverColor?: string;
    inputBorder?: string;
    containerBg?: string;
    surface?: string;
    "on-surface-variant"?: string;
    grey100?: string;
    grey200?: string;
    muted?: string;
  };
}

declare interface ThemeTypes {
  name: string;
  dark: boolean;
  variables?: object;
  colors: {
    primary?: string;
    secondary?: string;
    info?: string;
    success?: string;
    accent?: string;
    warning?: string;
    error?: string;
    lightprimary?: string;
    lightsecondary?: string;
    lightsuccess?: string;
    lighterror?: string;
    lightinfo?: string;
    lightwarning?: string;
    textPrimary?: string;
    textSecondary?: string;
    borderColor?: string;
    hoverColor?: string;
    inputBorder?: string;
    containerBg?: string;
    surface?: string;
    "on-surface-variant"?: string;
    grey100?: string;
    grey200?: string;
    muted?: string;
  };
}

declare interface IMenu {
  header?: string;
  title?: string;
  icon?: any;
  to?: string;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
  userTypes?: string[];
}

/*Recent Transaction*/
declare interface recentTrans {
  title: string;
  subtitle: string;
  textcolor: string;
  boldtext: boolean;
  line: boolean;
  link: string;
  url: string;
}

/*product performance*/
declare interface productPerformanceType {
  id: number;
  name: string;
  post: string;
  pname: string;
  status: string;
  statuscolor: string;
  budget: string;
}

/*Products card types*/
declare interface productsCards {
  title: string;
  link: string;
  photo: string;
  salesPrice: number;
  price: number;
  rating: number;
}

declare interface menu {
  header?: string;
  title?: string;
  icon?: any;
  to?: string;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
  user_type?: string | string[];
}
