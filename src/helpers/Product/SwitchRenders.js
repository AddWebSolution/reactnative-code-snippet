import {translate} from '../utility';

export const getWeekDays = key => {
  switch (key) {
    case 'Sat':
      return translate('common.sat');
    case 'Sun':
      return translate('common.sun');
    case 'Mon':
      return translate('common.mon');
    case 'Tue':
      return translate('common.tue');
    case 'Wed':
      return translate('common.wed');
    case 'Thu':
      return translate('common.thu');
    case 'Fri':
      return translate('common.fri');
    default:
      return key;
  }
};

export const getMonths = key => {
  switch (key) {
    case 'Jan':
      return translate('common.jan');
    case 'Feb':
      return translate('common.feb');
    case 'Mar':
      return translate('common.mar');
    case 'Apr':
      return translate('common.apr');
    case 'May':
      return translate('common.may');
    case 'Jun':
      return translate('common.jan');
    case 'Jul':
      return translate('common.jul');
    case 'Aug':
      return translate('common.aug');
    case 'Sep':
      return translate('common.sep');
    case 'Oct':
      return translate('common.oct');
    case 'Nov':
      return translate('common.nov');
    case 'Dec':
      return translate('common.dec');
    default:
      return key;
  }
};

export const getEnglishTitle = key => {
  switch (key) {
    case 'variant_size':
      return 'Size';
    case 'variant_color':
      return 'Color';
    case 'variant_style':
      return 'Style';
    case 'variant_model':
      return 'Modal';
    case 'variant_material':
      return 'Material';
    case 'platform':
      return 'Platform';
    case 'edition':
      return 'Edition';
    case 'configuration':
      return 'Configuration';
    case 'variant_book':
      return 'Book';
    default:
      return null;
  }
};

export const getArabicTitle = key => {
  switch (key) {
    case 'platform_arabic':
      return 'منصة';
    case 'variant_book_arabic':
      return 'كتاب';
    case 'variant_color_arabic':
      return 'لون';
    case 'variant_material_arabic':
      return 'مادة';
    case 'variant_model_arabic':
      return 'مشروط';
    case 'variant_size_arabic':
      return 'مقاس';
    case 'variant_style_arabic':
      return 'أسلوب';
    default:
      return null;
  }
};
