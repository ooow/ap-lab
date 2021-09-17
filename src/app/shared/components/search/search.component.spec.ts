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
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { SearchHarness } from 'src/app/shared/components/search/search.harness';

@Pipe({ name: 'searchOptions' })
class MockPipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

@Component({
  selector: 'tk-test',
  template: '<tk-search [options]="options"></tk-search>'
})
class TestComponent {
  options: string[];
}

describe('AppModule => SearchComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let loader: HarnessLoader;
  const options = ['option1', 'option2'];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      declarations: [SearchComponent, MockPipe, TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).not.toBeNull();
  });

  it('should show search field label name "Products"', async () => {
    const search = await loader.getHarness(SearchHarness);

    expect(await search.labelText()).toBe('Products');
  });

  it('should propagate search input field value on change event', async () => {
    const inputText = 'text';
    // prettier-ignore
    const search = fixture.debugElement.query(By.css('tk-search')).componentInstance;
    const input = await loader.getHarness(MatInputHarness);
    spyOn(search.valueChange, 'emit');

    await input.setValue(inputText);

    expect(search.valueChange.emit).toHaveBeenCalledWith('text');
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

    const autocomplete = await loader.getHarness(MatAutocompleteHarness);
    const input = await loader.getHarness(MatInputHarness);
    await input.focus();
    const optionArr = await autocomplete.getOptions();

    expect(optionArr.length).toBe(options.length);
    expect(await optionArr[0].getText()).toBe(options[0]);
    expect(await optionArr[1].getText()).toBe(options[1]);
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

  it('should clear search input on clear button click', async () => {
    const inputText = 'text';
    // prettier-ignore
    const search = fixture.debugElement.query(By.css('tk-search')).componentInstance;
    const input = await loader.getHarness(MatInputHarness);
    spyOn(search.valueChange, 'emit');
    await input.setValue(inputText);

    expect(search.valueChange.emit).toHaveBeenCalledWith(inputText);

    const clear = await loader.getHarness(MatButtonHarness);
    await clear.click();

    expect(search.valueChange.emit).toHaveBeenCalledWith('');
    expect(await input.getValue()).toBe('');
  });

  // tslint:disable-next-line:max-line-length
  it('should show clear button with  "refresh" icon', async () => {
    const clear = await loader.getHarness(MatButtonHarness);
    const icon = await clear.getHarness(MatIconHarness);

    expect(await clear.getText()).toContain('');
    expect(await icon.getName()).toBe('refresh');
  });
});
