import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  constructor(private http: HttpClient) {
    this.currencies =  ["BTC", "ETH", "XRP", "BCH", "USDT"];
    this.base = "BTC";
    this.convertTo = "ETC";
    this.result = this.amount = 0;
  }

  currencies: any;
  base: any;
  amount: any;
  convertTo: any;
  result: any;
  date: any;

  handleSwap(event: any) {
    let temp = this.base;

    this.base = this.convertTo;

    this.convertTo = temp;
    this.amount = this.result;

    this.result = null;

    this.calculate();
  }

  handleInput(event: any) {
    this.amount = event.target.value;
    this.result = null;
    this.date = null;
    this.calculate();
  }

  calculate() {
    const amount = this.amount;
    if (amount == isNaN) {
      return;
    } else {
      const headers = {
        "X-CoinAPI-Key": "112B7EED-9D83-4D40-B607-F0B9F20BCAED",
        Accept: "application/json",
      };
      this.http
        .get<any>(
          `https://rest.coinapi.io/v1/exchangerate/${this.base}/${this.convertTo}`,
          { headers }
        )
        .subscribe((data) => {
          this.result = (data.rate * amount).toFixed(10);
          this.date = data.time.slice(0, 10);
        });
    }
  }

}
