import { Icon, IconHome, IconTarget } from "@tabler/icons-react";
import { PermissionType } from "./utils/authorization";
import { getPermittedNavigations } from "./utils/getPermittedNavigations";

export type GroupItemWithChildren = {
  title: string;
  icon: Icon;
  path?: never;
  searchParams?: never;
  children: GroupItem[];
  badgeContent?: string;
  permission?: PermissionType;
};

export type GroupItemWithPath = {
  title: string;
  icon: Icon;
  path: string;
  searchParams?: {
    [field: string]: string;
  };
  children?: never;
  badgeContent?: string;
  permission?: PermissionType;
};

export type GroupItem = GroupItemWithPath | GroupItemWithChildren;

export type NavigationItem = {
  groupLable: string;
  permissions?: PermissionType[];
  items: GroupItem[];
};

const navigation: (params?: {
  badgeData: { batches: string; courses: string };
}) => NavigationItem[] = (params) => {
  const navigations: NavigationItem[] = [
    {
      groupLable: "Dashboard",
      items: [
        {
          title: "Dashboard",
          icon: IconHome,
          path: "/dashboard",
        },
        {
          title: "Batch",
          icon: IconTarget,
          path: "batch",
        }
      ],
    },
  ];

  return getPermittedNavigations(navigations);
};

export default navigation;
