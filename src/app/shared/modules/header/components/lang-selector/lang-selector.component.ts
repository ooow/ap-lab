import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Lang } from 'src/app/shared/models/lang';
import { LANGUAGES_TOKEN } from 'src/app/shared/tokens/languages.token';

@Component({
  selector: 'tk-lang-selector',
  templateUrl: './lang-selector.component.html'
})
export class LangSelectorComponent {
  @Input() lang: Lang;
  @Output() langChanged = new EventEmitter<Lang>();

  constructor(@Inject(LANGUAGES_TOKEN) readonly langs: ReadonlyArray<Lang>) {}
}
