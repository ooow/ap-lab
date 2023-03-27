import {InjectionToken} from '@angular/core';
import {Language} from 'src/app/shared/component/header/lang-selector/lang-selector.component';

export const LANGUAGES_TOKEN = new InjectionToken<ReadonlyArray<Language>>(
  'Supported languages');
