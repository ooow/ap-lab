import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { take } from 'rxjs/operators';

import { CreateProductModalComponent } from 'src/app/shared/modules/create-product-modal/create-product-modal.component';
import { CreateProductModalHarness } from 'src/app/shared/modules/create-product-modal/create-product-modal.harness';
import { CreateProductModalModule } from 'src/app/shared/modules/create-product-modal/create-product-modal.module';

describe('CreateProductModalComponent', () => {
  @Component({
    template: '<button (click)="open()"></button>'
  })
  class TestComponent {
    dialogRef: MatDialogRef<CreateProductModalComponent>;

    constructor(public dialog: MatDialog) {}

    open(): void {
      this.dialogRef = this.dialog.open(CreateProductModalComponent, {});
    }
  }

  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let harness: CreateProductModalHarness;
  let loader: HarnessLoader;

  const validInputs = {
    name: 'test-name',
    picture: 'https://www.royal-canin.ru/upload/iblock/117/avstr.ovcharka2.jpg',
    description: 'test-description-test-description'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProductModalModule, NoopAnimationsModule],
      declarations: [CreateProductModalComponent, TestComponent]
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;

    component.open();
    fixture.detectChanges();
    await fixture.whenStable();

    loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    harness = await loader.getHarness(CreateProductModalHarness);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be rendered correctly', async () => {
    expect(await harness.titleText()).toBe('Create new product');
    expect(await harness.nameFormField()).toBeTruthy();
    expect(await harness.pictureUrlFormField()).toBeTruthy();
    expect(await harness.descriptionFormField()).toBeTruthy();
    expect(await harness.getCreateBtn()).toBeTruthy();
    expect(await harness.getCancelBtn()).toBeTruthy();
  });

  it('should close dialog on cancel btn click', async () => {
    await harness.cancelBtnClick();
    expect((await loader.getAllHarnesses(MatDialogHarness)).length).toBe(0);
  });

  it('should have create btn disabled by default', async () => {
    const createBtn = await harness.getCreateBtn();
    expect(await createBtn.isDisabled()).toBeTrue();
  });

  it('should have create btn active when provided valid input', async () => {
    const createBtn = await harness.getCreateBtn();
    await harness.setFormValues(validInputs);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(await createBtn.isDisabled()).toBeFalse();
  });

  it('should close dialog and emit valid form values on create btn click', async () => {
    await harness.setFormValues(validInputs);
    await harness.createBtnClick();
    fixture.detectChanges();
    await fixture.whenStable();

    expect((await loader.getAllHarnesses(MatDialogHarness)).length).toBe(0);
    component.dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((formVals) => {
        expect(formVals).toEqual(validInputs);
      });
  });

  describe('Create Product Form', () => {
    describe('Name Input Field', () => {
      let nameFormField: MatFormFieldHarness;
      let nameInput: MatInputHarness;

      beforeEach(async () => {
        nameFormField = await harness.nameFormField();
        nameInput = await harness.nameInput();
      });

      it('should show error message when input field is touched and empty', async () => {
        await nameInput.focus();
        await nameInput.blur();

        expect(await nameFormField.hasErrors()).toBeTrue();
        expect((await nameFormField.getTextErrors())[0]).toBe(
          'You must enter a value'
        );
      });

      it('should show error when entered value is longer than 30 chars', async () => {
        const testValue = 'test-test-test-test-test-test-test';
        await nameInput.setValue(testValue);
        await nameInput.blur();

        expect(await nameFormField.hasErrors()).toBeTrue();
      });

      it('should show error when entered value has invalid chars', async () => {
        const testValue = '@#$';
        await nameInput.setValue(testValue);
        await nameInput.blur();

        expect(await nameFormField.hasErrors()).toBeTrue();
      });

      it('should not show errors when provided a valid input', async () => {
        const testValue = validInputs.name;
        await nameInput.setValue(testValue);
        await nameInput.blur();

        expect(await nameFormField.hasErrors()).toBeFalse();
      });

      it('should clear input text from extra spaces', async () => {
        const testValue = '    test    test   ';
        await nameInput.setValue(testValue);
        await nameInput.blur();

        expect(component.dialogRef.componentInstance.formValues.name).toBe(
          'test test'
        );
      });
    });

    describe('Picture Url Input Field', () => {
      let pictureUrlFormField: MatFormFieldHarness;
      let pictureUrlInput: MatInputHarness;

      beforeEach(async () => {
        pictureUrlFormField = await harness.pictureUrlFormField();
        pictureUrlInput = await harness.pictureUrlInput();
      });

      it('should show error message when input field is touched and empty', async () => {
        await pictureUrlInput.focus();
        await pictureUrlInput.blur();

        expect(await pictureUrlFormField.hasErrors()).toBeTrue();
        expect((await pictureUrlFormField.getTextErrors())[0]).toBe(
          'You must enter a value'
        );
      });

      it('should show error when provided invalid url link', async () => {
        const testValue = 'test';
        await pictureUrlInput.setValue(testValue);
        await pictureUrlInput.blur();

        expect(await pictureUrlFormField.hasErrors()).toBeTrue();
      });

      it('should not show errors when passed all validators', async () => {
        const testValue = validInputs.picture;
        await pictureUrlInput.setValue(testValue);
        await pictureUrlInput.blur();

        expect(await pictureUrlFormField.hasErrors()).toBeFalse();
      });

      it('should show image from provided url when provided valid image url', async (done) => {
        const testValue = validInputs.picture;
        await pictureUrlInput.setValue(testValue);
        await pictureUrlInput.blur();

        setTimeout(async () => {
          const picture = await harness.picture();
          expect(picture).toBeTruthy();
          expect(await picture.getAttribute('src')).toEqual(testValue);
          done();
        }, 500);
      });
    });

    describe('Description Input Field', () => {
      let descriptionFormField: MatFormFieldHarness;
      let descriptionInput: MatInputHarness;

      beforeEach(async () => {
        descriptionFormField = await harness.descriptionFormField();
        descriptionInput = await harness.descriptionInput();
      });

      it('should show error message when input field is touched and empty', async () => {
        await descriptionInput.focus();
        await descriptionInput.blur();

        expect(await descriptionFormField.hasErrors()).toBeTrue();
        expect((await descriptionFormField.getTextErrors())[0]).toBe(
          'You must enter a value'
        );
      });

      it('should show error when entered value is less than 10 chars', async () => {
        const testValue = 'test';
        await descriptionInput.setValue(testValue);
        await descriptionInput.blur();

        expect(await descriptionFormField.hasErrors()).toBeTrue();
      });

      it('should show error when entered value has invalid chars', async () => {
        const testValue = '`^`^`^`^`^`^`^';
        await descriptionInput.setValue(testValue);
        await descriptionInput.blur();

        expect(await descriptionFormField.hasErrors()).toBeTrue();
      });

      it('should not show errors when provided a valid input', async () => {
        const testValue = validInputs.description;
        await descriptionInput.setValue(testValue);
        await descriptionInput.blur();

        expect(await descriptionFormField.hasErrors()).toBeFalse();
      });

      it('should clear input text from extra spaces', async () => {
        const testValue = '    test    test   ';
        await descriptionInput.setValue(testValue);
        await descriptionInput.blur();

        expect(
          component.dialogRef.componentInstance.formValues.description
        ).toBe('test test');
      });
    });
  });
});
