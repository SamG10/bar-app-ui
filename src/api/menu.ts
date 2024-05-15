import axiosInstance from './config'

interface Cocktail {
    id: string;
    name: string;
    image_url: string;
    ingredients: string;
    price_L: number;
    price_M: number;
    price_S: number;
  }
  
  interface CocktailsByCategory {
    [key: string]: Cocktail[];
  }

export const fetchCocktailsByCategory = async (): Promise<CocktailsByCategory> => {
    try {
        const response = await axiosInstance.get('/category/cocktails')
        return response.data
    } catch (error) {
        console.error('Error fetching cocktails by category:', error);
        throw error;
    }
}