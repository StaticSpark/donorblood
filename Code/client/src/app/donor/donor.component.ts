import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Donor } from '../shared/sdk/models';
import { DonorApi } from '../shared/sdk/services';

@Component({
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent implements OnInit {
  model: Donor = null;
  errorMessage:string = "";

  save(){
    this.DonorApi.updateAttributes(this.model.id,this.model).subscribe(()=>{
      this.errorMessage = "Updated successfully!";
    },(err:any)=>{
      this.errorMessage = err.error.message;
    });
  }

  delete(){
    this.DonorApi.deleteById(this.model.id).subscribe(()=>{
      this.errorMessage = "Deleted successfully!";
      this.model = null;
    },(err:any)=>{
      this.errorMessage = err.error.message;
    });
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private DonorApi: DonorApi
  ) {}

  ngOnInit() {
    
    this.route.params
      .switchMap((params: Params) => {
        return this.DonorApi.findById(params['id']);
      })
      .subscribe((donor: Donor) =>{
        this.model = donor
      });
  }
}
