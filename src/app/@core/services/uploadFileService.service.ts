import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../../shares/utils/request-util';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  constructor(private http: HttpClient) {
  }

  public upload(req?: any, file?: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    console.log(formData);
    const options = createRequestOption(req);
    return this.http.post<any>(`${environment.apiUrl}/upload`, formData, {
      params: options,
      observe: 'response'
    });
  }

  doSearchByCode(id: any): Observable<any> {
    return this.http.get<any[]>(`${environment.apiUrl}/products-images/${id}`, {
      observe: 'response'
    });
  }

  lock(data?: any): Observable<any> {
    return this.http.post <any>(`${environment.apiUrl}/image-links/lock`, data, {
      observe: 'response'
    });
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/image-links/${id}`);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/files`);
  }
}
