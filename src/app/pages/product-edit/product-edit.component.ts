import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/Service/product.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: ProductService,
    private route: ActivatedRoute
  ) {
  }
  f: FormGroup | any

  ngOnInit() {
    this.f = this.fb.group({
      productName: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      img: new FormControl('', []),
      details: new FormControl('', []),
    })
    this.getProductbyid()
  }

  async getProductbyid() {
    let data: any = await this.service.getTokenpath('/product/' + this.route.snapshot.paramMap.get('id'))
    this.f.patchValue({
      productName: data.productName,
      category: data.category,
      quantity: data.quantity,
      price: data.price,
      img: data.img,
      details: data.details,
    });
    
  }

  submit() {
    if (this.f.status === "INVALID") {
      for (let i in this.f.controls) {
        this.f.controls[i].markAsTouched();
      }
    } else {
      this.createProduct()
    }

  }

  async createProduct() {
    Swal.fire({
      icon: 'success',
      text: 'บันทึกสำเร็จ',
      showConfirmButton: false,
      timer: 1500
    })
    let userId = sessionStorage.getItem('user')
    let body = {
      productName: this.f.controls.productName.value,
      category: this.f.controls.category.value,
      quantity: this.f.controls.quantity.value,
      price: this.f.controls.price.value,
      details: this.f.controls.details.value,
      status: '2',
      userId: Number(userId),
    }
    let data: any = await this.service.patchTokenpath('/product/' + this.route.snapshot.paramMap.get('id'), body)
    await setTimeout(() => {
      this.router.navigate(['/product-list'])
    }, 1500);
  }
}
