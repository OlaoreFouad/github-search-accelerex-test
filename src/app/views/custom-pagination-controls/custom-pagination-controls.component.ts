import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-pagination-controls',
  templateUrl: './custom-pagination-controls.component.html',
  styleUrls: ['./custom-pagination-controls.component.scss']
})
export class CustomPaginationControlsComponent implements OnInit {

  @Input() id: string;
  @Input() maxSize: number;
  @Output() pageChange: EventEmitter<number>;
  @Output() pageBoundsCorrection: EventEmitter<number>;

  constructor() { }

  ngOnInit() {
  }

}
