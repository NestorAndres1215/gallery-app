export interface UnsplashUrl {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

export interface UnsplashUser {
  username: ReactNode;
  profile_image: any;
  name: string;
  links: { html: string };
}

export interface UnsplashPhoto {
  id: string;
  alt_description: string | null;
  urls: UnsplashUrl;
  links: {
    download: string | undefined; html: string
  };
  user: UnsplashUser;
}

export interface UnsplashSearchResponse {
  total: number;
  total_pages: number;
  results: UnsplashPhoto[];
}
