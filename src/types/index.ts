export interface Variation {
  variation: number;
  meta_title: string;
  meta_title_length: number;
  title_ok: boolean;
  meta_description: string;
  meta_description_length: number;
  description_ok: boolean;
}

export interface SEOResult {
  success: boolean;
  url: string;
  keyword: string;
  current_meta: {
    title: string;
    description: string;
  };
  optimized_variations: Variation[];
}

export interface FormState {
  url: string;
  keyword: string;
}
