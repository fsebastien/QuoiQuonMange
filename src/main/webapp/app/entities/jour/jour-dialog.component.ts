import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Jour } from './jour.model';
import { JourPopupService } from './jour-popup.service';
import { JourService } from './jour.service';
import { Recette, RecetteService } from '../recette';

@Component({
    selector: 'jhi-jour-dialog',
    templateUrl: './jour-dialog.component.html'
})
export class JourDialogComponent implements OnInit {

    jour: Jour;
    isSaving: boolean;

    recettes: Recette[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private jourService: JourService,
        private recetteService: RecetteService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.recetteService.query()
            .subscribe((res: HttpResponse<Recette[]>) => { this.recettes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.jour.id !== undefined) {
            this.subscribeToSaveResponse(
                this.jourService.update(this.jour));
        } else {
            this.subscribeToSaveResponse(
                this.jourService.create(this.jour));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Jour>>) {
        result.subscribe((res: HttpResponse<Jour>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Jour) {
        this.eventManager.broadcast({ name: 'jourListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRecetteById(index: number, item: Recette) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-jour-popup',
    template: ''
})
export class JourPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jourPopupService: JourPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.jourPopupService
                    .open(JourDialogComponent as Component, params['id']);
            } else {
                this.jourPopupService
                    .open(JourDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
