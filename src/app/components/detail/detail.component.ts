import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-detail',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    RouterModule,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  pokemonId: any;
  pokemonDetails: any;
  loading: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.pokemonId = params.get('id');
      this.fetchPokemonDetails();
    });
  }

  fetchPokemonDetails(): void {
    this.pokemonService.getPokemonDetails(this.pokemonId).subscribe({
      next: (data) => {
        this.pokemonDetails = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load Pokémon details';
        this.loading = false;
      },
    });
  }

  catchPokemon(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (
        this.pokemonDetails &&
        !this.pokemonService.isPokemonCaught(this.pokemonDetails.id)
      ) {
        this.pokemonService.saveCaughtPokemon(this.pokemonDetails);
        alert(`${this.pokemonDetails.name} has been caught!`);
      } else {
        alert(`${this.pokemonDetails.name} has already been caught!`);
      }
    }
  }
}
