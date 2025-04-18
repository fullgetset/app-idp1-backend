export interface UpdateBooks {
  id: string;
  title?: string;
  description?: string;
  price?: string;
  img?: Image;
}

export interface Image {
  alt: string;
  src: string;
}
