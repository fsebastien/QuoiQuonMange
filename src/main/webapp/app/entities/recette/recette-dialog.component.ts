import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Recette } from './recette.model';
import { RecettePopupService } from './recette-popup.service';
import { RecetteService } from './recette.service';

@Component({
    selector: 'jhi-recette-dialog',
    templateUrl: './recette-dialog.component.html'
})
export class RecetteDialogComponent implements OnInit {

    recette: Recette;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private recetteService: RecetteService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.recette.id !== undefined) {
            this.subscribeToSaveResponse(
                this.recetteService.update(this.recette));
        } else {
            this.subscribeToSaveResponse(
                this.recetteService.create(this.recette));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Recette>>) {
        result.subscribe((res: HttpResponse<Recette>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Recette) {
        this.eventManager.broadcast({ name: 'recetteListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-recette-popup',
    template: ''
})
export class RecettePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private recettePopupService: RecettePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.recettePopupService
                    .open(RecetteDialogComponent as Component, params['id']);
            } else {
                this.recettePopupService
                    .open(RecetteDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
