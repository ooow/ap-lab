import {ChartDataType} from 'src/app/dashboard_view/components/chart/chart.types';
import {mockProductsData} from 'src/app/shared/mock/test_mocks';
import {BarChartProductDataPipe} from 'src/app/dashboard_view/pipes/bar-chart-product-data.pipe';

describe('BarChartProductDataPipe', () => {
  const pipe = new BarChartProductDataPipe();

  it('should return with expected args on correct search', () => {
    const mockProduct = mockProductsData[0];
    const expectedReturn: ChartDataType = {
      fieldNames: ['Location', 'Price USD'],
      data      : [
        [
          mockProduct.counts[0].location,
          mockProduct.counts[0].price,
        ],
      ],
    };

    expect(pipe.transform(mockProduct)).toEqual(expectedReturn);
  });

  it('should return data in ascending sort order', () => {
    const mockProduct = {
      ...mockProductsData[0], counts: [
        ...mockProductsData[0].counts, {
          location: 'product1-location2', quantityAvailable: 12, price: 1,
        },
      ],
    };

    const expectedReturn: ChartDataType = {
      fieldNames: ['Location', 'Price USD'], data: [
        ['product1-location2', 1], ['product1-location', 999],
      ],
    };

    expect(pipe.transform(mockProduct)).toEqual(expectedReturn);
  });
});
