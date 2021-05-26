import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {createRequestOption} from '../../shares/utils/request-util';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeTestService {
  constructor(private http: HttpClient) {
  }

  public insertXd(data: any): Observable<any> {
    return this.http.post <any>(`${environment.apiUrl}/subclinical-determinations`, data, {
      observe: 'response'
    });
  }

  searchXd(id: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/subclinical-determinations/${id}`, {
      observe: 'response'
    });
  }
  searchXdClient(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any>(`${environment.apiUrl}/client/subclinical-determinations`, {
      params: options,
      observe: 'response'
    });
  }

  deleteXd(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/subclinical-determinations/${id}`);
  }

  query(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(`${environment.apiUrl}/type-tests`, {
      params: options,
      observe: 'response'
    });
  }

  public insert(data): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/type-tests/insert`, data, {
      observe: 'response'
    });
  }

  public delete(body?: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/type-tests/delete`, body, {
      observe: 'response'
    });
  }
}
