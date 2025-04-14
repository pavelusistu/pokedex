import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-detail',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    RouterModule,
    MatIconModule,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  pokemonId: any;
  pokemonDetails: any;
  loading: boolean = true;
  error: string = '';
  catchRate: number = 0;
  catchRatePercentage: number = 0;
  rarity: string = '';
  successfullyCaughtMessage: string = '';
  alreadyCaughtMessage: string = '';

  statsIcons: any = {
    hp: 'favorite',
    attack: 'waving_hand',
    defense: 'shield',
    'special-attack': 'flash_on',
    'special-defense': 'security',
    speed: 'directions_run',
  };

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

        if (typeof window !== 'undefined' && window.localStorage) {
          if (
            this.pokemonDetails &&
            this.pokemonService.isPokemonCaught(this.pokemonDetails.id)
          ) {
            this.alreadyCaughtMessage = `${
              this.pokemonDetails.name.charAt(0).toUpperCase() +
              this.pokemonDetails.name.slice(1)
            } has already been caught!`;
          }
        }

        this.pokemonService
          .getCatchRate(this.pokemonDetails.name)
          .subscribe((catchRate) => {
            this.catchRate = catchRate;
            this.catchRatePercentage = (catchRate / 255) * 100;
            this.rarity = this.pokemonService.getRarity(catchRate);
          });
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
        this.successfullyCaughtMessage = `${
          this.pokemonDetails.name.charAt(0).toUpperCase() +
          this.pokemonDetails.name.slice(1)
        } has been caught!`;
      }
    }
  }
}
