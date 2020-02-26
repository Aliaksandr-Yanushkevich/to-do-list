export const SortType = {
  ASC: 0,
  DESC: 1
}

export const sortList = (arr, mode) => {
    if (mode === SortType.ASC) {
      return arr.sort((item1, item2) => item1.id - item2.id);
    } else {
      return arr.sort((item1, item2) => item2.id - item1.id)
    }
}
