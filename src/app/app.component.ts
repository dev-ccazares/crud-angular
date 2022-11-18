import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crud-angular';
  formContact: FormGroup;
  constructor(private readonly fb: FormBuilder) {
    this.formContact = this.initForm();
  }
  ngOnInit(): void {
    // servicio get
  }

  initForm(): FormGroup{
    return this.fb.group({
      nombre: [null, [Validators.required]],
      apellido: [null, [Validators.required]],
      telefono: [null, [Validators.required]]
    });
  }
  onSubmit(data:any){
    this.formContact.markAllAsTouched();
    if (!this.formContact.valid) return
    console.log(data);
    // servicio post
    this.formContact.reset();
  }


}
