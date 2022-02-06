import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { Component, DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatCardModule } from "@angular/material/card";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatPaginatorHarness } from "@angular/material/paginator/testing";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MockComponent } from "ng-mocks";
import { ProductComponent } from "../product/product.component";
import { ProductCardsComponent } from "./product-cards.component";
import { ProductCardsHarness } from "./product-cards.harness";

@Component({
    selector: 'tk-test',
    template: '<tk-product-cards></tk-product-cards>'
})
class TestComponent {}

describe('AppModule => ProductCards', () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: ProductCardsComponent;
    let loader: HarnessLoader;
    const products = [
        {
            name: 'first',
            picture: 'picUrl',
            description: 'firstDesc',
            counts: [
              { location: 'firstLocation', quantityAvailable: 666, price: 999 }
            ]
          },
          {
            id: 666,
            name: 'second',
            picture: 'picUrl',
            description: 'secondDesc',
            counts: [
              { location: 'firstLocation', quantityAvailable: 999, price: 666 }
            ]
          }
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                MatCardModule,
                MatPaginatorModule,
                MatProgressSpinnerModule,
                NoopAnimationsModule,
            ],
            declarations: [
                TestComponent,
                ProductCardsComponent,
                MockComponent(ProductComponent),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.query(
            By.css('tk-product-cards')
        ).componentInstance;
        loader = TestbedHarnessEnvironment.loader(fixture);

        component.products = products;
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should be created', () => {
        expect(component).not.toBeNull();
    });

    describe('loading spinner', () => {
        let harness: ProductCardsHarness;

        beforeEach(async () => {
            harness = await loader.getHarness(ProductCardsHarness);
        })
        it('should be hidden by default', async () => {
            expect (await harness.isLoading()).toBeFalse();
        });

        it('should show up', async () => {
            component.loading = true;
            fixture.detectChanges();
            expect(await harness.isLoading()).toBeTrue();
        });

        it('should be hidden', async () => {
            component.loading = false;
            fixture.detectChanges();
            expect(await harness.isLoading()).toBeFalse();
        });
    });

    describe('paginator', () => {
        const totalNumber = 20;
        const pageIndex = 0;
        let paginator: MatPaginatorHarness;
    
        beforeEach(async () => {
          paginator = await loader.getHarness(MatPaginatorHarness);
        });
    
        it('should be rendered appropriately', async () => {
          let rangeLabel: string;
    
          component.pageIndex = pageIndex;
          component.totalNumber = totalNumber;
          fixture.detectChanges();
          await fixture.whenStable();
    
          rangeLabel = await paginator.getRangeLabel();
    
          expect(await paginator.getPageSize()).toBe(10);
          expect(rangeLabel).toContain((pageIndex + 1).toString());
          expect(rangeLabel).toContain((10).toString());
          expect(rangeLabel).toContain(totalNumber.toString());
        });
    
        it('should propagate page change event', async () => {
          spyOn(component.pageChange, 'emit');
    
          component.pageIndex = pageIndex;
          component.totalNumber = totalNumber;
          fixture.detectChanges();
          await fixture.whenStable();
          await paginator.goToNextPage();
    
          expect(component.pageChange.emit).toHaveBeenCalledWith(1);
        });
      });

    describe('product cards', async () => {
        let harness: ProductCardsHarness;

        beforeEach(async () => {
            harness = await loader.getHarness(ProductCardsHarness);
        });

        it('should render correct number of cards', async () => {
            expect(await harness.productCards()).toHaveSize(2);
        });

        it('should pass correct props to Product components', () => {
            const productCards = fixture.debugElement.queryAll(
                By.directive(ProductComponent)
            );

            const firstCard: ProductComponent = productCards[0].componentInstance;
            const secondCard: ProductComponent = productCards[1].componentInstance;

            const firstProduct = products[0];
            const secondProduct = products[1];

            expect(firstCard.product).toBe(firstProduct);
            expect(secondCard.product).toBe(secondProduct);
        });

        it('should listen for card clicks', () => {
            const productCards = fixture.debugElement.queryAll(
                By.directive(ProductComponent)
            );

            const firstCard: DebugElement = productCards[0];
            const secondCard: DebugElement = productCards[1];

            const firstProduct = products[0];
            const secondProduct = products[1];
            
            spyOn(component.productDetails, "emit");

            expect(component.productDetails.emit).not.toHaveBeenCalled();
            
            firstCard.triggerEventHandler("click", { product: firstProduct });
            expect(component.productDetails.emit).toHaveBeenCalledOnceWith(firstProduct);
            expect(component.productDetails.emit).not.toHaveBeenCalledWith(secondProduct);

            secondCard.triggerEventHandler("click", { product: secondProduct });
            expect(component.productDetails.emit).toHaveBeenCalledTimes(2);
            expect(component.productDetails.emit).toHaveBeenCalledWith(secondProduct);
        })
    });
});