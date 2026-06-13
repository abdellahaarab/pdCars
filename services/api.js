const API = {
  cache: {},
  
  async fetch(endpoint) {
    if (this.cache[endpoint]) {
      return this.cache[endpoint];
    }
    try {
      // Simulate network latency (e.g., 100-300ms) for realistic loading state demonstration
      await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 100));
      
      const response = await window.fetch(`/data/${endpoint}.json`);
      if (!response.ok) {
        throw new Error(`Failed to fetch /data/${endpoint}.json: ${response.statusText}`);
      }
      const data = await response.json();
      this.cache[endpoint] = data;
      return data;
    } catch (error) {
      console.error(`API Error fetching ${endpoint}:`, error);
      throw error;
    }
  }
};

export default API;
