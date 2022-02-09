import { ComponentHarness, TestElement } from "@angular/cdk/testing";
import { MatButtonHarness } from "@angular/material/button/testing";

export class ProductDeleteConfirmDialogHarness extends ComponentHarness {
    static hostSelector = "tk-product-delete-confirm-dialog";

    getTitle = this.locatorFor("[mat-dialog-title]");
    getBody = this.locatorFor("[mat-dialog-content] p");
    getCancelButton = this.locatorFor(
        MatButtonHarness.with({ text: "Cancel" })
    );
    getDeleteButton = this.locatorFor(
        MatButtonHarness.with({ text: "Delete" })
    );
}