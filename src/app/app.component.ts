import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  name = 'Christodoulos';

  person = {
    givenName: 'Christodoulos',
    surName: 'Fragoudakis',
    age: 0x37,
    email: 'chfrag@aueb.gr',
  };
}
