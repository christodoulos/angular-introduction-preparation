import { Component, inject } from '@angular/core';
import { CrudNavbarComponent } from '../crud-navbar/crud-navbar.component';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { PhoneNumber } from 'src/app/shared/interfaces/customer';

@Component({
  selector: 'app-crud-update-example',
  standalone: true,
  imports: [
    CrudNavbarComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './crud-update-example.component.html',
  styleUrl: './crud-update-example.component.css',
})
export class CrudUpdateExampleComponent {
  customerService = inject(CustomerService);

  searchForm = new FormGroup({
    search: new FormControl(''),
  });

  form = new FormGroup({
    givenName: new FormControl('', Validators.required),
    surName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    afm: new FormControl('', Validators.required),
    phoneNumbers: new FormArray([
      new FormGroup({
        number: new FormControl('', Validators.required),
        type: new FormControl('', Validators.required),
      }),
    ]),
    address: new FormGroup({
      street: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.required),
    }),
  });

  phoneNumbers = this.form.get('phoneNumbers') as FormArray;

  addPhoneNumber() {
    this.phoneNumbers.push(
      new FormGroup({
        number: new FormControl('', Validators.required),
        type: new FormControl('', Validators.required),
      }),
    );
  }

  removePhoneNumber(index: number) {
    this.phoneNumbers.removeAt(index);
  }

  search() {
    const searchValue = this.searchForm.value.search;
    this.customerService.getCustomerByAFM(searchValue).subscribe((customer) => {
      console.log(customer);
      this.form.patchValue({
        givenName: customer.givenName,
        surName: customer.surName,
        email: customer.email,
        afm: customer.afm,
        address: customer.address,
      });

      // Clear the existing FormArray
      this.phoneNumbers.clear();

      console.log(customer.phoneNumbers);

      // Add a new FormGroup to the FormArray for each phoneNumber
      customer.phoneNumbers.forEach((phoneNumber) => {
        this.phoneNumbers.push(this.createPhoneNumberFormGroup(phoneNumber));
      });
    });
  }

  createPhoneNumberFormGroup(phoneNumber: PhoneNumber): FormGroup {
    return new FormGroup({
      number: new FormControl(phoneNumber.number, Validators.required),
      type: new FormControl(phoneNumber.type, Validators.required),
    });
  }

  submit() {}
}
