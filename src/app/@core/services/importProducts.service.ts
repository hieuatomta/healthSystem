import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../../shares/utils/request-util';

@Injectable({
  providedIn: 'root'
})
export class ImportProductsService {
  constructor(private http: HttpClient) {
  }

  query(): Observable<any> {
    return this.http.get<any[]>(`${environment.apiUrl}/products/getAll`, {
      observe: 'response'
    });
  }

  doSearchByCode(id: any): Observable<any> {
    return this.http.get<any[]>(`${environment.apiUrl}/detail-import-coupons/${id}`, {
      observe: 'response'
    });
  }

  public doSearch(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(`${environment.apiUrl}/import-coupons`, {
      params: options,
      observe: 'response'
    });
  }

  public update(data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/products`, data, {
      observe: 'response'
    });
  }

  public insert(data: any): Observable<any> {
    return this.http.post <any>(`${environment.apiUrl}/products`, data, {
      observe: 'response'
    });
  }

  public insert1(data: any): Observable<any> {
    return this.http.post <any>(`${environment.apiUrl}/import-coupons`, data, {
      observe: 'response'
    });
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/products/${id}`);
  }

  public insertSizeColor(data: any): Observable<any> {
    return this.http.put <any>(`${environment.apiUrl}/product-size-colors`, data, {
      observe: 'response'
    });
  }

  deleteSizeColor(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/productsSizeColor/${id}`);
  }

}
