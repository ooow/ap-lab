import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatAutocompleteHarness } from '@angular/material/autocomplete/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatIconHarness } from '@angular/material/icon/testing';
import { MatInputModule } from '@angular/material/input';
import { MatInputHarness } from '@angular/material/input/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from 'src/app/shared/modules/header/components/search/search.component';
import { SearchHarness } from 'src/app/shared/modules/header/components/search/search.harness';
import { SearchTypes } from 'src/app/shared/modules/header/components/search/search.types';
import { MatSelectModule } from '@angular/material/select';

@Pipe({ name: 'searchOptions' })
class MockPipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

@Component({
  selector: 'tk-test',
  template:
    '<tk-search [options]="options" [search]="search" [searchType]="searchType"></tk-search>'
})
class TestComponent {
  options: string[];
  search: string;
  searchType: SearchTypes = SearchTypes.INPUT;
}

describe('AppModule => SearchComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let loader: HarnessLoader;
  let harness: SearchHarness;
  const options = ['option1', 'option2'];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        NoopAnimationsModule,
        MatSelectModule
      ],
      declarations: [SearchComponent, MockPipe, TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    harness = await loader.getHarness(SearchHarness);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).not.toBeNull();
  });

  it('should show search field label name "Products"', async () => {
    const search = await loader.getHarness(SearchHarness);

    expect(await search.labelText()).toBe('Products');
  });

  it('should render input field with reset btn when searchType is Input', async () => {
    expect(await harness.getSelector()).toBeFalsy();
    expect(await harness.getInput()).toBeTruthy();
    expect(await harness.getClearBtn()).toBeTruthy();
  });

  it('should render selector when searchType is Selector', async () => {
    component.searchType = SearchTypes.SELECTOR;

    expect(await harness.getInput()).toBeFalsy();
    expect(await harness.getClearBtn()).toBeFalsy();
    expect(await harness.getSelector()).toBeTruthy();
  });

  it('should propagate search input field value on change event', async () => {
    const inputText = 'text';
    // prettier-ignore
    const search = fixture.debugElement.query(By.css('tk-search')).componentInstance;
    spyOn(search.valueChange, 'emit');

    await harness.setInputValue(inputText);

    expect(search.valueChange.emit).toHaveBeenCalledWith('text');
  });

  it('should propagate search selector field value on change event', async () => {
    // prettier-ignore
    const search = fixture.debugElement.query(By.css('tk-search')).componentInstance;
    component.searchType = SearchTypes.SELECTOR;
    component.options = options;
    spyOn(search.valueChange, 'emit');

    await harness.setSelectorValue(options[1]);

    expect(search.valueChange.emit).toHaveBeenCalledWith(options[1]);
  });

  it('should set search input value from props by default', async () => {
    const testSearch = 'test-search';

    expect(await harness.getInputValue()).toBe('');

    component.search = 'test-search';

    expect(await harness.getInputValue()).toBe(testSearch);
  });

  it('should set search selector value from props by default', async () => {
    component.options = options;
    component.searchType = SearchTypes.SELECTOR;
    fixture.detectChanges();
    await fixture.whenStable();

    expect(await harness.getSelectorValue()).toBe('');

    component.search = options[1];

    expect(await harness.getSelectorValue()).toBe(options[1]);
  });

  // tslint:disable-next-line:max-line-length
  it('should open autocomplete drop down when search input focused', async () => {
    component.options = options;
    fixture.detectChanges();
    await fixture.whenStable();

    const autocomplete = await loader.getHarness(MatAutocompleteHarness);
    const input = await loader.getHarness(MatInputHarness);
    await input.focus();

    expect(await autocomplete.isOpen()).toBeTrue();
  });

  // tslint:disable-next-line:max-line-length
  it('should show autocomplete drop down with list of provided options', async () => {
    component.options = options;
    fixture.detectChanges();
    await fixture.whenStable();

    const inputOptionsList = await harness.getInputOptions();

    expect(inputOptionsList.length).toBe(options.length);
    expect(await inputOptionsList[0].getText()).toBe(options[0]);
    expect(await inputOptionsList[1].getText()).toBe(options[1]);
  });

  it('should show selector options list of provided options', async () => {
    component.options = options;
    component.searchType = SearchTypes.SELECTOR;
    fixture.detectChanges();
    await fixture.whenStable();

    const selectorOptionsList = await harness.getSelectorOptions();

    expect(selectorOptionsList.length).toBe(options.length);
    expect(await selectorOptionsList[0].getText()).toBe(options[0]);
    expect(await selectorOptionsList[1].getText()).toBe(options[1]);
  });

  it('should preselect first autocomplete option when autocomplete drop down opens', async () => {
    component.options = options;
    fixture.detectChanges();
    await fixture.whenStable();

    const autocomplete = await loader.getHarness(MatAutocompleteHarness);
    const input = await loader.getHarness(MatInputHarness);
    await input.focus();

    const [firstOption] = await autocomplete.getOptions();

    expect(await firstOption.isActive()).toBeTrue();
  });

  it('should clear search input on clear btn click', async () => {
    const inputText = 'text';
    // prettier-ignore
    const search = fixture.debugElement.query(By.css('tk-search')).componentInstance;
    spyOn(search.valueChange, 'emit');
    await harness.setInputValue(inputText);

    expect(search.valueChange.emit).toHaveBeenCalledWith(inputText);

    await harness.clearSearch();

    expect(search.valueChange.emit).toHaveBeenCalledWith('');
    expect(await harness.getInputValue()).toBe('');
  });

  // tslint:disable-next-line:max-line-length
  it('should show clear button with  "refresh" icon', async () => {
    const clear = await loader.getHarness(MatButtonHarness);
    const icon = await clear.getHarness(MatIconHarness);

    expect(await clear.getText()).toContain('');
    expect(await icon.getName()).toBe('refresh');
  });
});
