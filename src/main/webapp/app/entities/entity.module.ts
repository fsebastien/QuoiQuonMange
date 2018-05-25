import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { QuoiQuonMangeSemaineModule } from './semaine/semaine.module';
import { QuoiQuonMangeJourModule } from './jour/jour.module';
import { QuoiQuonMangeRecetteModule } from './recette/recette.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        QuoiQuonMangeSemaineModule,
        QuoiQuonMangeJourModule,
        QuoiQuonMangeRecetteModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QuoiQuonMangeEntityModule {}
