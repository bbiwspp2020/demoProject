import { Component } from '@angular/core';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  p: any = 1;
  data: any = [
    {
      id: 1,
      img: 'https://cdn.pixabay.com/photo/2016/02/18/19/25/pc-1207886_1280.jpg',
      name: 'Mac',
      count: 99,
    },
    {
      id: 2,
      img: 'https://media.istockphoto.com/id/1459070950/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%9B%E0%B9%8B%E0%B8%B2%E0%B8%9A%E0%B8%99%E0%B9%81%E0%B8%9B%E0%B9%89%E0%B8%99%E0%B8%9E%E0%B8%B4%E0%B8%A1%E0%B8%9E%E0%B9%8C%E0%B9%81%E0%B8%A5%E0%B9%87%E0%B8%9B%E0%B8%97%E0%B9%87%E0%B8%AD%E0%B8%9B%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%81%E0%B8%AA%E0%B8%94%E0%B8%87%E0%B8%9C%E0%B8%A5-3d.jpg?s=2048x2048&w=is&k=20&c=o8kwoa33XRkPJ5uZfDMeBY6QIOk7ikwzsWgVQpf0aO4=',
      name: 'Mac',
      count: 9,
    },
    {
      id: 3,
      img: 'https://cdn.pixabay.com/photo/2016/02/18/19/25/pc-1207886_1280.jpg',
      name: 'MacMacMacMacMacMacMacMacMacMac',
      count: 15,
    },
    {
      id: 4,
      img: 'https://cdn.pixabay.com/photo/2016/02/18/19/25/pc-1207886_1280.jpg',
      name: 'Mac',
      count: 55,
    },
    {
      id: 5,
      img: 'https://cdn.pixabay.com/photo/2016/02/18/19/25/pc-1207886_1280.jpg',
      name: 'Mac',
      count: 32,
    },
    {
      id: 6,
      img: 'https://cdn.pixabay.com/photo/2016/02/18/19/25/pc-1207886_1280.jpg',
      name: 'Mac',
      count: 44,
    },
    {
      id: 7,
      img: 'https://cdn.pixabay.com/photo/2016/02/18/19/25/pc-1207886_1280.jpg',
      name: 'Mac',
      count: 8,
    },
    {
      id: 8,
      img: 'https://cdn.pixabay.com/photo/2016/02/18/19/25/pc-1207886_1280.jpg',
      name: 'Mac',
      count: 85,
    },
    {
      id: 9,
      img: 'https://cdn.pixabay.com/photo/2016/02/18/19/25/pc-1207886_1280.jpg',
      name: 'Mac',
      count: 12,
    },
    {
      id: 10,
      img: 'https://cdn.pixabay.com/photo/2016/02/18/19/25/pc-1207886_1280.jpg',
      name: 'Mac',
      count: 34,
    },
    {
      id: 11,
      img: 'https://cdn.pixabay.com/photo/2016/02/18/19/25/pc-1207886_1280.jpg',
      name: 'Mac',
      count: 5,
    },
    {
      id: 12,
      img: 'https://cdn.pixabay.com/photo/2016/02/18/19/25/pc-1207886_1280.jpg',
      name: 'Mac',
      count: 0,
    },
    {
      id: 13,
      img: 'https://cdn.pixabay.com/photo/2016/02/18/19/25/pc-1207886_1280.jpg',
      name: 'Mac',
      count: 77,
    },
    {
      id: 14,
      img: 'https://cdn.pixabay.com/photo/2016/02/18/19/25/pc-1207886_1280.jpg',
      name: 'Mac',
      count: 66,
    },
  ];

  deleteitem(id:any){
    Swal.fire({
      icon:'warning',
      text: 'ต้องการลบสินค้าหรือไม่?',
      showCancelButton: true,
      showConfirmButton:false,
      showDenyButton:true,
      denyButtonText:'ตกลง',
      cancelButtonText:'ยกเลิก'
    }).then((result) => {
      if (result.isDenied) {
        Swal.fire({
          icon: 'success',
          text: 'ลบสำเร็จ',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
}
