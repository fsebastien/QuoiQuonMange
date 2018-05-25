import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Recette } from './recette.model';
import { RecetteService } from './recette.service';

@Component({
    selector: 'jhi-recette-detail',
    templateUrl: './recette-detail.component.html'
})
export class RecetteDetailComponent implements OnInit, OnDestroy {

    recette: Recette;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private recetteService: RecetteService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRecettes();
    }

    load(id) {
        this.recetteService.find(id)
            .subscribe((recetteResponse: HttpResponse<Recette>) => {
                this.recette = recetteResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRecettes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'recetteListModification',
            (response) => this.load(this.recette.id)
        );
    }
}
