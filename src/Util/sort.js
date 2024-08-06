export const sortData = (data, sortBy, sortDirection) => {
    return [...data].sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (a[sortBy] > b[sortBy]) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };
  