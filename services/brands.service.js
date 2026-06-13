import API from './api.js';

export const BrandService = {
  async getAllBrands() {
    return API.fetch('brands');
  },

  async getBrandById(id) {
    const brands = await this.getAllBrands();
    return brands.find(b => b.id === parseInt(id));
  },

  async getBrandBySlug(slug) {
    const brands = await this.getAllBrands();
    return brands.find(b => b.slug === slug);
  },

  async getBrandByName(name) {
    const brands = await this.getAllBrands();
    return brands.find(b => b.name.toLowerCase() === name.toLowerCase());
  }
};
