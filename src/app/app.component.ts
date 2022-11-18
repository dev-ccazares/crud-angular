import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactsService } from './contacts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crud-angular';
  formContact: FormGroup;
  contacts:Array<any> = [];
  constructor(
    private readonly fb: FormBuilder,
    private readonly contactsService: ContactsService
    ) {
    this.formContact = this.initForm();
  }
  ngOnInit(): void {
    this.contactsService.getContact().subscribe(
      (res:any) => {
        this.contacts = res.response;
      },
      (err) => {
        console.log(err);
      }
    );
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
    this.contactsService.createContact(data).subscribe(
      (res:any) => {
        this.contacts.push(res.response);
      },
      (err) => {
        console.log(err);
      }
    );
    this.formContact.reset();
  }


}
