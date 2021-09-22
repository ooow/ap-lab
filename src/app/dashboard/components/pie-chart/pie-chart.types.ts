export type PieChartDataType = {
  fieldNames: [string, string];
  data: Array<[string, number]>;
};

export type PieChartConfigsType = Record<string, string | number>;
