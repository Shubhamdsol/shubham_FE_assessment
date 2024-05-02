const API_URL = 'http://universities.hipolabs.com/search?country=United%20Arab%20Emirates';

export const ApiService = {
  fetchUniversities: async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch universities');
    }
    const data = await response.json();
    return data;
  }
};
