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
    this.getAll();
  }
  getAll(){
    this.contactsService.getContact().subscribe(
      (res:any) => {
        this.contacts = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  initForm(): FormGroup{
    return this.fb.group({
      id: [null],
      nombre: [null, [Validators.required]],
      apellido: [null, [Validators.required]],
      telefono: [null, [Validators.required]]
    });
  }
  onSubmit(data:any){
    this.formContact.markAllAsTouched();
    if (!this.formContact.valid) return
    if(!this.formContact.get('id')?.value){
      this.onCreate(data);
    }else{
      this.onEdit(data);
    }
    this.formContact.reset();
  }
  onCreate(data:any){
    this.contactsService.createContact(data).subscribe(
      (res:any) => {
        this.contacts.push(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onEdit(data:any){
    this.contactsService.updateContact(data).subscribe(
      (res:any) => {
        const i = this.contacts.findIndex(x=> x.id === data.id)
        this.contacts[i] = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  cancel(){
    this.formContact.reset();
  }

  edit(id:number){
    const contact = this.contacts.find(x=>x.id === id);
    this.formContact.setValue(contact);
  }

  delete(id:number){
    this.contactsService.deleteContact(id).subscribe(
      () => {
        this.getAll();
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
