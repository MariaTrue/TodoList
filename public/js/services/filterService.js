export const filterService = {
  setFilter(selectedValue) {
    localStorage.setItem("filter", selectedValue);
  },
  getFilter() {
    return localStorage.getItem("filter") || "ALL_TASKS";
  },
};
