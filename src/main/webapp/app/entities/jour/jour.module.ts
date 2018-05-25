import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { QuoiQuonMangeSharedModule } from '../../shared';
import {
    JourService,
    JourPopupService,
    JourComponent,
    JourDetailComponent,
    JourDialogComponent,
    JourPopupComponent,
    JourDeletePopupComponent,
    JourDeleteDialogComponent,
    jourRoute,
    jourPopupRoute,
} from './';

const ENTITY_STATES = [
    ...jourRoute,
    ...jourPopupRoute,
];

@NgModule({
    imports: [
        QuoiQuonMangeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        JourComponent,
        JourDetailComponent,
        JourDialogComponent,
        JourDeleteDialogComponent,
        JourPopupComponent,
        JourDeletePopupComponent,
    ],
    entryComponents: [
        JourComponent,
        JourDialogComponent,
        JourPopupComponent,
        JourDeleteDialogComponent,
        JourDeletePopupComponent,
    ],
    providers: [
        JourService,
        JourPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuoiQuonMangeJourModule {}
