import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RecetteComponent } from './recette.component';
import { RecetteDetailComponent } from './recette-detail.component';
import { RecettePopupComponent } from './recette-dialog.component';
import { RecetteDeletePopupComponent } from './recette-delete-dialog.component';

export const recetteRoute: Routes = [
    {
        path: 'recette',
        component: RecetteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Recettes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'recette/:id',
        component: RecetteDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Recettes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const recettePopupRoute: Routes = [
    {
        path: 'recette-new',
        component: RecettePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Recettes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'recette/:id/edit',
        component: RecettePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Recettes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'recette/:id/delete',
        component: RecetteDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Recettes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
