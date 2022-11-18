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
  async ngOnInit(): Promise<void> {
    const data:any = await this.contactsService.getContact();
    this.contacts = data.response;
  }

  initForm(): FormGroup{
    return this.fb.group({
      nombre: [null, [Validators.required]],
      apellido: [null, [Validators.required]],
      telefono: [null, [Validators.required]]
    });
  }
  async onSubmit(data:any){
    this.formContact.markAllAsTouched();
    if (!this.formContact.valid) return
    await this.contactsService.createContact(data);
    this.contacts.push(data);
    this.formContact.reset();
  }


}
