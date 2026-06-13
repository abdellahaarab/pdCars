const STORAGE_KEY = 'drivex_favorites';

export const FavoriteService = {
  getFavorites() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  addFavorite(carId) {
    const id = parseInt(carId);
    const favs = this.getFavorites();
    if (!favs.includes(id)) {
      favs.push(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
      this._dispatchEvent();
    }
  },

  removeFavorite(carId) {
    const id = parseInt(carId);
    let favs = this.getFavorites();
    favs = favs.filter(fId => fId !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
    this._dispatchEvent();
  },

  toggleFavorite(carId) {
    const id = parseInt(carId);
    const favs = this.getFavorites();
    if (favs.includes(id)) {
      this.removeFavorite(id);
      return false;
    } else {
      this.addFavorite(id);
      return true;
    }
  },

  isFavorite(carId) {
    const id = parseInt(carId);
    return this.getFavorites().includes(id);
  },

  _dispatchEvent() {
    window.dispatchEvent(new CustomEvent('drivex:favorites-updated', {
      detail: { count: this.getFavorites().length }
    }));
  }
};
