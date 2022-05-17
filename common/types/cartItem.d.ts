type CartItem = Product & {
  uuid: string;
  lineId: string;
  onlyOne: boolean;
  amount: number;
};
