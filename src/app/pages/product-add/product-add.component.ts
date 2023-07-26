import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  constructor(
    private fb: FormBuilder
  ) { }
  f: FormGroup | any

  ngOnInit() {
    this.f = this.fb.group({
      nameProduct: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      img: new FormControl('', []),
    })
  }

  submit() {
    console.log(this.f.controls);

    if (this.f.status === "INVALID") {
      for (let i in this.f.controls) {
        this.f.controls[i].markAsTouched();
      }
    } else {
      this.senddata()
    }

  }

  senddata() {
    alert(this.f.value)
  }


}
