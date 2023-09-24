export interface Category {
  uuid: string;
  name: string;
}

export interface Asset {
  asset_id: string;
  name: string;
  type: 'video' | 'document' | 'image';
  path: string;
  created_at?: Date;
  categoryIds: string[]
}

export interface Category {
  category_id: string;
  name: string;
}

export interface AssetCategory {
  asset_id: string;
  category_id: string;
}

export type AssetData = Omit<Asset, 'asset_id' | 'created_at' |'categoryIds'>;

export interface AssetWithCategories extends Omit<Asset, 'categoryIds'> {
  categories?: Category[];
}
