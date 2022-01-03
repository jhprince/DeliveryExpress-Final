import { Component, OnInit } from '@angular/core';
import { AuthService } from '../AuthService';
import { Chart } from 'angular-highcharts';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  productList: any;

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.authService.ValidateAuthentication();
    this.loadAllProducts();
  }
  chart = new Chart();
  loadAllProducts() {
    this.http.get(`${environment.apiUrl}/products/`)
      .subscribe((res: any) => {
        this.productList = res;
        var series: any[] = [];
        this.productList.forEach((element: any) => {
          series.push({
            name: element.Name,
            type: 'column',
            data: [element.ThresholdQty, element.Stock]
          });
        });

        this.chart = new Chart({
          chart: {
            type: 'column'
          },
          title: {
            text: 'Product Inventory'
          },
          credits: {
            enabled: false
          },
          series: series
        });
      });
  }

}
