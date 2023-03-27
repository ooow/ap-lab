# APlayground Lab 🤩

This project has no goal or a purpose, it is design to practice real project
technologies and focus on code style and review process.

___

## Style Guide

We should keep our code in one good style and for that we usually use official
G style guidelines. You should know them, but there are still not covered cases,
that why we need
additional rules for the project development. Here you can find the project
rules and feel free to use them as templates or rely on them in review
processes.

### TypeScript

#### Common

##### Imports

Specify the full path to the importing element.

```typescript {.good}
   import {CustomService} from 'google3/javascript/project/custom_service';
```

Relative paths in imports are allowed only inside of current directory.

```typescript {.good}
   import {CustomService} from './custom_service';
```

Do not write relative path for imports outside of current directory.

```typescript {.bad}
   import {CustomService} from './services/custom_service';
   import {CustomInterface} from '../../interfaces/custom_interface';
```

#### Components

##### Naming

Here is a template for a component structure file naming.

  ```
  component.ts
  component.ng.html
  component.scss
  component_test.ts
  testing/component_harness.ts
  ```

Do not use dash(***-***) in the naming, use underscore(***_***) instead.

##### Structure

Here is a good example of component structure. Fields, constants, method and all
other stuff are split into logical blocks. Keeping this style makes code more
simple and improves readability.

> Note: All empty lines between blocks are necessary.

```typescript {.good}
   import {Component, Inject, Input, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
   import {MatAutocomplete} from '@angular/material/autocomplete';
   import {CustomService} from 'google3/javascript/project/custom_service';
 
   /** Description of the interface. */
   export interface CustomInterface {
     field: string,
   }
 
   /** Description of the interface. */
   interface CustomInnerInterface {
     field: string,
   }
 
   /** Description of the constant. */
   export const CONSTANT_STRING = 'CONSTANT STRING';
   /** Description of the constant. */
   export const constantObject = {key: value};
   /** Description of the constant. */ // Optional.
   const constantInner = {key: value};
 
   /**
    * Description of the component.
    */
   @Component({
     selector: 'tk-custom-component', // Add `tk` prefix for custom selectors.
     styleUrls: ['./custom_component.css'],
     templateUrl: './custom_component.ng.html',
   })
   export class CustomComponent implements OnInit {
     constructor(
        @Inject(INJECTABLE) injectable: Injectable,
        customService: CustomService,
        readonly customService: CustomService,
        private readonly customService: CustomService,
     ) {}
 
     @Input() input: string;
     @Output() output = new EventEmitter<string>();
 
     @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
 
     field: Field;
     readonly field: ReadonlyField;
     private readonly field: PrivateReadonlyField;
 
     ngOnInit() {}
 
     publicMethod() {}
 
     protected protectedMethod() {}
 
     private privateMethod() {}
   }
 
   /** Description of the function. */
   export function func() {}
 
   /** Description of the function. */ // Optional.
   function funcInner() {}
 
```

##### Fields naming

Only fields selected from the store should be named with '$' on the end.

#### Modules

##### Naming style

Module should be named by adding suffix 'Module' to the component that is
provided by this module.

```typescript {.good}
   import {CommonModule} from '@angular/common';
   import {NgModule} from '@angular/core';
 
   import {ProvidedComponent} from './provided_component';
 
   @NgModule({
     declarations: [ProvidedComponent],
     exports: [ProvidedComponent],
     imports: [],
   })
   export class ProvidedComponentModule {
   }
```

##### Dependencies importing style

Imports should be sorted alphabetically.

```typescript {.good}
   @NgModule({
     imports: [
         CommonModule,
         MatIconModule,
         MatTooltipModule,
     ],
   })
```

```typescript {.bad}
   @NgModule({
     imports: [
         MatIconModule,
         CommonModule,    // Not alphabetically sorted.
         MatTooltipModule,
     ],
   })
```

##### Dependencies control

Do not import dependency module if it not used. There is no automatic tool for
detecting useless import. Such cases should be checked manually by analyzing
provided component and template.

#### Testing

##### Finding elements

Good practice:

* Use standard attributes like class, value, name or data-* attribute.

```typescript {.good}
   const img = getEl('img[alt="Creator"]')
 
   const button = getEl('.custom-button-class');  // Class is exist and has styles.
```

Bad practice:

* Adding id/class attributes to the element just for test purposes.
* Using of getEls() and then accessing element by index of array.

```typescript {.bad}
   const customButton = getEls('button')[1];
   const icons = getEls('mat-icon');
 
   expect(icons[0].innerText).toBe('cancel');
 
   // Makes test less comprehensive and relies on order of elements
```

### HTML

#### Attributes

HTML attributes are split into the next logical blocks:

1. \#
2. \# with value
3. \* - Directives
4. Attributes without value (key attributes)
5. Attributes with value
6. Attributes in square brackets
7. Attributes in square and round brackets
8. Attributes in round brackets

Those blocks should be kept exactly in this order.

> Note: Each block should be sorted alphabetically.

Here is a good example of attributes ordering.

```html {.good}
  <component #component
             #ngModel="model"
             *ngDirective="value"
             attr-without-value
             attr-with-value="value"
             [attr-in-square-brackets]="value"
             [(attr-in-square-round-brackets)]="value"
             (attr-in-round-brackets)="value">
  </component>
```

This project was generated
with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app
will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can
also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in
the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests
via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests
via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out
the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
