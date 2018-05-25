import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Jour } from './jour.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Jour>;

@Injectable()
export class JourService {

    private resourceUrl =  SERVER_API_URL + 'api/jours';

    constructor(private http: HttpClient) { }

    create(jour: Jour): Observable<EntityResponseType> {
        const copy = this.convert(jour);
        return this.http.post<Jour>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(jour: Jour): Observable<EntityResponseType> {
        const copy = this.convert(jour);
        return this.http.put<Jour>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Jour>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Jour[]>> {
        const options = createRequestOption(req);
        return this.http.get<Jour[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Jour[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Jour = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Jour[]>): HttpResponse<Jour[]> {
        const jsonResponse: Jour[] = res.body;
        const body: Jour[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Jour.
     */
    private convertItemFromServer(jour: Jour): Jour {
        const copy: Jour = Object.assign({}, jour);
        return copy;
    }

    /**
     * Convert a Jour to a JSON which can be sent to the server.
     */
    private convert(jour: Jour): Jour {
        const copy: Jour = Object.assign({}, jour);
        return copy;
    }
}
