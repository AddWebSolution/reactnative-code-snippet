export const renderText = val => {
  if (val.includes('-')) {
    return val.split('-')[0];
  }
  return val;
};

export const calculateTotalPrice = (shipping, price, quantity) => {
  const mode = shipping?.mode;
  const basePrice = mode === 'air' ? price?.price_air : price?.price;
  const discountPrice = mode === 'air' ? price?.discount_air : price?.discount;
  const finalPrice =
    Number(discountPrice) > 0 ? Number(discountPrice) : Number(basePrice);
  return finalPrice * quantity;
};
