import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { ChartDataSets } from "chart.js";
import { Color, Label } from "ng2-charts";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  constructor(private http: HttpClient) {
    this.currencies = ["BTC", "ETH", "XRP", "BCH", "USDT"];
    this.base = "BTC";
    this.convertTo = "ETH";
    this.result = this.amount = 0;
  }
  chartData: ChartDataSets[] = [{ data: [], label: "Price" }];
  chartLabels: Label[];

  // Options
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: "Historic Price",
    },
    pan: {
      enabled: true,
      mode: "xy",
    },
    zoom: {
      enabled: true,
      mode: "xy",
    },
  };
  chartColors: Color[] = [
    {
      borderColor: "#000000",
      backgroundColor: "#3880ff",
    },
  ];
  chartType = "line";
  showData = false;

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
    this.getHistoricData();
  }

  handleInput(event: any) {
    this.amount = event.target.value;
    this.result = null;
    this.date = null;
    this.calculate();
    this.getHistoricData();
  }

  calculate() {
    const amount = this.amount;
    if (amount == isNaN) {
      return;
    } else {
      const headers = {
        "X-CoinAPI-Key": "6CAEBD25-DA7B-4801-A894-87F236DBC6B8",
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
  getHistoricData() {
    const headers = {
      "X-CoinAPI-Key": "6CAEBD25-DA7B-4801-A894-87F236DBC6B8",
      Accept: "application/json",
    };
    this.http
      .get<any>(
        `https://rest.coinapi.io/v1/ohlcv/${this.base}/${this.convertTo}/history?period_id=1MTH&time_start=2020-01-01T00:00:00`,
        { headers }
      )
      .subscribe((data) => {
        if (data === undefined || data.length == 0) {
          return;
        }
        this.showData = true;
        this.chartLabels = [];
        this.chartData[0].data = [];
        this.chartData[0].label = `1 ${this.convertTo} in ${this.base}`;
        data.forEach((entry) => {
          let date = new Date(entry.time_close).toLocaleDateString();
          this.chartLabels.push(date);
          this.chartData[0].data.push(entry.price_close);
        });
      });
  }
}
