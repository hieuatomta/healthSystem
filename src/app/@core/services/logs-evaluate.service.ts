import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../../shares/utils/request-util';

@Injectable({
  providedIn: 'root'
})
export class LogsEvaluateService {
  constructor(private http: HttpClient) {
  }

  public doSearch(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(`${environment.apiUrl}/sys-log-evaluates`, {
      params: options,
      observe: 'response'
    });
  }
  public insertClient(data: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/client/sys-log-evaluates`, data, {
      observe: 'response'
    });
  }

  public updateClient(data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/client/sys-log-evaluates`, data, {
      observe: 'response'
    });
  }
}
