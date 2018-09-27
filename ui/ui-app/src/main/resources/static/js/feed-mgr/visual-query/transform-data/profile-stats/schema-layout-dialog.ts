import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {QueryResultColumn} from "../../wrangler";

export class SchemaLayoutDialogData {

    constructor(public items: QueryResultColumn[]) {

    }
}

export class ColumnItem {

    public editMode: boolean = false;
    public origIndex: number;
    public newName: string;
    public newType: string;

    constructor(public origName: string,
                public origType: string) {
        this.newName = this.origName;
        this.newType = this.origType;
    }

    isChanged(): boolean {
        return (this.newName != this.origName || this.isTypeChanged());
    }

    isTypeChanged(): boolean {
        return (this.newType != this.origType);
    }
}

@Component({
    templateUrl: 'schema-layout-dialog.html',
    styleUrls: ["column-analysis.scss"]
})
export class SchemaLayoutDialog {

    public columns: ColumnItem[] = [];

    public trash: ColumnItem[] = [];

    public isValid: boolean = false;


    // @ts-ignore
    constructor(private dialog: MatDialogRef<SchemaLayoutDialog>, @Inject(MAT_DIALOG_DATA) public data: SchemaLayoutDialogData) {
        for (let col of data.items) {
            this.columns.push(new ColumnItem( col.field, col.dataType));
        }
    }

    editMode(i: number): void {
        this.columns[i].editMode = true;
        this.isValid = true;
    }

    remove(i: number): void {
        this.isValid = true;
        this.columns[i].origIndex = i;
        this.trash.push(this.columns[i]);
        this.columns.splice(i, 1)
    }

    restore(i: number): void {
        this.columns.splice(this.trash[i].origIndex, 1, this.trash[i]);
        this.trash.splice(i, 1);
    }

    removeMovedItem(i: number, row: any): void {

    }

    setType(i: number, type: string) {
        this.columns[i].newType = type;
    }

    castOptions() : Array<string> {
        let values : Array<string> = ['string', 'double'];
        return values;
    }

    apply() {
        this.dialog.close(this.columns);
    }

    /**
     * Hides this dialog.
     */
    hide() {
        this.dialog.close(null);
    }
}
