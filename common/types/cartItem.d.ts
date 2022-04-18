type CartItem = Product & {
  uuid: string;
  onlyOne: boolean;
  amount: number;
};
