import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Product } from '../models/product';
import { ProductSearchPipe } from './product-search.pipe';

@Component({
  selector: 'tk-test',
  template:
    '<span *ngFor="let product of products | productSearch: search"></span>'
})
class TestComponent {
  products: ReadonlyArray<Product>;
  search: string;
}

describe('AppModule => ProductSearchPipe', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  const products = [
    { name: 'first', description: '', picture: '' },
    { name: 'second', description: '', picture: '' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductSearchPipe, TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    component.products = products;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should be created', () => {
    expect(component).not.toBeNull();
  });

  // tslint:disable-next-line:max-line-length
  it('should not filter products if search query was not provided', () => {
    expect(fixture.debugElement.queryAll(By.css('span')).length).toBe(
      products.length
    );
  });

  // tslint:disable-next-line:max-line-length
  it('should filter products by name (character case insensitive)', async () => {
    component.search = 'FIR';
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.debugElement.queryAll(By.css('span')).length).toBe(1);
  });
});
