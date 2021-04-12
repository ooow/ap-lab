import { ChangeDetectionStrategy, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Lang } from '../../models/lang';
import { LangSelectorOptionComponent } from './lang-selector-option.component';

describe('AppModule => LangSelectorOptionComponent', () => {
  let fixture: ComponentFixture<LangSelectorOptionComponent>;
  let component: LangSelectorOptionComponent;

  class Select {
    static get eng(): DebugElement {
      return fixture.debugElement.query(By.css('[data-role="tk-lang-selector-option-en"]'));
    }

    static get rus(): DebugElement {
      return fixture.debugElement.query(By.css('[data-role="tk-lang-selector-option-ru"]'));
    }

    static get default(): DebugElement {
      return fixture.debugElement.query(By.css('[data-role="tk-lang-selector-option-default"]'));
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LangSelectorOptionComponent]
    })
      .overrideComponent(LangSelectorOptionComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(LangSelectorOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).not.toBeNull();
  });

  it('should show russian element', () => {
    expect(Select.rus).toBeNull();

    component.lang = Lang.ru;
    fixture.detectChanges();

    expect(Select.rus).not.toBeNull();
  });

  it('should show english element', () => {
    expect(Select.eng).toBeNull();

    component.lang = Lang.en;
    fixture.detectChanges();

    expect(Select.eng).not.toBeNull();
  });

  it('should show default element', () => {
    expect(Select.default).not.toBeNull();
  });
});
