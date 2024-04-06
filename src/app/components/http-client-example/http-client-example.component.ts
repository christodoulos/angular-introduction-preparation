import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { JokesService } from 'src/app/shared/services/jokes.service';

@Component({
  selector: 'app-http-client-example',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './http-client-example.component.html',
  styleUrl: './http-client-example.component.css',
})
export class HttpClientExampleComponent {
  jokesService = inject(JokesService);
  dadJoke: string = '';
  chuckNorrisJoke: string = '';

  ngOnInit(): void {
    // this.jokesService.getDadJoke().subscribe((data) => {
    //   this.dadJoke = data.joke;
    // });
    // this.jokesService.getChuckNorrisJoke().subscribe((data) => {
    //   this.chuckNorrisJoke = data.value;
    // });
    this.refreshDadJoke();
    this.refreshChuckNorrisJoke();
  }

  refreshDadJoke() {
    this.jokesService.getDadJoke().subscribe((data) => {
      this.dadJoke = data.joke;
    });
  }

  refreshChuckNorrisJoke() {
    this.jokesService.getChuckNorrisJoke().subscribe((data) => {
      this.chuckNorrisJoke = data.value;
    });
  }
}
