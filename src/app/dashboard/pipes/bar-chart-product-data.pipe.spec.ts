import { TestBed } from '@angular/core/testing';
import { ChartDataType } from 'src/app/dashboard/components/chart/chart.types';
import { mockProductsData } from 'src/app/shared/mocks/test-mocks';
import { mockSameProductData } from 'src/app/shared/mocks/test-mocks';
import { BarChartProductDataPipe } from 'src/app/dashboard/pipes/bar-chart-product-data.pipe';
import { DashboardProductsService } from 'src/app/shared/services/dashboard-products.service';

describe('BarChartProductDataPipe', () => {
  beforeEach(()=>{
    TestBed.configureTestingModule({
      providers:[DashboardProductsService]
    })
  })



  it('should return with expected args on correct search', () => {
    const service:DashboardProductsService = TestBed.inject(DashboardProductsService)
    const pipe = new BarChartProductDataPipe(service);
    const mockProduct = mockProductsData;
    const expectedReturn: ChartDataType = {
      fieldNames: ['Location', 'Price USD'],
      data: [[mockProduct[1].counts[0].location, mockProduct[1].counts[0].price],
      [mockProduct[0].counts[0].location, mockProduct[0].counts[0].price],
    ]
    };

    expect(pipe.transform(mockProduct)).toEqual(expectedReturn);
  });

  it('should return data in ascending sort order', () => {
    const service:DashboardProductsService = TestBed.inject(DashboardProductsService)
    const pipe = new BarChartProductDataPipe(service);
    const mockProduct = mockSameProductData;

        mockSameProductData[0].counts.push(
        {
          location: 'product1-location2',
          quantityAvailable: 12,
          price: 1
        }
        );


    const expectedReturn: ChartDataType = {
      fieldNames: ['Location', 'Price USD'],
      data: [
        ['product1-location2', 1],
        ['product1-location', 999]
      ]
    };

    expect(pipe.transform(mockProduct)).toEqual(expectedReturn);
  });
});
