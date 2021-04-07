import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {createRequestOption} from '../../shares/utils/request-util';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjectActionService {
  constructor(private http: HttpClient) {
  }

  query(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(`${environment.apiUrl}/object-actions`, {
      params: options,
      observe: 'response'
    });
  }

  // public doSearch(data: any, req?: any): Observable<any> {
  //   const options = createRequestOption(req);
  //   return this.http.post(`${environment.apiUrl}/object-actions/doSearch`, data, {
  //     params: options,
  //     observe: 'response'
  //   });
  // }

  public insert(data): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/object-actions/insert`, data, {
      observe: 'response'
    });
  }

  public delete(body?: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/object-actions/delete`, body, {
      observe: 'response'
    })
  }
}
