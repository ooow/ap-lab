import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectHarness } from '@angular/material/select/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {
  LangSelectorComponent,
  Language,
} from 'src/app/shared/component/header/lang-selector/lang-selector.component';
import { LANGUAGES_TOKEN } from 'src/app/store/token/languages.token';
// import {LangSelectorOptionComponent} from 'src/app/shared/component/header/components/lang-selector-option/lang-selector-option.component';
import { LangSelectorHarness } from 'src/app/shared/component/header/lang-selector/lang-selector.harness';

@Component({
  selector: 'tk-test',
  template: '<tk-lang-selector [lang]="lang"></tk-lang-selector>',
})
class TestComponent {
  lang: Language;
}

describe('AppModule => LangSelectorComponent', () => {
  const languages = [Language.ru, Language.en];
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSelectModule, NoopAnimationsModule],
      declarations: [LangSelectorComponent, TestComponent],
      providers: [
        {
          provide: LANGUAGES_TOKEN,
          useValue: languages,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
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
    const harness = await loader.getHarness(LangSelectorHarness);

    expect(await harness.labelText()).toBe('Language');
  });

  // tslint:disable-next-line:max-line-length
  it('should preset provided default language for selector component', async () => {
    const harness = await loader.getHarness(MatSelectHarness);

    component.lang = Language.ru;
    fixture.detectChanges();
    await fixture.whenStable();

    expect(await harness.getValueText()).toBe('Russian');
  });

  // tslint:disable-next-line:max-line-length
  it('should preset provided default language for selector component', async () => {
    const harness = await loader.getHarness(MatSelectHarness);

    component.lang = Language.ru;
    fixture.detectChanges();
    await fixture.whenStable();

    expect(await harness.getValueText()).toBe('Russian');
  });

  // tslint:disable-next-line:max-line-length
  it('should show selector options matching LANGUAGES_TOKEN provided value', async () => {
    const selectorHarness = await loader.getHarness(MatSelectHarness);
    await selectorHarness.open();
    const options = await selectorHarness.getOptions();

    expect(options.length).toBe(languages.length);
    expect(await options[0].getText()).toBe('Russian');
    expect(await options[1].getText()).toBe('English');
  });

  it('should propagate selected option language value', async () => {
    // prettier-ignore
    const langSelectorComponent = fixture.debugElement.query(
      By.css('tk-lang-selector')).componentInstance;
    spyOn(langSelectorComponent.langChanged, 'emit');
    const selectorHarness = await loader.getHarness(MatSelectHarness);
    await selectorHarness.open();
    const [optionHarness] = await selectorHarness.getOptions();
    await optionHarness.click();

    // prettier-ignore
    expect(langSelectorComponent.langChanged.emit)
      .toHaveBeenCalledWith(Language.ru);
  });
});
