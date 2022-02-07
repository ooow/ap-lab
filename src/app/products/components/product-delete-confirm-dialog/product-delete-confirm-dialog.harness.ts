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


    async titleText(): Promise<string> {
        const title = await this.getTitle();
        return title.text();
    }

    async dialogBodyText(): Promise<string> {
        const body = await this.getBody();
        return body.text();
    }

    async cancelButton(): Promise<MatButtonHarness> {
        return this.getCancelButton();
    }

    async clickCancelButton(): Promise<void> {
        const cancelButton = await this.getCancelButton();
        await cancelButton.click();
    }

    async deleteButton(): Promise<MatButtonHarness> {
        return this.getDeleteButton();
    }

    async clickDeleteButton(): Promise<void> {
        const deleteButton = await this.getDeleteButton();
        await deleteButton.click();
    }
}