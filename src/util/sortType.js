export const sortType = {
  ASC: 0,
  DESC: 1
}

export const getSortedList = (arr, mode) => {
  arr.sort((item1, item2) => {
    if (mode === sortType.ASC) {
      if (item1 > item2) {
        return -1;
      }
      if (item2 > item1) {
        return 1;
      }
      return 0;
    } else {
      if (item1 < item2) {
        return -1;
      }
      if (item2 < item1) {
        return 1;
      }
      return 0;
    }
  });
}
