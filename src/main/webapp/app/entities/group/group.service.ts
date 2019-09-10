import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGroup } from 'app/shared/model/group.model';

type EntityResponseType = HttpResponse<IGroup>;
type EntityArrayResponseType = HttpResponse<IGroup[]>;

@Injectable({ providedIn: 'root' })
export class GroupService {
    private resourceUrl = SERVER_API_URL + 'api/groups';
    private resourceUrl1 = SERVER_API_URL + 'api/searchGroupByName';
    private resourceUrl2 = SERVER_API_URL + 'api/searchGroupByStatus';

    constructor(private http: HttpClient) {}

    create(group: IGroup): Observable<EntityResponseType> {
        return this.http.post<IGroup>(this.resourceUrl, group, { observe: 'response' });
    }

    update(group: IGroup): Observable<EntityResponseType> {
        return this.http.put<IGroup>(this.resourceUrl, group, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IGroup>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGroup[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
   
    searchByName(name: string): Observable<EntityArrayResponseType> {
        return this.http.get<IGroup[]>(`${this.resourceUrl1}/${name}`, { observe: 'response' });
    }
   
    searchByStatus(status: string): Observable<EntityArrayResponseType> {
        return this.http.get<IGroup[]>(`${this.resourceUrl2}/${status}`, { observe: 'response' });
    }
}
