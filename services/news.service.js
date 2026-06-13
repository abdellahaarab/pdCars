import API from './api.js';

export const NewsService = {
  async getAllNews() {
    return API.fetch('news');
  },

  async getNewsById(id) {
    const news = await this.getAllNews();
    return news.find(n => n.id === parseInt(id));
  },

  async getNews(category = '', search = '', page = 1, limit = 10) {
    let newsList = await this.getAllNews();

    if (category) {
      newsList = newsList.filter(n => n.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      newsList = newsList.filter(n => 
        n.title.toLowerCase().includes(q) || 
        n.excerpt.toLowerCase().includes(q)
      );
    }

    // Sort by date descending
    newsList.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    const total = newsList.length;
    const startIndex = (page - 1) * limit;
    const paginatedNews = newsList.slice(startIndex, startIndex + limit);
    const pages = Math.ceil(total / limit);

    return {
      news: paginatedNews,
      total,
      page,
      pages
    };
  },

  async getTrendingNews(limit = 5) {
    const newsList = await this.getAllNews();
    // Simulate trending by returning the first elements sorted by date
    newsList.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    return newsList.slice(0, limit);
  }
};
