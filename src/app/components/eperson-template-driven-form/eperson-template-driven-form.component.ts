import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { EPerson } from 'src/app/shared/interfaces/person';

@Component({
  selector: 'app-eperson-template-driven-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './eperson-template-driven-form.component.html',
  styleUrl: './eperson-template-driven-form.component.css',
})
export class EpersonTemplateDrivenFormComponent {
  @Output() person = new EventEmitter<EPerson>();

  onSubmit(value: any) {
    this.person.emit(value as EPerson);
  }
}
