import { Routes } from '@angular/router';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { DetailComponent } from './components/detail/detail.component';
import { CaughtComponent } from './components/caught/caught.component';

export const routes: Routes = [
  { path: '', component: PokedexComponent },
  { path: 'pokemon/:id', component: DetailComponent },
  { path: 'caught', component: CaughtComponent },
];
