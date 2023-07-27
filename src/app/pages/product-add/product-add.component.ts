import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/Service/product.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: ProductService
  ) { }
  f: FormGroup | any
  url:any = 'http://localhost:3000/api/files/image/'
  ngOnInit() {
    this.f = this.fb.group({
      productName: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      image: new FormControl('', []),
      details: new FormControl('', []),
    })
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
  Files: any = [];
  attachFiles: any = [];
  attachFilesName: any = [];
  async onFileChange(files: any) {
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
      // let body = {
      //   filename: '1690483697571-Screenshot_20230215_113023.png'
      // }
      // let image: any = await this.service.getTokenpath('/files/image/' + data.filename)
    this.filename = data.filename
    this.Files = []
    }
  }

  async createProduct() {
    Swal.fire({
      icon: 'success',
      text: 'บันทึกสำเร็จ',
      showConfirmButton: false,
      timer: 1500
    })
    console.log(this.f);

    let userId = sessionStorage.getItem('user')
    let body = {
      productName: this.f.controls.productName.value,
      category: this.f.controls.category.value,
      quantity: this.f.controls.quantity.value,
      price: this.f.controls.price.value,
      image: this.filename,
      details: this.f.controls.details.value,
      status: '1',
      userId: Number(userId),
    }
    console.log(body);

    let data: any = await this.service.postTokenpath('/product', body)
    await setTimeout(() => {
      this.router.navigate(['/product-list'])
    }, 1500);
  }
}
