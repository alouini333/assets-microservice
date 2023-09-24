export interface Category {
    uuid: string;
    name: string;
}


export interface Asset {
    asset_id: string;
    name: string;
    type: 'video' | 'document' | 'image'
    path: string;
    created_at?: Date;
}

export interface AssetWithCategories extends Asset {
    categories?: Category[];
}