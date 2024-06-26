import store from "../store";

export enum Permission {
  NAV_DASHBOARD = "NAV_DASHBOARD",
  NAV_SELLER = "NAV_SELLER",
  NAV_ADMIN_USER = "NAV_ADMIN_USER",
  NAV_ADMIN_ROLE = "NAV_ADMIN_ROLE",
  NAV_CATEGORY = "NAV_CATEGORY",
  NAV_SUB_CATEGORY = "NAV_SUB_CATEGORY",
  NAV_PRODUCT = "NAV_PRODUCT",
  NAV_LOCATION = "NAV_LOCATION",
  NAV_INVENTORY = "NAV_INVENTORY ",
  SELLER_ADD = "SELLER_ADD",
  SELLER_UPDATE = "SELLER_UPDATE",
  SELLER_DELETE = "SELLER_DELETE",
  SELLER_ACTIVE_DEACTIVE = "SELLER_ACTIVE_DEACTIVE",
  SELLER_LIST = "SELLER_LIST",
  SELLER_VIEW = "SELLER_VIEW",
  ADMIN_USER_ADD = "ADMIN_USER_ADD",
  ADMIN_USER_UPDATE = "ADMIN_USER_UPDATE",
  ADMIN_USER_DELETE = "ADMIN_USER_DELETE",
  ADMIN_USER_ACTIVE_DEACTIVE = "ADMIN_USER_ACTIVE_DEACTIVE",
  ADMIN_USER_LIST = "ADMIN_USER_LIST",
  ADMIN_ROLE_ADD = "ADMIN_ROLE_ADD",
  ADMIN_ROLE_UPDATE = "ADMIN_ROLE_UPDATE",
  ADMIN_ROLE_DELETE = "ADMIN_ROLE_DELETE",
  ADMIN_ROLE_LIST = "ADMIN_ROLE_LIST",
  CATEGORY_ADD = "CATEGORY_ADD",
  CATEGORY_UPDATE = "CATEGORY_UPDATE",
  CATEGORY_DELETE = "CATEGORY_DELETE",
  CATEGORY_ACTIVE_DEACTIVE = "CATEGORY_ACTIVE_DEACTIVE",
  CATEGORY_LIST = "CATEGORY_LIST",
  SUB_CATEGORY_ADD = "SUB_CATEGORY_ADD",
  SUB_CATEGORY_UPDATE = "SUB_CATEGORY_UPDATE",
  SUB_CATEGORY_DELETE = "SUB_CATEGORY_DELETE",
  SUB_CATEGORY_ACTIVE_DEACTIVE = "SUB_CATEGORY_ACTIVE_DEACTIVE",
  SUB_CATEGORY_LIST = "SUB_CATEGORY_LIST",
  PRODUCT_ADD = "PRODUCT_ADD",
  PRODUCT_UPDATE = "PRODUCT_UPDATE",
  PRODUCT_DELETE = "PRODUCT_DELETE",
  PRODUCT_ACTIVE_DEACTIVE = "PRODUCT_ACTIVE_DEACTIVE",
  PRODUCT_LIST = "PRODUCT_LIST",
  PRODUCT_VIEW = "PRODUCT_VIEW",
  LOCATION_ADD = "LOCATION_ADD",
  LOCATION_UPDATE = "LOCATION_UPDATE",
  LOCATION_LIST = "LOCATION_LIST",
  INVENTORY_LIST = " INVENTORY_LIST",
}

export type PermissionType = keyof typeof Permission;

export const isAuthorized: (
  permission: PermissionType | undefined
) => boolean = (permission) => {
  const isSuperAdmin =
    store.getState()?.auth?.userData?.userType === "SUPER_ADMIN";

  const permissions = store.getState()?.auth?.permissions;

  if (isSuperAdmin) {
    return true;
  }

  return permission ? permissions?.includes(Permission[permission]) : true;
};
