import { PieChartProductDataPipe } from 'src/app/dashboard/pipes/pie-chart-product-data.pipe';
import { ChartDataType } from 'src/app/dashboard/components/chart/chart.types';

describe('ProductSearchPipe', () => {
  const mockProduct = {
    name: 'test-product',
    description: '',
    picture: '',
    counts: [{ location: 'product-location', quantityAvailable: '666' }]
  };

  const expectedReturn: ChartDataType = {
    fieldNames: ['Location', 'Quantity'],
    data: [
      [
        mockProduct.counts[0].location,
        Number(mockProduct.counts[0].quantityAvailable)
      ]
    ]
  };

  const pipe = new PieChartProductDataPipe();

  it('should return with expected args on correct search', () => {
    expect(pipe.transform(mockProduct)).toEqual(expectedReturn);
  });
});
