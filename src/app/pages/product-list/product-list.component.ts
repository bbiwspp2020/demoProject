import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/Service/product.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  p: any = 1;
  value: any = ''
  data: any = [];
  constructor(
    private service: ProductService
  ) { }

  ngOnInit(): void {
    this.getAllproducts()
  }

  async getAllproducts() {
    let data: any = await this.service.getTokenpath('/product')
    this.data = data
  }

  deleteitem(id: any) {
    Swal.fire({
      icon: 'warning',
      text: 'ต้องการลบสินค้าหรือไม่?',
      showCancelButton: true,
      showConfirmButton: false,
      showDenyButton: true,
      denyButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isDenied) {
        this.service.deleteTokenpath('/product/' + id)
        Swal.fire({
          icon: 'success',
          text: 'ลบสำเร็จ',
          showConfirmButton: false,
          timer: 1500
        })
        this.getAllproducts()
      }
    })
  }
}
