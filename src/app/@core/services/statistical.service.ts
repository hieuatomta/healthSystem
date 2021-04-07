import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {createRequestOption} from '../../shares/utils/request-util';

@Injectable({
  providedIn: 'root'
})
export class StatisticalService {
  constructor(private http: HttpClient) {
  }

  callback(data: any): Observable<any> {
    return this.http.post <any>(`${environment.apiUrl}/orders`, data, {
      observe: 'response'
    });
  }
  public getSendCount(model?: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/statistical/send-count`, model, {
      observe: 'response'
    });
  }
  public getOrdersCount(model?: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/statistical/orders-count`, model, {
      observe: 'response'
    });
  }

  public getDoanhThu(model?: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/statistical/doanh-thu`, model, {
      observe: 'response'
    });
  }

  public getSanPhamBanChay(model?: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/statistical/top-san-pham`, model, {
      observe: 'response'
    });
  }

  public getTopKhachHang(model?: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/statistical/top-khach-hang`, model, {
      observe: 'response'
    });
  }

  public doSearch(req?: any): Observable<any> {
    const options = createRequestOption(req);
    return this.http.get<any[]>(`${environment.apiUrl}/orders`, {
      params: options,
      observe: 'response'
    });
  }

  public update(data: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/sizes`, data, {
      observe: 'response'
    });
  }

  public insert(data: any): Observable<any> {
    return this.http.post <any>(`${environment.apiUrl}/createOrders`, data, {
      observe: 'response'
    });
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/sizes/${id}`);
  }

}
