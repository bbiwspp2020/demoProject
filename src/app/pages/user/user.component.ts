import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { ProductService } from 'src/Service/product.service';
import { UserService } from 'src/Service/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  checkpath:any = ''
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: UserService,
    private upload: ProductService
  ) { 
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.checkpath = this.router.url;
      }
    });
  }
  f: FormGroup | any
  url: any = 'http://localhost:3000/api/files/image/'
  edit: boolean = true
  ngOnInit(): void {
    this.f = this.fb.group({
      email: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      imgProfile: new FormControl('', []),
    })
    this.getUser()
  }

  async getUser() {
    let data: any = await this.service.getTokenpath('/users/' + sessionStorage.getItem('user'))
    this.f.patchValue({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    });
    this.filename = data.imgProfile
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
  filename: any = ''
  async upLoad() {
    this.filename = ''
    let data: any = await this.upload.upLoadfile('/files/uploads/' + Number(sessionStorage.getItem('user')), this.Files)
    if (data.filename) {
      this.filename = data.filename
      this.Files = []
    }
  }

  submit() {
    if (this.f.status === "INVALID") {
      for (let i in this.f.controls) {
        this.f.controls[i].markAsTouched();
      }
    } else {
      this.updateUser()
    }

  }

  async updateUser() {
    Swal.fire({
      icon: 'success',
      text: 'บันทึกสำเร็จ',
      showConfirmButton: false,
      timer: 1500
    })
    let body = {
      firstName: this.f.controls.firstName.value,
      lastName: this.f.controls.lastName.value,
      imgProfile: this.filename,
    }
    await this.service.patchTokenpath('/users/' + Number(sessionStorage.getItem('user')), body)
    await setTimeout(() => {
      this.router.navigate(['/home'])
    }, 1500);
  }

}
