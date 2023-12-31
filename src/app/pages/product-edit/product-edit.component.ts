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
  url:any = 'http://localhost:3000/api/files/image/'
  ngOnInit() {
    this.f = this.fb.group({
      productName: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
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
      image: data.image,
      details: data.details,
      status: data.status,
    });
    this.filename = data.image
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
      image: this.filename,
      status: this.f.controls.status.value,
      userId: Number(userId),
    }
    let data: any = await this.service.patchTokenpath('/product/' + this.route.snapshot.paramMap.get('id'), body)
    await setTimeout(() => {
      this.router.navigate(['/product-list'])
    }, 1500);
  }

  Files: any = [];
  attachFiles: any = [];
  attachFilesName: any = [];
  async onFileChange(files: any) {
    this.filename = ''
    for (var i = 0; i < files.target.files.length; i++) {
      this.Files.push(files.target.files[i]);
    }
    files.target.value = null;
    await this.upLoad();
  }
  filename:any = ''
  async upLoad() {
    this.filename = ''
    let data: any = await this.service.upLoadfile('/files/uploads/' + Number(sessionStorage.getItem('user')), this.Files)
    if(data.filename){
    this.filename = data.filename
    this.Files = []
    }
  }
}
