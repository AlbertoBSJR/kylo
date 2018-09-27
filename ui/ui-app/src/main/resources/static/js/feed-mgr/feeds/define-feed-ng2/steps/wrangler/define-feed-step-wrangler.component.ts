import {Component, Injector, Input, ViewChild} from "@angular/core";
import {TdDialogService} from "@covalent/core/dialogs";
import {TranslateService} from '@ngx-translate/core';
import {StateService} from "@uirouter/angular";

import {FeedStepConstants} from "../../../../model/feed/feed-step-constants";
import {VisualQueryStepperComponent} from "../../../../visual-query/visual-query-stepper.component";
import {DefineFeedService} from "../../services/define-feed.service";
import {FeedLoadingService} from "../../services/feed-loading-service";
import {AbstractFeedStepComponent} from "../AbstractFeedStepComponent";
import {FeedSideNavService} from "../../shared/feed-side-nav.service";

@Component({
    selector: "define-feed-step-wrangler",
    templateUrl: "define-feed-step-wrangler.component.html"
})
export class DefineFeedStepWranglerComponent extends AbstractFeedStepComponent {

    @Input() stateParams: any;

    @ViewChild("visualQuery")
    visualQuery: VisualQueryStepperComponent;

    constructor(defineFeedService: DefineFeedService,
                stateService: StateService,
                private _translateService: TranslateService,
                private $$angularInjector: Injector, feedLoadingService: FeedLoadingService,
                dialogService: TdDialogService, feedSideNavService:FeedSideNavService) {
        super(defineFeedService,stateService, feedLoadingService,dialogService, feedSideNavService);
    }

    init() {
        super.init();
    }

    getStepName() {
        return FeedStepConstants.STEP_WRANGLER;
    }
}
