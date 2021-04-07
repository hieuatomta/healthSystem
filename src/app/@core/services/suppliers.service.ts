import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../../shares/utils/request-util';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  constructor(private http: HttpClient) {
  }

  query(): Observable<any> {
    return this.http.get<any[]>(`${environment.apiUrl}/suppliers`, {
      observe: 'response'
    });
  }

  public doSearch(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(`${environment.apiUrl}/suppliers`, {
      params: options,
      observe: 'response'
    });
  }

  public update(data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/suppliers`, data, {
      observe: 'response'
    });
  }

  public insert(data: any): Observable<any> {
    return this.http.post <any>(`${environment.apiUrl}/suppliers`, data, {
      observe: 'response'
    });
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/suppliers/${id}`);
  }

}
