import {PieChartProductDataPipe} from 'src/app/dashboard_view/pipes/pie-chart-product-data.pipe';
import {ChartDataType} from 'src/app/dashboard_view/components/chart/chart.types';
import {mockProductsData} from 'src/app/shared/mock/test_mocks';

describe('PieChartProductDataPipe', () => {
  const mockProduct = mockProductsData[0];

  const expectedReturn: ChartDataType = {
    fieldNames: ['Location', 'Quantity'], data: [
      [mockProduct.counts[0].location, mockProduct.counts[0].quantityAvailable],
    ],
  };

  const pipe = new PieChartProductDataPipe();

  it('should return with expected args on correct search', () => {
    expect(pipe.transform(mockProduct)).toEqual(expectedReturn);
  });
});
