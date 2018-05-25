import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Semaine } from './semaine.model';
import { SemaineService } from './semaine.service';

@Component({
    selector: 'jhi-semaine-detail',
    templateUrl: './semaine-detail.component.html'
})
export class SemaineDetailComponent implements OnInit, OnDestroy {

    semaine: Semaine;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private semaineService: SemaineService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSemaines();
    }

    load(id) {
        this.semaineService.find(id)
            .subscribe((semaineResponse: HttpResponse<Semaine>) => {
                this.semaine = semaineResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSemaines() {
        this.eventSubscriber = this.eventManager.subscribe(
            'semaineListModification',
            (response) => this.load(this.semaine.id)
        );
    }
}
