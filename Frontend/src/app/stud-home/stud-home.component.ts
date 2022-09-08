import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header.service';

@Component({
  selector: 'app-stud-home',
  templateUrl: './stud-home.component.html',
  styleUrls: ['./stud-home.component.css']
})
export class StudHomeComponent implements OnInit {

  constructor(private headservice : HeaderService) { }

  ngOnInit(): void {
    this.headservice.setMenu("student");
  }

}
