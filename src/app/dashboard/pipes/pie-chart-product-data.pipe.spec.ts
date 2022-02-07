import { PieChartProductDataPipe } from 'src/app/dashboard/pipes/pie-chart-product-data.pipe';
import { ChartDataType } from 'src/app/dashboard/components/chart/chart.types';
import { mockProductsData } from 'src/app/shared/mocks/test-mocks';
import { DashboardProductsService } from 'src/app/shared/services/dashboard-products.service';
import { TestBed } from '@angular/core/testing';

describe('PieChartProductDataPipe', () => {
  beforeEach(()=>{
    TestBed.configureTestingModule({
      providers:[DashboardProductsService]
    })
  })

  const mockProducts = mockProductsData;

  const expectedReturn: ChartDataType = {
    fieldNames: ['Location', 'Quantity'],
    data: [
      [mockProducts[0].counts[0].location, mockProducts[0].counts[0].quantityAvailable],
      [mockProducts[1].counts[0].location, mockProducts[1].counts[0].quantityAvailable],
    ]
  };

  it('should return with expected args on correct search', () => {
    const service:DashboardProductsService = TestBed.inject(DashboardProductsService)
    const pipe = new PieChartProductDataPipe(service);
    expect(pipe.transform(mockProducts)).toEqual(expectedReturn);
  });
});
