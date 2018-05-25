import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Jour } from './jour.model';
import { JourPopupService } from './jour-popup.service';
import { JourService } from './jour.service';

@Component({
    selector: 'jhi-jour-delete-dialog',
    templateUrl: './jour-delete-dialog.component.html'
})
export class JourDeleteDialogComponent {

    jour: Jour;

    constructor(
        private jourService: JourService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.jourService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'jourListModification',
                content: 'Deleted an jour'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-jour-delete-popup',
    template: ''
})
export class JourDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private jourPopupService: JourPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.jourPopupService
                .open(JourDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
