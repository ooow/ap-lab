import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Lang } from '../../models/lang';
import { LangSelectorOptionComponent } from './lang-selector-option.component';
import { LangSelectorOptionHarness } from './lang-selector-option.harness';

@Component({
  selector: 'tk-test',
  template: '<tk-lang-selector-option [lang]="lang"></tk-lang-selector-option>'
})
class TestComponent {
  lang: Lang;
}

describe('AppModule => LangSelectorOptionComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let loader: HarnessLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LangSelectorOptionComponent, TestComponent]
    })
      .overrideComponent(LangSelectorOptionComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).not.toBeNull();
  });

  // tslint:disable-next-line:max-line-length
  it('should show default option if lang property was not provided', async () => {
    const langOption = await loader.getHarness(LangSelectorOptionHarness);
    expect(await langOption.text()).toBe(
      'Provided language is not supported yet'
    );
  });

  it('should show russian language option', async () => {
    component.lang = Lang.ru;

    fixture.detectChanges();
    await fixture.whenStable();

    const langOption = await loader.getHarness(LangSelectorOptionHarness);

    expect(await langOption.text()).toBe('Russian');
  });

  it('should show english language option', async () => {
    component.lang = Lang.en;

    fixture.detectChanges();
    await fixture.whenStable();

    const langOption = await loader.getHarness(LangSelectorOptionHarness);

    expect(await langOption.text()).toBe('English');
  });
});
