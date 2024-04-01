import {
  Icon,
  IconBasket,
  IconCategory,
  IconCategory2,
  IconCurrentLocation,
  IconHome,
  IconTarget,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
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
          path: "",
        },
        {
          title: "Batch",
          icon: IconTarget,
          path: "batch",
        },
        {
          title: "Attendance",
          icon: IconTarget,
          path: "attendance",
        },
        {
          title: "Seller",
          icon: IconUsers,
          path: "seller",
          searchParams: {
            page: "1",
            limit: "10",
          },
          permission: "NAV_SELLER",
        },
        {
          title: "Admin User",
          icon: IconUser,
          path: "admin-user",
          searchParams: {
            page: "1",
            limit: "10",
          },
          permission: "NAV_ADMIN_USER",
        },
        {
          title: "Admin Role",
          icon: IconUser,
          path: "admin-role",
          searchParams: {
            page: "1",
            limit: "10",
          },
          permission: "NAV_ADMIN_ROLE",
        },
        {


          
          title: "Locations",
          icon: IconCurrentLocation,
          path: "locations",
          permission: "NAV_LOCATION",
        },
      ],
    },

    {
      groupLable: "Inventory",
      permissions: ["NAV_CATEGORY", "NAV_SUB_CATEGORY", "NAV_PRODUCT"],
      items: [
        {
          title: "Category",
          icon: IconCategory,
          path: "category",
          searchParams: {
            page: "1",
            limit: "10",
          },
          permission: "NAV_CATEGORY",
        },
        {
          title: "Sub Category",
          icon: IconCategory2,
          path: "sub-category",
          searchParams: {
            page: "1",
            limit: "10",
          },
          permission: "NAV_SUB_CATEGORY",
        },
        {
          title: "Products",
          icon: IconBasket,
          path: "products",
          searchParams: {
            page: "1",
            limit: "10",
          },
          permission: "NAV_PRODUCT",
        },
        {
          title: "Units",
          icon: IconBasket,
          path: "unit",
          searchParams: {
            page: "1",
            limit: "10",
          },
        },
        {
          title: "Inventory",
          icon: IconBasket,
          path: "inventory",
          permission :'NAV_INVENTORY'
        },
      ],
    },
  ];

  return getPermittedNavigations(navigations);
};

export default navigation;
