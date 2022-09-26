import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { CharacterService } from '@app/shared/services/character.service';
import { Character } from '@shared/interface/character.interface';

type RequestInfo = {
  next: string | null;
}

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  public characters: Character[] = [];
  public info: RequestInfo = {
    next: null
  }
  private pageNum: number = 1;
  private query: string;
  private hideScrollHeight: number = 200;
  private showScrollHeight: number = 500;

  constructor( 
    private characterService: CharacterService,
    private route: ActivatedRoute,
    private router: Router) {
      this.onUrlChanged()
     }

  ngOnInit(): void {
    this.getCharactersByQuery();
  }

  private onUrlChanged(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
         this.characters = [];
         this.pageNum = 1;
         this.getCharactersByQuery();
        });
  }

  private getCharactersByQuery(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params: any) => {
      this.query = params['q'];
      this.getDataFromService();
    });
  }

  private getDataFromService(): void {
    this.characterService.searchCharacter(this.query, this.pageNum)
    .pipe(
      take(1), // Recupero el primer envio de datos de este observable
    ).subscribe(( resp: any) => {
      if( resp?.results?.length ){ // si mi respuesta tiene resultados
        const { info, results } = resp;
        this.characters = [ ...this.characters, ...results];
        this.info = info
      } else {   // Cuando el response no devuelve informacion retorno un array vacio
        this.characters = []
      }
    })
  }

}
