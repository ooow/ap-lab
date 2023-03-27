import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {SearchOptionsPipe} from './search_options_pipe';

@Component({
  selector: 'tk-test',
  template: '<span *ngFor="let option of options | searchOptions: search"></span>',
})
class TestComponent {
  options: ReadonlyArray<string>;
  search: string;
}

describe('AppModule => SearchOptionsPipe', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  const options = ['first', 'second'];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchOptionsPipe, TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    component.options = options;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should be created', () => {
    expect(component).not.toBeNull();
  });

  // tslint:disable-next-line:max-line-length
  it('should not filter options if search query was not provided', () => {
    expect(fixture.debugElement.queryAll(By.css('span')).length)
      .toBe(options.length);
  });

  // tslint:disable-next-line:max-line-length
  it('should filter options by name (character case insensitive)', async () => {
    component.search = 'FIR';
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.debugElement.queryAll(By.css('span')).length).toBe(1);
  });
});
