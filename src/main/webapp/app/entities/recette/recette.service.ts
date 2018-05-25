import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Recette } from './recette.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Recette>;

@Injectable()
export class RecetteService {

    private resourceUrl =  SERVER_API_URL + 'api/recettes';

    constructor(private http: HttpClient) { }

    create(recette: Recette): Observable<EntityResponseType> {
        const copy = this.convert(recette);
        return this.http.post<Recette>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(recette: Recette): Observable<EntityResponseType> {
        const copy = this.convert(recette);
        return this.http.put<Recette>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Recette>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Recette[]>> {
        const options = createRequestOption(req);
        return this.http.get<Recette[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Recette[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Recette = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Recette[]>): HttpResponse<Recette[]> {
        const jsonResponse: Recette[] = res.body;
        const body: Recette[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Recette.
     */
    private convertItemFromServer(recette: Recette): Recette {
        const copy: Recette = Object.assign({}, recette);
        return copy;
    }

    /**
     * Convert a Recette to a JSON which can be sent to the server.
     */
    private convert(recette: Recette): Recette {
        const copy: Recette = Object.assign({}, recette);
        return copy;
    }
}
