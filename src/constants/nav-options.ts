export interface INav {
  id: string;
  label: string;
  href: string;
}

export const primaryNav: INav[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    id: "groups",
    label: "Groups",
    href: "/groups",
  },
  {
    id: "expenses",
    label: "Expenses",
    href: "/expenses",
  },
  {
    id: "activity",
    label: "Settlements",
    href: "/settlements",
  },
];
