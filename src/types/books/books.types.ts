export interface Books {
  id: string;
  title: string;
  price: string;
  description: string;
  rating: number;
  img: IImg;
}

export interface IImg {
  alt: string;
  src: string;
}
