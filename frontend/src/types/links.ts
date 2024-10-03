import { LinkProps } from '@tanstack/react-router';

export type LinkType = {
  to: LinkProps['to'];
  icon?: JSX.Element;
  title: string;
};
