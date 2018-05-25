import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Semaine } from './semaine.model';
import { SemainePopupService } from './semaine-popup.service';
import { SemaineService } from './semaine.service';

@Component({
    selector: 'jhi-semaine-delete-dialog',
    templateUrl: './semaine-delete-dialog.component.html'
})
export class SemaineDeleteDialogComponent {

    semaine: Semaine;

    constructor(
        private semaineService: SemaineService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.semaineService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'semaineListModification',
                content: 'Deleted an semaine'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-semaine-delete-popup',
    template: ''
})
export class SemaineDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private semainePopupService: SemainePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.semainePopupService
                .open(SemaineDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
