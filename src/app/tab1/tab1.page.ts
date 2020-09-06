import { Component } from "@angular/core";
import { analyzeAndValidateNgModules } from "@angular/compiler";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  constructor(private http: HttpClient) {
    this.currencies = ["USD", "AUD", "SGD", "PHP", "EUR"];
    this.base = "USD";
    this.convertTo = "EUR";
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
