import { createSelector } from "reselect";

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export const selectProductsItems = (state) => state.products?.items.data || [];

export const getRandomFromEachGroup = createSelector(
  [selectProductsItems],
  (products, groupSize = 6) => {
    if (!products || !products.length || groupSize <= 0) return [];

    const totalGroups = Math.floor(products.length / groupSize);
    const result = [];

    for (let i = 0; i < totalGroups; i++) {
      const groupStart = i * groupSize;
      const randomOffset = Math.floor(Math.random() * groupSize);
      result.push(products[groupStart + randomOffset]);
    }

    return result;
  }
);

export const getRandomSubset = createSelector(
  [selectProductsItems, (_, count) => count],
  (products, count) => {
    if (!products || !products.length) return [];
    if (!count || count >= products.length) return [...products];

    const shuffled = shuffleArray(products);
    return shuffled.slice(0, count);
  }
);

export const getRandomItems = createSelector(
  [selectProductsItems, (_, count) => count],
  (products, count) => {
    if (!products || !products.length) return [];
    if (count <= 0) return [];
    return getRandomSubset.resultFunc(products, count);
  }
);

export const getRandomGroupedItems = createSelector(
  [selectProductsItems, (_, { groupSize = 6, totalSelect }) => ({ groupSize, totalSelect })],
  (products, { groupSize, totalSelect }) => {
    if (groupSize <= 0) return [];

    const fromGroups = getRandomFromEachGroup.resultFunc(products, groupSize);

    if (totalSelect !== undefined && totalSelect < fromGroups.length) {
      return getRandomSubset.resultFunc(fromGroups, totalSelect);
    }

    return fromGroups;
  }
);

export const getNineRandomItems = createSelector(
    [selectProductsItems],
    (products) => {
      return getRandomItems.resultFunc(products, 9);
    }
  );

export const getSixRandomItems = createSelector(
  [selectProductsItems],
  (products) => {
    return getRandomItems.resultFunc(products, 6);
  }
);

export const getFourRandomItems = createSelector(
  [selectProductsItems],
  (products) => {
    return getRandomItems.resultFunc(products, 4);
  }
);

export const getRandomThreeToNineItems = createSelector(
  [selectProductsItems],
  (products) => {
    const count = Math.floor(Math.random() * 7) + 3;
    return getRandomItems.resultFunc(products, count);
  }
);

export const getOneRandomItems = createSelector(
    [selectProductsItems],
    (products) => {
      return getRandomItems.resultFunc(products, 2);
    }
  );



