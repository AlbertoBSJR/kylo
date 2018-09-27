import {Component, Injector, Input, OnInit} from '@angular/core';
import {MatTabChangeEvent} from '@angular/material/tabs';

@Component({
    selector: 'profile-container',
    styleUrls: ['profile-container.component.scss'],
    templateUrl: 'profile-container.component.html',
})
export class ProfileContainerComponent implements OnInit {

    @Input() stateParams:any;

    private feedId: string;
    private processingdttm: string;
    private type: string;
    private hiveService: any;
    private timeInMillis: number | Date;

    private tabs = ['stats', 'valid', 'invalid'];
    private selected = 0;

    constructor(private $$angularInjector: Injector) {
        this.hiveService = $$angularInjector.get("HiveService");
    }

    public ngOnInit(): void {
        this.feedId = this.stateParams ? this.stateParams.feedId : undefined;
        this.processingdttm = this.stateParams ? this.stateParams.processingdttm : undefined;
        this.timeInMillis = this.hiveService.getUTCTime(this.processingdttm);
        this.type = this.stateParams ? this.stateParams.t : this.tabs[0];
        this.selected = this.tabs.indexOf(this.type);
    }

    onSelectedTabChange(event: MatTabChangeEvent) {
        this.selected = event.index;
    }
}
