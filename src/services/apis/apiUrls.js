import {Platform} from 'react-native';
import {
  API_BASE_URL,
  GOOGLE_API_KEY_IOS,
  GOOGLE_API_KEY_ANDROID,
  USER_SERVICE_API_ENDPOINT,
  PRODUCT_SERVICE_API_ENDPOINT,
  ORDER_SERVICE_API_ENDPOINT,
} from '@env';
const GOOGLE_API_KEY =
  Platform.OS === 'ios' ? GOOGLE_API_KEY_IOS : GOOGLE_API_KEY_ANDROID;

const BASE_API = `${API_BASE_URL}/api/v1`;

const CHECK_PHONE_NUMBER = `${USER_SERVICE_API_ENDPOINT}/api/v1/check-phone-or-email`;
const USER_REGISTER = `${USER_SERVICE_API_ENDPOINT}/api/v1/signup`;
const CATEGORY_LIST = `${API_BASE_URL}/api/v1/category`;
const PARENT_CATEGORY_API = `${API_BASE_URL}/api/v1/category/get-all-parent`;
const SUB_CATEGORY_API = `${API_BASE_URL}/api/v1/category/get-all-sub-category-brand`;
const CATEGORIES_TREE_API = `${PRODUCT_SERVICE_API_ENDPOINT}/api/v1/categories/tree`;
const CATEGORIES_BRAND_API = `${PRODUCT_SERVICE_API_ENDPOINT}/api/v1/categories/brand`;

const PRODUCT_API = `${API_BASE_URL}/api/v1/product`;

const UPDATE_PROFILE = `${USER_SERVICE_API_ENDPOINT}/api/v1/user`;
const UPDATE_PHONE = `${API_BASE_URL}/api/v1/user/update-phone-number`;
const UPDATE_PASSWORD = `${API_BASE_URL}/api/v1/user/update-password`;
const HELPNSUPPORT = `${API_BASE_URL}/api/v1/help-support`;

const WISHLIST_API = `${API_BASE_URL}/api/v1/wishlist`;

const ADD_NEW_ADDRESS = `${USER_SERVICE_API_ENDPOINT}/api/v1/user/address`;
const FETCH_ADDRESS_DETAIL = `${USER_SERVICE_API_ENDPOINT}/api/v1/user/address`;
const UPDATE_ADDRESS_DETAIL = `${USER_SERVICE_API_ENDPOINT}/api/v1/user/address`;
const DELETE_ADDRESS_DETAIL = `${USER_SERVICE_API_ENDPOINT}/api/v1/user/address`;

const ORDER_API = `${API_BASE_URL}/api/v1/order`;

const ORDER_DETAIL_API = `${API_BASE_URL}/api/v1/order/ordersDetails`;

// const CART_API = `${API_BASE_URL}/api/v1/cart`;
const CART_API = `${ORDER_SERVICE_API_ENDPOINT}/api/v1/cart`;
const ORDER_SERVICES_API = `${ORDER_SERVICE_API_ENDPOINT}/api/v1/order`;
const PAYMENT_SERVICES_API = `${ORDER_SERVICE_API_ENDPOINT}/api/v1/payment-options`;

const COUPON_API = `${API_BASE_URL}/api/v1/promocode`;

const HOME_API = `${PRODUCT_SERVICE_API_ENDPOINT}/api/v1/home-page`;

const SEARCH_API = `${API_BASE_URL}/api/v1/product/search`;
const DELETE_ACCOUNT = `${API_BASE_URL}/api/v1/user/deleteUser`;

const DEEP_LINKING_PRODUCTS_API_CALL = `${PRODUCT_SERVICE_API_ENDPOINT}/api/v1/get-link-criteria`;

const WP_OTP_SENT_API = `${USER_SERVICE_API_ENDPOINT}/api/v1/wp-otp/send`;
const WP_OTP_VERIFY_API = `${USER_SERVICE_API_ENDPOINT}/api/v2/wp-otp/verify`;
const SOCIAL_USER_VERIFY_API = `${USER_SERVICE_API_ENDPOINT}/api/v2/social-user/verify`;
const SOCIAL_USER_LINK_API = `${USER_SERVICE_API_ENDPOINT}/api/v2/social-user/link`;
const PHONE_LINK_API = `${USER_SERVICE_API_ENDPOINT}/api/v2/phone/link`;
const CREATE_SHARE_LINK_API = `${PRODUCT_SERVICE_API_ENDPOINT}/api/v1/generate-shareable-code`;
const CREATE_PLP_SHARE_LINK_API = `${PRODUCT_SERVICE_API_ENDPOINT}/api/v1/generate-links`;
const PRODUCTS_SEARCH_API = `${PRODUCT_SERVICE_API_ENDPOINT}/api/v1/products/search`;
const SWITCH_PAYMENT_API = `${API_BASE_URL}/payments/switch`;
const PRODUCT_DETAIL_API = `${PRODUCT_SERVICE_API_ENDPOINT}/api/v1/product/details`;
const PRODUCT_DETAIL_VARIATION_API = `${PRODUCT_SERVICE_API_ENDPOINT}/api/v1/product/variations`;

const VERSION_CHECK_API = `${USER_SERVICE_API_ENDPOINT}/api/version-check`;

export {
  CHECK_PHONE_NUMBER,
  USER_REGISTER,
  CATEGORY_LIST,
  PRODUCT_API,
  UPDATE_PROFILE,
  UPDATE_PHONE,
  HELPNSUPPORT,
  ADD_NEW_ADDRESS,
  FETCH_ADDRESS_DETAIL,
  UPDATE_ADDRESS_DETAIL,
  DELETE_ADDRESS_DETAIL,
  WISHLIST_API,
  GOOGLE_API_KEY,
  UPDATE_PASSWORD,
  CART_API,
  ORDER_API,
  ORDER_DETAIL_API,
  HOME_API,
  SEARCH_API,
  BASE_API,
  COUPON_API,
  DELETE_ACCOUNT,
  PARENT_CATEGORY_API,
  SUB_CATEGORY_API,
  CREATE_SHARE_LINK_API,
  DEEP_LINKING_PRODUCTS_API_CALL,
  WP_OTP_SENT_API,
  WP_OTP_VERIFY_API,
  SOCIAL_USER_VERIFY_API,
  SOCIAL_USER_LINK_API,
  CATEGORIES_BRAND_API,
  CATEGORIES_TREE_API,
  PRODUCTS_SEARCH_API,
  PHONE_LINK_API,
  SWITCH_PAYMENT_API,
  ORDER_SERVICES_API,
  PAYMENT_SERVICES_API,
  PRODUCT_DETAIL_API,
  PRODUCT_DETAIL_VARIATION_API,
  VERSION_CHECK_API,
  CREATE_PLP_SHARE_LINK_API,
};