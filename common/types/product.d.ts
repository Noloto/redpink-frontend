type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  price: string;
  images: { edges: Image[] };
  variants: Variant[];
  tags: string[];
};
