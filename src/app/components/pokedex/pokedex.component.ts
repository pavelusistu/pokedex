import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PokemonService } from '../../services/pokemon.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit {
  displayedColumns: string[] = ['name', 'action'];
  dataSource: { name: string; url: string }[] = [];

  searchTerm: string = '';
  totalCount: number = 0;
  pageSize = 10;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.fetchPokemon();
  }

  fetchPokemon(): void {
    const offset = this.currentPage * this.pageSize;

    this.pokemonService
      .getPokemonList(offset, this.pageSize)
      .subscribe((data: any) => {
        this.dataSource = data.results;
        this.totalCount = data.count;
      });
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.fetchPokemon();
      return;
    }

    this.pokemonService
      .getPokemonDetails(this.searchTerm.toLowerCase())
      .subscribe({
        next: (data: any) => {
          this.dataSource = [
            {
              name: data.name,
              url: `https://pokeapi.co/api/v2/pokemon/${data.id}`,
            },
          ];
          this.totalCount = 1;
        },
        error: () => {
          this.dataSource = [];
          this.totalCount = 0;
        },
      });
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchPokemon();
  }
}
