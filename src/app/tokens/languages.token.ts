import { InjectionToken } from '@angular/core';
import { Lang } from '../models/lang';

export const LANGUAGES_TOKEN = new InjectionToken<ReadonlyArray<Lang>>('Supported languages');
