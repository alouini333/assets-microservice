import { Category } from "../types/assetTypes";
import axios from "axios";

const CATEGORIES_URL = process.env.CATEGORIES_URL;

export const findAllCategories = async (): Promise<Category[]> => {
    try {
        const response = await axios.get(`${CATEGORIES_URL}`);
        if (response.status === 200 && response.data.status === 'success') {
            const { data: { data }} = response;
            return data;
        }
        return [];
    } catch (err) {
        console.log(err);
        return [];
    }
}