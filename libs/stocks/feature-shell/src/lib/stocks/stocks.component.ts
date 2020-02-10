import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stockPickerForm: FormGroup;
  symbol: string;
  period: string;

  quotes$ = this.priceQuery.priceQueries$;

  timePeriods = [
    { viewValue: 'All available data', value: 'max' },
    { viewValue: 'Five years', value: '5y' },
    { viewValue: 'Two years', value: '2y' },
    { viewValue: 'One year', value: '1y' },
    { viewValue: 'Year-to-date', value: 'ytd' },
    { viewValue: 'Six months', value: '6m' },
    { viewValue: 'Three months', value: '3m' },
    { viewValue: 'One month', value: '1m' }
  ];

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  dateChange($event, type): void {
    if (type === 'start') {
      const endDate = this.stockPickerForm.get('endDate').value;
      if ($event.value.getTime() > endDate.getTime()) {
        this.stockPickerForm.controls.fromDate.setValue(endDate);
      };
    } else {
      const startDate = this.stockPickerForm.get('startDate').value;
      if ($event.value.getTime() < startDate.getTime()) {
        this.stockPickerForm.controls.endDate.setValue(startDate);
      };
    }
    const symbol = this.stockPickerForm.get('symbol').value;
    if (this.stockPickerForm.valid) {
      this.priceQuery.fetchQuote(symbol, this.stockPickerForm.get('startDate').value, 
      this.stockPickerForm.get('endDate').value);
    }
    

  }


}
