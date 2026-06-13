const STORAGE_KEY = 'pdcars_compare';

export const CompareService = {
  getCompareList() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  addCompare(carId) {
    const id = parseInt(carId);
    const list = this.getCompareList();
    if (list.length >= 4) {
      return { success: false, message: 'You can compare a maximum of 4 vehicles.' };
    }
    if (!list.includes(id)) {
      list.push(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      this._dispatchEvent();
      return { success: true, count: list.length };
    }
    return { success: false, message: 'Vehicle is already in the comparison list.' };
  },

  removeCompare(carId) {
    const id = parseInt(carId);
    let list = this.getCompareList();
    list = list.filter(cId => cId !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    this._dispatchEvent();
  },

  toggleCompare(carId) {
    const id = parseInt(carId);
    const list = this.getCompareList();
    if (list.includes(id)) {
      this.removeCompare(id);
      return { inCompare: false, count: this.getCompareList().length };
    } else {
      const result = this.addCompare(id);
      return { inCompare: result.success, count: this.getCompareList().length, message: result.message };
    }
  },

  isInCompare(carId) {
    const id = parseInt(carId);
    return this.getCompareList().includes(id);
  },

  clearCompare() {
    localStorage.removeItem(STORAGE_KEY);
    this._dispatchEvent();
  },

  _dispatchEvent() {
    window.dispatchEvent(new CustomEvent('pdcars:compare-updated', {
      detail: { count: this.getCompareList().length }
    }));
  }
};
