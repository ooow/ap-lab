export type ChartDataType = {
  fieldNames: [string, string];
  data: Array<[string, number]>;
};

export type ChartConfigsType = {
  title?: string;
  is3D?: boolean;
  width?: number;
  height?: number;
};
