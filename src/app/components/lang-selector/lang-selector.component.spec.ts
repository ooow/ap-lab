import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectHarness } from '@angular/material/select/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Lang } from '../../models/lang';
import { LANGUAGES_TOKEN } from '../../tokens/languages.token';
import { LangSelectorOptionComponent } from '../lang-selector-option/lang-selector-option.component';
import { LangSelectorComponent } from './lang-selector.component';
import { LangSelectorHarness } from './lang-selector.harness';

@Component({
  selector: 'tk-test',
  template:
    '<tk-lang-selector [lang]="lang" (langChanged)="langChanged($event)"></tk-lang-selector>'
})
class TestComponent {
  lang: Lang;

  langChanged(value): void {}
}

describe('AppComponent => LangSelectorComponent', () => {
  const languages = [Lang.ru, Lang.en];
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSelectModule, NoopAnimationsModule],
      declarations: [
        LangSelectorComponent,
        TestComponent,
        LangSelectorOptionComponent
      ],
      providers: [
        {
          provide: LANGUAGES_TOKEN,
          useValue: languages
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should be created', () => {
    expect(component).not.toBeNull();
  });

  it('should show selector label name "Language"', async () => {
    const langSelector = await loader.getHarness(LangSelectorHarness);

    expect(await langSelector.labelText()).toBe('Language');
  });

  // tslint:disable-next-line:max-line-length
  it('should preset provided default language for selector component', async () => {
    component.lang = Lang.ru;
    fixture.detectChanges();
    await fixture.whenStable();

    const selector = await loader.getHarness(MatSelectHarness);

    expect(await selector.getValueText()).toBe('Russian');
  });

  // tslint:disable-next-line:max-line-length
  it('should preset provided default language for selector component', async () => {
    component.lang = Lang.ru;
    fixture.detectChanges();
    await fixture.whenStable();

    const selector = await loader.getHarness(MatSelectHarness);

    expect(await selector.getValueText()).toBe('Russian');
  });

  // tslint:disable-next-line:max-line-length
  it('should show selector options matching LANGUAGES_TOKEN provided value', async () => {
    const selector = await loader.getHarness(MatSelectHarness);
    await selector.open();
    const options = await selector.getOptions();
    expect(options.length).toBe(languages.length);
    expect(await options[0].getText()).toBe('Russian');
    expect(await options[1].getText()).toBe('English');
  });

  it('should propagate selected option language value', async () => {
    spyOn(component, 'langChanged');
    const selector = await loader.getHarness(MatSelectHarness);
    await selector.open();
    const [ruOption] = await selector.getOptions();
    await ruOption.click();

    expect(component.langChanged).toHaveBeenCalledWith(Lang.ru);
  });
});
