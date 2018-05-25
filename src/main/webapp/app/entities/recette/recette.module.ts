import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { QuoiQuonMangeSharedModule } from '../../shared';
import {
    RecetteService,
    RecettePopupService,
    RecetteComponent,
    RecetteDetailComponent,
    RecetteDialogComponent,
    RecettePopupComponent,
    RecetteDeletePopupComponent,
    RecetteDeleteDialogComponent,
    recetteRoute,
    recettePopupRoute,
} from './';

const ENTITY_STATES = [
    ...recetteRoute,
    ...recettePopupRoute,
];

@NgModule({
    imports: [
        QuoiQuonMangeSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RecetteComponent,
        RecetteDetailComponent,
        RecetteDialogComponent,
        RecetteDeleteDialogComponent,
        RecettePopupComponent,
        RecetteDeletePopupComponent,
    ],
    entryComponents: [
        RecetteComponent,
        RecetteDialogComponent,
        RecettePopupComponent,
        RecetteDeleteDialogComponent,
        RecetteDeletePopupComponent,
    ],
    providers: [
        RecetteService,
        RecettePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuoiQuonMangeRecetteModule {}
