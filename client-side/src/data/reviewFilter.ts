export interface ReviewFilterData {
  id: number;
  name: string;
  value: boolean;
}

const reviewFilter: ReviewFilterData[] = [
  {
    id: 0,
    name: "To Rate",
    value: false,
  },

  {
    id: 1,
    name: "Rated Item",
    value: true,
  },
];

export default reviewFilter;
