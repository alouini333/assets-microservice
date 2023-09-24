import { Category } from "../types/assetTypes";
import axios from "axios";

const CATEGORIES_URL = process.env.CATEGORIES_URL;

export const findAllCategories = async (): Promise<Category[]> => {
    const response = await axios.get(`${CATEGORIES_URL}/categories`);
    if (response.status === 200 && response.data.status === 'success') {
        const { data: { data }} = response;
        return data;
    }
    return [];
}

export const findCategory = async (categoryId: string): Promise<Category | undefined> => {
    const response = await axios.get(`${CATEGORIES_URL}/categories/${categoryId}`);
    if (response.status === 200 && response.data.status === 'success') {
        const { data: { data }} = response;
        return data;
    }
    return undefined;
}