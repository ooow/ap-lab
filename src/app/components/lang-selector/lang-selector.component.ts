import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Lang } from '../../models/lang';

@Component({
  selector: 'tk-lang-selector',
  templateUrl: './lang-selector.component.html',
  styleUrls: ['./lang-selector.component.scss'],
})
export class LangSelectorComponent {
  @Input() lang: Lang;
  @Output() langChanged = new EventEmitter<Lang>();
}
