import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../../shares/utils/request-util';

@Injectable({
  providedIn: 'root'
})
export class SymptomsService {
  constructor(private http: HttpClient) {
  }

  query(): Observable<any> {
    return this.http.get<any[]>(`${environment.apiUrl}/symptoms`, {
      observe: 'response'
    });
  }

  public doSearch(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(`${environment.apiUrl}/symptoms`, {
      params: options,
      observe: 'response'
    });
  }

  public doSearchGroup(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(`${environment.apiUrl}/symptoms-group`, {
      params: options,
      observe: 'response'
    });
  }

  public doSearchByClient(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(`${environment.apiUrl}/client/symptoms`, {
      params: options,
      observe: 'response'
    });
  }

  public doSearchByClientSubclinical(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(`${environment.apiUrl}/client/status-diseases-subclinical`, {
      params: options,
      observe: 'response'
    });
  }

  public update(data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/symptoms`, data, {
      observe: 'response'
    });
  }

  public insert(data: any): Observable<any> {
    return this.http.post <any>(`${environment.apiUrl}/symptoms`, data, {
      observe: 'response'
    });
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/symptoms/${id}`);
  }

}
