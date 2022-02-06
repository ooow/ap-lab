import { PieChartProductDataPipe } from 'src/app/dashboard/pipes/pie-chart-product-data.pipe';
import { ChartDataType } from 'src/app/dashboard/components/chart/chart.types';
import { mockProductsData } from 'src/app/shared/mocks/test-mocks';

describe('PieChartProductDataPipe', () => {
  const mockProducts = mockProductsData;

  const expectedReturn: ChartDataType = {
    fieldNames: ['Location', 'Quantity'],
    data: [
      [mockProducts[0].counts[0].location, mockProducts[0].counts[0].quantityAvailable],
      [mockProducts[1].counts[0].location, mockProducts[1].counts[0].quantityAvailable],
    ]
  };

  const pipe = new PieChartProductDataPipe();

  it('should return with expected args on correct search', () => {
    expect(pipe.transform(mockProducts)).toEqual(expectedReturn);
  });
});
