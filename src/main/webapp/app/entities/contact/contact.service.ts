import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IContact } from 'app/shared/model/contact.model';

type EntityResponseType = HttpResponse<IContact>;
type EntityArrayResponseType = HttpResponse<IContact[]>;

@Injectable({ providedIn: 'root' })
export class ContactService {
    private resourceUrl = SERVER_API_URL + 'api/contacts';
    private resourceUrl1 = SERVER_API_URL + 'api/group';
    private resourceUrl2 = SERVER_API_URL + 'api/searchContactByName';
    private resourceUrl3 = SERVER_API_URL + 'api/searchContactByStatus';
    private resourceUrl4 = SERVER_API_URL + 'api/searchContactByEmail';
    private gid = 0;

    constructor(private http: HttpClient) {}

    create(contact: IContact): Observable<EntityResponseType> {
        return this.http.post<IContact>(this.resourceUrl, contact, { observe: 'response' });
    }

    update(contact: IContact): Observable<EntityResponseType> {
        return this.http.put<IContact>(this.resourceUrl, contact, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IContact>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        this.resourceUrl1 = this.resourceUrl1 ;
        this.gid = req['gid'];
        return this.http.get<IContact[]>(`${this.resourceUrl1}/${this.gid}`, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    findbygroup(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        this.resourceUrl1 = this.resourceUrl1 ;
        return this.http.get<IContact[]>('${this.resourceUrl1)/${req[gid]}', { params: options, observe: 'response' });
    }

    searchByName(id: number, name: string): Observable<EntityArrayResponseType> {
        return this.http.get<IContact[]>(`${this.resourceUrl2}/${id}/${name}`, { observe: 'response' });
    }
   
    searchByStatus(id: number,status: string): Observable<EntityArrayResponseType> {
        return this.http.get<IContact[]>(`${this.resourceUrl3}/${id}/${status}`, { observe: 'response' });
    }

    searchByEmail(id: number,email: string): Observable<EntityArrayResponseType> {
        return this.http.get<IContact[]>(`${this.resourceUrl4}/${id}/${email}`, { observe: 'response' });
    }

}
