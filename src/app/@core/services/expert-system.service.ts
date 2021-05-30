import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../../shares/utils/request-util';

@Injectable({
  providedIn: 'root'
})
export class ExpertSystemService {
  constructor(private http: HttpClient) {
  }

  query(): Observable<any> {
    return this.http.get<any[]>(`${environment.apiUrl}/expert-systems`, {
      observe: 'response'
    });
  }

  public updateImg(data: any, file?: File): Observable<any> {
    const model: any = data;
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('model', JSON.stringify(model));
    return this.http.put<any>(`${environment.apiUrl}/expert-systems`, formData, {
      observe: 'response'
    });
  }

  public insert(data: any, file?: File): Observable<any> {
    const model: any = data;
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('model', JSON.stringify(model));
    return this.http.post <any>(`${environment.apiUrl}/expert-systems`, formData, {
      observe: 'response'
    });
  }

  public doSearch(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(`${environment.apiUrl}/expert-systems`, {
      params: options,
      observe: 'response'
    });
  }
  public doSearch1(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(`${environment.apiUrl}/client/expert-systems`, {
      params: options,
      observe: 'response'
    });
  }

  public doSearchByClient(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(`${environment.apiUrl}/client/expert-systems`, {
      params: options,
      observe: 'response'
    });
  }

  public update(data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/expert-systems`, data, {
      observe: 'response'
    });
  }


  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/expert-systems/${id}`);
  }

}
