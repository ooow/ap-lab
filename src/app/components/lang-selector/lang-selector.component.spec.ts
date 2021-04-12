import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Lang } from '../../models/lang';
import { LANGUAGES_TOKEN } from '../../tokens/languages.token';
import { LangSelectorComponent } from './lang-selector.component';

describe('AppComponent => LangSelectorComponent', () => {
  const languages = [Lang.ru, Lang.en];
  let fixture: ComponentFixture<LangSelectorComponent>;
  let component: LangSelectorComponent;

  class Select {
    static get matSelect(): DebugElement {
      return fixture.debugElement.query(By.css('[data-role="tk-lang-selector-mat-select"]'));
    }

    static get matOptions(): DebugElement[] {
      return fixture.debugElement.queryAll(By.css('[data-role="tk-lang-selector-mat-option"]'));
    }

    static tkOption(container: DebugElement): DebugElement {
      return container.query(By.css('tk-lang-selector-option'));
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LangSelectorComponent],
      providers: [
        {
          provide: LANGUAGES_TOKEN,
          useValue: languages
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LangSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).not.toBeNull();
  });

  it('should set default value for `mat-select` component', () => {
    component.lang = Lang.ru;
    fixture.detectChanges();

    expect(Select.matSelect.properties.value).toBe(Lang.ru);
  });

  it('should show `mat-options` components matching LANGUAGES_TOKEN provided value', () => {
    const [ruOption, enOption] = Select.matOptions;
    const [ru, en] = languages;

    expect(Select.matOptions.length).toBe(languages.length);

    expect(ruOption.properties.value).toBe(ru);
    expect(enOption.properties.value).toBe(en);
  });

  it('should show `tk-lang-selector-option` components with appropriate provided `lang` value', () => {
    const [ruOption, enOption] = Select.matOptions;
    const [ru, en] = languages;

    expect(Select.tkOption(ruOption).properties.lang).toBe(ru);
    expect(Select.tkOption(enOption).properties.lang).toBe(en);
  });

  it('should propagate selected language value', () => {
    spyOn(component.langChanged, 'emit');
    Select.matSelect.triggerEventHandler('valueChange', Lang.ru);
    fixture.detectChanges();

    expect(component.langChanged.emit).toHaveBeenCalledWith(Lang.ru);
  });
});
