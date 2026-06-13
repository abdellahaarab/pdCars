import API from './api.js';

export const ReviewService = {
  async getAllReviews() {
    return API.fetch('reviews');
  },

  async getReviewsByCarId(carId) {
    const reviews = await this.getAllReviews();
    return reviews.filter(rev => rev.carId === parseInt(carId));
  },

  async getReviews(search = '', page = 1, limit = 10) {
    let reviews = await this.getAllReviews();

    if (search) {
      const q = search.toLowerCase();
      reviews = reviews.filter(rev => 
        rev.title.toLowerCase().includes(q) || 
        rev.carName.toLowerCase().includes(q) ||
        rev.author.toLowerCase().includes(q)
      );
    }

    reviews.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    const total = reviews.length;
    const startIndex = (page - 1) * limit;
    const paginatedReviews = reviews.slice(startIndex, startIndex + limit);
    const pages = Math.ceil(total / limit);

    return {
      reviews: paginatedReviews,
      total,
      page,
      pages
    };
  },

  async getReviewsStats(carId) {
    const carReviews = await this.getReviewsByCarId(carId);
    const total = carReviews.length;
    if (total === 0) {
      return { average: 0, total: 0, breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };
    }

    let sum = 0;
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    carReviews.forEach(rev => {
      sum += rev.rating;
      const rounded = Math.round(rev.rating);
      if (breakdown[rounded] !== undefined) {
        breakdown[rounded]++;
      } else if (rounded > 5) {
        breakdown[5]++;
      } else {
        breakdown[1]++;
      }
    });

    return {
      average: parseFloat((sum / total).toFixed(1)),
      total,
      breakdown
    };
  }
};
