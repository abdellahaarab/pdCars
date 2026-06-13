import API from './api.js';

export const CarService = {
  async getAllCars() {
    return API.fetch('cars');
  },

  async getCarById(id) {
    const cars = await this.getAllCars();
    return cars.find(car => car.id === parseInt(id));
  },

  async getFeaturedCars(limit = 4) {
    const cars = await this.getAllCars();
    return cars.filter(car => car.featured).slice(0, limit);
  },

  async getCars({ brand, category, fuelType, transmission, minPrice, maxPrice, minYear, maxYear, search } = {}, sort = 'newest', page = 1, limit = 12) {
    let cars = await this.getAllCars();

    // 1. FILTERING
    if (brand) {
      cars = cars.filter(car => car.brand.toLowerCase() === brand.toLowerCase());
    }
    if (category) {
      cars = cars.filter(car => car.category.toLowerCase() === category.toLowerCase());
    }
    if (fuelType) {
      cars = cars.filter(car => car.fuelType.toLowerCase() === fuelType.toLowerCase());
    }
    if (transmission) {
      cars = cars.filter(car => car.transmission.toLowerCase() === transmission.toLowerCase());
    }
    if (minPrice !== undefined && minPrice !== null) {
      cars = cars.filter(car => car.price >= minPrice);
    }
    if (maxPrice !== undefined && maxPrice !== null) {
      cars = cars.filter(car => car.price <= maxPrice);
    }
    if (minYear !== undefined && minYear !== null) {
      cars = cars.filter(car => car.year >= minYear);
    }
    if (maxYear !== undefined && maxYear !== null) {
      cars = cars.filter(car => car.year <= maxYear);
    }
    if (search) {
      const q = search.toLowerCase();
      cars = cars.filter(car => 
        car.name.toLowerCase().includes(q) || 
        car.brand.toLowerCase().includes(q) || 
        car.category.toLowerCase().includes(q)
      );
    }

    // 2. SORTING
    switch (sort) {
      case 'newest':
        cars.sort((a, b) => b.year - a.year || b.id - a.id);
        break;
      case 'oldest':
        cars.sort((a, b) => a.year - b.year || a.id - b.id);
        break;
      case 'highest-price':
        cars.sort((a, b) => b.price - a.price);
        break;
      case 'lowest-price':
        cars.sort((a, b) => a.price - b.price);
        break;
      case 'highest-rating':
        cars.sort((a, b) => b.rating - a.rating);
        break;
      default:
        cars.sort((a, b) => b.year - a.year);
    }

    // 3. PAGINATION
    const total = cars.length;
    const startIndex = (page - 1) * limit;
    const paginatedCars = cars.slice(startIndex, startIndex + limit);
    const pages = Math.ceil(total / limit);

    return {
      cars: paginatedCars,
      total,
      page,
      pages
    };
  },

  async getRelatedCars(carId, limit = 4) {
    const currentCar = await this.getCarById(carId);
    if (!currentCar) return [];

    const allCars = await this.getAllCars();
    return allCars
      .filter(car => car.id !== currentCar.id && (car.brand === currentCar.brand || car.category === currentCar.category))
      .slice(0, limit);
  },

  async getCategories() {
    return API.fetch('categories');
  }
};
