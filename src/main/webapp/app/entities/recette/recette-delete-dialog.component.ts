import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Recette } from './recette.model';
import { RecettePopupService } from './recette-popup.service';
import { RecetteService } from './recette.service';

@Component({
    selector: 'jhi-recette-delete-dialog',
    templateUrl: './recette-delete-dialog.component.html'
})
export class RecetteDeleteDialogComponent {

    recette: Recette;

    constructor(
        private recetteService: RecetteService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.recetteService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'recetteListModification',
                content: 'Deleted an recette'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-recette-delete-popup',
    template: ''
})
export class RecetteDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private recettePopupService: RecettePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.recettePopupService
                .open(RecetteDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
