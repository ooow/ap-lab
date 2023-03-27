import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {LANGUAGES_TOKEN} from 'src/app/store/token/languages.token';

export enum Language {
  en = 'English',
  ru = 'Russian'
}

@Component({
  selector   : 'tk-lang-selector',
  templateUrl: './lang-selector.component.html',
  styleUrls  : ['./lang-selector.component.scss'],
})
export class LangSelectorComponent {
  @Input() lang: Language;
  @Output() langChanged = new EventEmitter<Language>();

  constructor(@Inject(
    LANGUAGES_TOKEN) readonly languages: ReadonlyArray<Language>) {}
}
