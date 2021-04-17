import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../../shares/utils/request-util';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) {
  }

  query(): Observable<any> {
    return this.http.get<any[]>(`${environment.apiUrl}/news/getAll`, {
      observe: 'response'
    });
  }

  doSearchByCode(id: any): Observable<any> {
    return this.http.get<any[]>(`${environment.apiUrl}/news-size/${id}`, {
      observe: 'response'
    });
  }

  public doSearch(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(`${environment.apiUrl}/news`, {
      params: options,
      observe: 'response'
    });
  }


  public doSearch1(req?: any, body?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(`${environment.apiUrl}/client/news`, {
      params: options,
      observe: 'response'
    });
  }

  public update(data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/news`, data, {
      observe: 'response'
    });
  }

  public insert(data: any): Observable<any> {
    return this.http.post <any>(`${environment.apiUrl}/news`, data, {
      observe: 'response'
    });
  }


  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/news/${id}`);
  }

  public insertSizeColor(data: any): Observable<any> {
    return this.http.put <any>(`${environment.apiUrl}/product-size-colors`, data, {
      observe: 'response'
    });
  }

  deleteSizeColor(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/newsSizeColor/${id}`);
  }

}
