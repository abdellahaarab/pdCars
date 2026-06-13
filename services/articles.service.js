import API from './api.js';

export const ArticleService = {
  async getAllArticles() {
    return API.fetch('articles');
  },

  async getArticleById(id) {
    const articles = await this.getAllArticles();
    return articles.find(art => art.id === parseInt(id));
  },

  async getFeaturedArticles(limit = 3) {
    const articles = await this.getAllArticles();
    return articles.filter(art => art.featured).slice(0, limit);
  },

  async getArticles(category = '', search = '', page = 1, limit = 9) {
    let articles = await this.getAllArticles();

    if (category) {
      articles = articles.filter(art => art.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      articles = articles.filter(art => 
        art.title.toLowerCase().includes(q) || 
        art.excerpt.toLowerCase().includes(q)
      );
    }

    // Sort by publish date descending
    articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    const total = articles.length;
    const startIndex = (page - 1) * limit;
    const paginatedArticles = articles.slice(startIndex, startIndex + limit);
    const pages = Math.ceil(total / limit);

    return {
      articles: paginatedArticles,
      total,
      page,
      pages
    };
  },

  async getRelatedArticles(articleId, limit = 3) {
    const currentArt = await this.getArticleById(articleId);
    if (!currentArt) return [];

    const allArticles = await this.getAllArticles();
    return allArticles
      .filter(art => art.id !== currentArt.id && art.category === currentArt.category)
      .slice(0, limit);
  }
};
