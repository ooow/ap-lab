import {
  DebugElement,
  NO_ERRORS_SCHEMA,
  Pipe,
  PipeTransform
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { By } from '@angular/platform-browser';
import { SearchComponent } from './search.component';

@Pipe({ name: 'searchOptions' })
class MockPipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

describe('AppComponent => SearchComponent', () => {
  let fixture: ComponentFixture<SearchComponent>;
  let component: SearchComponent;

  class Select {
    static get searchClear(): DebugElement {
      return fixture.debugElement.query(
        By.css('[data-role="tk-search-clear"]')
      );
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatAutocompleteModule],
      declarations: [SearchComponent, MockPipe],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).not.toBeNull();
  });

  describe('search field value change event', () => {
    let value;

    beforeEach(() => {
      value = 'value';
      spyOn(component.valueChange, 'emit');
    });

    it('should propagate value on search field control value change', () => {
      component.searchControl.setValue(value);
      fixture.detectChanges();

      expect(component.valueChange.emit).toHaveBeenCalledWith(value);
    });

    it('should propagate empty string value on clear button click', () => {
      component.searchControl.setValue(value);
      fixture.detectChanges();

      Select.searchClear.triggerEventHandler('click', {});
      fixture.detectChanges();

      expect(component.valueChange.emit).toHaveBeenCalledTimes(2);
      expect(component.valueChange.emit).toHaveBeenCalledWith('');
      expect(component.searchControl.value).toBe('');
    });
  });
});
