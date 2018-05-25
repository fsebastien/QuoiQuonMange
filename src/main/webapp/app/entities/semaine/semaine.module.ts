import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { QuoiQuonMangeSharedModule } from '../../shared';
import {
    SemaineService,
    SemainePopupService,
    SemaineComponent,
    SemaineDetailComponent,
    SemaineDialogComponent,
    SemainePopupComponent,
    SemaineDeletePopupComponent,
    SemaineDeleteDialogComponent,
    semaineRoute,
    semainePopupRoute,
} from './';

const ENTITY_STATES = [
    ...semaineRoute,
    ...semainePopupRoute,
];

@NgModule({
    imports: [
        QuoiQuonMangeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SemaineComponent,
        SemaineDetailComponent,
        SemaineDialogComponent,
        SemaineDeleteDialogComponent,
        SemainePopupComponent,
        SemaineDeletePopupComponent,
    ],
    entryComponents: [
        SemaineComponent,
        SemaineDialogComponent,
        SemainePopupComponent,
        SemaineDeleteDialogComponent,
        SemaineDeletePopupComponent,
    ],
    providers: [
        SemaineService,
        SemainePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuoiQuonMangeSemaineModule {}
