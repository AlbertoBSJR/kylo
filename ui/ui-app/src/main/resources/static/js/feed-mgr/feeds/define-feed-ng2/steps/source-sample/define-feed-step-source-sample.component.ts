import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {Feed} from "../../../../model/feed/feed.model";
import {Step} from "../../../../model/feed/feed-step.model";
import {StateService} from "@uirouter/angular";
import {DefineFeedService} from "../../services/define-feed.service";
import {SelectionService} from "../../../../catalog/api/services/selection.service";
import {FeedStepConstants} from "../../../../model/feed/feed-step-constants";
import {PreviewDataSet} from "../../../../catalog/datasource/preview-schema/model/preview-data-set";
import {TdDialogService} from "@covalent/core/dialogs";
import {FeedLoadingService} from "../../services/feed-loading-service";
import {DefineFeedSourceSampleService} from "./define-feed-source-sample.service";
import {DatasetPreviewStepperSavedEvent} from "../../../../catalog-dataset-preview/preview-stepper/dataset-preview-stepper.component";
import {ISubscription} from "rxjs/Subscription";
import {SaveFeedResponse} from "../../model/save-feed-response.model";

@Component({
    selector: "define-feed-step-source-sample",
    styleUrls: ["define-feed-step-source-sample.component.css"],
    templateUrl: "define-feed-step-source-sample.component.html"
})
export class DefineFeedStepSourceSampleComponent implements OnInit, OnDestroy{


    @Input()
    step:Step;

    @Input()
    feed:Feed;

    @Output()
    previewSaved:EventEmitter<DatasetPreviewStepperSavedEvent> = new EventEmitter<DatasetPreviewStepperSavedEvent>();

    /**
     * Flag that is toggled when a user is looking at a feed with a source already defined and they choose to browse the catalog to change the source
     * this will render the catalog selection/browse dialog
     */
    @Input()
    public showCatalog:boolean = false;

    @Output()
    public showCatalogChange:EventEmitter<boolean> = new EventEmitter<boolean>();

    public showCancel:boolean;


    singleSelection: boolean;

    feedSavedSubscription:ISubscription;

    constructor(private defineFeedService:DefineFeedService,private stateService: StateService, private selectionService: SelectionService,
                private _dialogService: TdDialogService,
                private defineFeedSourceSampleService:DefineFeedSourceSampleService,
                private feedLoadingService: FeedLoadingService) {
        this.singleSelection = this.selectionService.isSingleSelection();
       this.feedSavedSubscription  = this.defineFeedService.subscribeToFeedSaveEvent(this.onFeedSaved.bind(this))
    }


    ngOnInit(){



    }

    private init(){
        this.feed =this.defineFeedService.getFeed();
        if(this.feed.isDataTransformation()){
            this.selectionService.multiSelectionStrategy();
        }
        else {
            this.selectionService.singleSelectionStrategy();
        }
        this.step = this.feed.steps.find(step => step.systemName == FeedStepConstants.STEP_FEED_SOURCE);
        this.step.visited = true;



        this.defineFeedSourceSampleService.viewingConnectors();
        this.defineFeedSourceSampleService.setFeed(this.feed);
        this.defineFeedSourceSampleService.setStep(this.step)

        if(this.showCatalog && this.feed.sourceDataSets && this.feed.sourceDataSets.length){
            this.showCancel = true;
        }else {
            this.showCancel = false;
        }
    }

    ngOnDestroy(){
        this.feedSavedSubscription.unsubscribe();
    }

    onFeedSaved(resp:SaveFeedResponse){
        this.init();
    }


    browseCatalog(){
        if(this.feed.sourceDataSets && this.feed.sourceDataSets.length >0){
            this._dialogService.openConfirm({
                message: 'You already have a dataset defined for this feed. Switching the source will result in a new target schema. Are you sure you want to browse for a new dataset? ',
                disableClose: true,
                title: 'Source dataset already defined', //OPTIONAL, hides if not provided
                cancelButton: 'Cancel', //OPTIONAL, defaults to 'CANCEL'
                acceptButton: 'Accept', //OPTIONAL, defaults to 'ACCEPT'
                width: '500px', //OPTIONAL, defaults to 400px
            }).afterClosed().subscribe((accept: boolean) => {
                if (accept) {
                  this.showCatalog = true;
                  this.showCatalogChange.emit(this.showCatalog);
                } else {
                    // no op
                  this.showCatalog = false;
                    this.showCatalogChange.emit(this.showCatalog);
                }
            });
        }
    }

    onSave(previewEvent:DatasetPreviewStepperSavedEvent) {
        this.previewSaved.emit(previewEvent)
    }

    onCancel(){
        //cancel it
        this.showCatalog = false;
        this.showCatalogChange.emit(this.showCatalog);
        this.feed = this.defineFeedService.getFeed();
    }


}