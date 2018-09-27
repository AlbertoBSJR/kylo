import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import {SchemaParser} from "../../../model/field-policy";

@Component({
    selector: 'schema-parse-settings-dialog',
    templateUrl: "schema-parse-settings-dialog.component.html",
})
export class SchemaParseSettingsDialog {
    private selectedParser : SchemaParser;
    private sparkScript:string
    constructor(public dialogRef: MatDialogRef<SchemaParseSettingsDialog>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    this.selectedParser = data.schemaParser;
    this.sparkScript = data.sparkScript;
    }

    apply(){
        console.log("APPLY ",this.selectedParser)
            this.dialogRef.close(this.selectedParser)
    }

     cancel(): void {
            this.dialogRef.close();
    }


}