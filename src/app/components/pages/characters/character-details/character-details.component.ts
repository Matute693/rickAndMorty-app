import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, take } from 'rxjs';
import { Character } from '@app/shared/interface/character.interface';
import { CharacterService } from '@shared/services/character.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {

  character$: Observable<Character>;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe( take( 1 )).subscribe(( params ) => {
      const id = params['id'];
      this.character$ = this.characterService.getDetaild(id); // Almaceno el personaje seleccionado en un observable
    });
  }

  goBack(): void {
    this.location.back();
    // window.history.back();
  }

}
