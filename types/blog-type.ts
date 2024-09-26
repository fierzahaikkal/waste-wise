export interface Author {
  name: string;
  picture?: string;
}

export interface PostMetadata {
  title: string;
  date: string;
  slug: string;
  author: {
    name: string;
    picture?: string;
  };
  excerpt: string;
  coverImage?: string;
  tags?: string[];
  readingTime?: number;
}

export interface Post extends PostMetadata {
  contentHtml: string;
}
