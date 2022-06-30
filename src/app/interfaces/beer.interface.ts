export interface BeerVolume {
  value: number;
  unit: string;
}

export interface BeerIngredient {
  name: string;
  amount: BeerVolume;
}

export interface BeerHopsIngredient extends BeerIngredient {
  add: string;
  attribute: string;
}

export interface BeerCategoryInterface {
  label: string;
  value: string;
  url: string;
}

export interface BeerIngridient {
  malt: BeerIngredient[];
  hops: BeerHopsIngredient[];
  yeast: string;
}

export type BeerIngridientFilter = Omit<BeerIngridient, 'yeast'>;

export interface BeerInterface {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  volume: BeerVolume;
  boil_volume: BeerVolume;
  method: {
    mash_temp: {
      temp: {
        value: number;
        unit: string;
      };
      duration: number;
    }[];
    fermentation: {
      temp: {
        value: number;
        unit: string;
      };
    };
    twist: null;
  };
  ingredients: BeerIngridient;
  food_pairing: string;
  brewers_tips: string;
  contributed_by: string;
}
