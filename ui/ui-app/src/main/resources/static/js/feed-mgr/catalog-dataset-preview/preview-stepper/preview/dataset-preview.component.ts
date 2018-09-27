import {Component, Input, OnInit} from "@angular/core";
import {DatasetPreviewDialogComponent, DatasetPreviewDialogData} from "../preview-dialog/dataset-preview-dialog.component";
import {FormGroup} from "@angular/forms";
import {TdDialogService} from "@covalent/core/dialogs";
import {MatDialogConfig, MatTabChangeEvent} from "@angular/material";
import {PreviewSchemaService} from "../../../catalog/datasource/preview-schema/service/preview-schema.service";
import {PreviewRawService} from "../../../catalog/datasource/preview-schema/service/preview-raw.service";
import {PreviewFileDataSet} from "../../../catalog/datasource/preview-schema/model/preview-file-data-set";
import {PreviewDataSet} from "../../../catalog/datasource/preview-schema/model/preview-data-set";
import {SchemaParseSettingsDialog} from "../../../catalog/datasource/preview-schema/schema-parse-settings-dialog.component";
import {SchemaParser} from "../../../model/field-policy";
import {PreviewDataSetRequest} from "../../../catalog/datasource/preview-schema/model/preview-data-set-request";
import {TdLoadingService} from "@covalent/core/loading";
import {DatasetPreviewStepperService} from "../dataset-preview-stepper.service";


@Component({
    selector: "dataset-preview",
    styleUrls:["dataset-preview.component.scss"],
    templateUrl: "dataset-preview.component.html"
})
export class DatasetPreviewComponent implements OnInit{

    @Input()
    displayTitle?:boolean = true;

    @Input()
    dataset:PreviewDataSet



    rawReady:boolean;

    constructor(private _dialogService: TdDialogService,
                private _loadingService:TdLoadingService,
                private previewSchemaService: PreviewSchemaService,
                private datasetPreviewStepperService:DatasetPreviewStepperService,
                private previewRawService:PreviewRawService){

    }
    ngOnInit(){



    }

    onTabChange($event:MatTabChangeEvent){
        //load Raw data if its not there
        if($event.tab.textLabel.toLowerCase() == "raw"){
            if(this.dataset.hasRaw()){
                this.rawReady = true;
            }
            if(this.dataset instanceof PreviewFileDataSet) {

                if (!this.dataset.hasRaw() && !this.dataset.hasRawError()) {
                    this.datasetPreviewStepperService.notifyToUpdateView();
                    this._loadingService.register(DatasetPreviewStepperService.RAW_LOADING)
                    this.previewSchemaService.previewAsTextOrBinary(<PreviewFileDataSet>this.dataset,false,true).subscribe((ds: PreviewDataSet) => {
                        this._loadingService.resolve(DatasetPreviewStepperService.RAW_LOADING)
                        this.rawReady = true;
                        this.dataset.rawLoading = false;
                        this.datasetPreviewStepperService.notifyToUpdateView();
                    }, (error1: any) => {
                        this.rawReady = true;
                        this.dataset.rawLoading = false;
                        this._loadingService.resolve(DatasetPreviewStepperService.RAW_LOADING)
                        this.datasetPreviewStepperService.notifyToUpdateView();
                    });
                }
            }
        }
        this.datasetPreviewStepperService.notifyToUpdateView();
    }


    openSchemaParseSettingsDialog(): void {
        this.datasetPreviewStepperService.openSchemaParseSettingsDialog(<PreviewFileDataSet>this.dataset)
    }


    /**
     * Update the dialog and position it in the center and full screen
     *
     */
    fullscreen(){
        if(this.dataset && this.dataset.preview){
            let dialogConfig:MatDialogConfig = DatasetPreviewDialogComponent.DIALOG_CONFIG()
            let dialogData:DatasetPreviewDialogData = new DatasetPreviewDialogData(this.dataset)
            dialogConfig.data = dialogData;
            this._dialogService.open(DatasetPreviewDialogComponent,dialogConfig);
        }
    }



}