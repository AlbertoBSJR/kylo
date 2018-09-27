import {DefineFeedService} from "../../services/define-feed.service";
import {TdDialogService} from "@covalent/core/dialogs";
import {FeedSideNavService} from "../../shared/feed-side-nav.service";
import {FeedLoadingService} from "../../services/feed-loading-service";
import {FormGroup} from "@angular/forms";
import {FeedStepConstants} from "../../../../model/feed/feed-step-constants";
import {AbstractFeedStepComponent} from "../AbstractFeedStepComponent";
import {StateRegistry, StateService} from "@uirouter/angular";
import {Component, ViewChild} from "@angular/core";
import {PropertyListComponent} from "../../../../shared/property-list/property-list.component";
import {Observable} from "rxjs/Observable";

@Component({
    selector: "define-feed-properties",
    styleUrls: ["define-feed-properties.component.scss"],
    templateUrl: "define-feed-properties.component.html"
})
export class DefineFeedPropertiesComponent extends AbstractFeedStepComponent {

    displayEditActions:boolean

    /**
     * The form for this step
     */
    formGroup:FormGroup;

    @ViewChild("propertyList")
    propertyList: PropertyListComponent;

    constructor(defineFeedService: DefineFeedService,
                stateService: StateService,
                feedLoadingService:FeedLoadingService,
                dialogService: TdDialogService,
                feedSideNavService:FeedSideNavService){
        super(defineFeedService,stateService, feedLoadingService,dialogService, feedSideNavService);
        this.formGroup = new FormGroup({})
    }

    init() {
        super.init();




        if(!this.feed.readonly && this.feed.properties.length >0){
            this.displayEditActions = true;
        }
    }
    destroy(){

    }

    ngAfterViewInit(){
        this.subscribeToFormDirtyCheck(this.formGroup);

        this.formGroup.get('userPropertyForm').valueChanges.subscribe(changes => {
            console.log('form changes',changes)
            if(!this.feed.readonly){
                this.displayEditActions = true;
            }
        });
    }

    /**
     * Return the name of this step
     * @return {string}
     */
    getStepName() {
        return FeedStepConstants.STEP_PROPERTIES;
    }


    cancelFeedEdit(){
        this.propertyList.reset(this.feed.userProperties);
    }

    /**
     * Update the feed model with the form values
     */
    protected  applyUpdatesToFeed() :(Observable<any>| null){
        //update the model
        let formModel = this.formGroup.value;

        if(this.propertyList) {
            this.propertyList.updateModel();
        }
        //this.feed. .... = formModel. ...
        return null;
    }


}