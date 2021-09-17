import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Lang } from 'src/app/shared/models/lang';

@Component({
  selector: 'tk-lang-selector-option',
  templateUrl: './lang-selector-option.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LangSelectorOptionComponent {
  @Input() lang: Lang;
  readonly Lang = Lang;
}
