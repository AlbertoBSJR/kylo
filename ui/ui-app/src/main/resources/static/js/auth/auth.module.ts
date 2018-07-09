import { CommonModule } from "@angular/common";
import { KyloCommonModule } from "../common/common.module";
import {KyloServicesModule} from "../services/services.module";
import { UIRouterModule } from "@uirouter/angular";
import {authStates} from "./auth.states";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import UsersTableComponent from "./users/UsersTableComponent";
import { NgModule } from "@angular/core";
import {NO_ERRORS_SCHEMA} from '@angular/core';
import UserService from "./services/UserService";
import { CovalentDataTableModule } from '@covalent/core/data-table';
import { CovalentPagingModule } from '@covalent/core/paging';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CovalentSearchModule } from '@covalent/core/search';
import UserDetailsComponent from "./users/user-details/UserDetailsComponent";
import { CovalentDialogsModule } from '@covalent/core/dialogs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FlexLayoutModule} from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule, FormControlDirective } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({ 
    declarations: [ 
        UsersTableComponent,
        UserDetailsComponent
    ], 
    imports: [ 
        CommonModule, 
        KyloCommonModule, 
        KyloServicesModule,
        MatProgressBarModule,
        MatDividerModule,
        MatListModule,
        MatTableModule,
        MatIconModule,
        MatCardModule,
        CovalentDataTableModule,
        CovalentPagingModule,
        MatSelectModule,
        MatToolbarModule,
        CovalentSearchModule,
        CovalentDialogsModule,
        MatFormFieldModule,
        MatChipsModule,
        MatInputModule,
        MatAutocompleteModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        UIRouterModule.forChild({states: authStates}) 
    ],
    providers : [UserService],
    schemas : [NO_ERRORS_SCHEMA]
}) 
export class AuthModule { 
} 