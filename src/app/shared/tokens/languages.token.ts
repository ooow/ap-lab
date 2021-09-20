import { InjectionToken } from '@angular/core';
import { Lang } from 'src/app/shared/models/lang';

export const LANGUAGES_TOKEN = new InjectionToken<ReadonlyArray<Lang>>(
  'Supported languages'
);
