import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoggerService } from 'src/lib/my-core';
import { RESTDAOService } from '../base-code/RESTDAOService';
import { ModoCRUD } from '../base-code/tipos';
import { NavigationService, NotificationService } from '../common-services';
import { Ingredientes, IngredientesDAOService } from '../Ingredientes/servicios.service';
import { AuthService, AUTH_REQUIRED } from '../security';
export class Pizzas {
  id: String = '';
  name: String | null = null;
  price: number | null = null;
  image: String | null = null;
}

@Injectable({
  providedIn: 'root'
})
export class PizzasDAOService extends RESTDAOService<any, any> {
  constructor(http: HttpClient) {
    super(http, 'pizzas', { context: new HttpContext().set(AUTH_REQUIRED, true) });
  }
  page(page: number, rows: number = 20): Observable<{ page: number, pages: number, rows: number, list: Array<any> }> {
    return new Observable(subscriber => {
      this.http.get<{[key: string]: any;}>(`${this.baseUrl}?page=${page}&size=${rows}&sort=name`, this.option)
        .subscribe({
          next: data => subscriber.next({ page: data['number'], pages: data['totalPages'], rows: data['totalElements'], list: data['content']}),
          error: err => subscriber.error(err)
        })
    })
  }
}

@Injectable({
  providedIn: 'root'
})
export class PizzasViewModelService {
  protected modo: ModoCRUD = 'list';
  protected listado: Array<any> = [];
  protected elemento: any = { ingredients: []};
  protected idOriginal: any = null;
  protected listURL = '/pizzas';
  public ingredientes: Array<Ingredientes> = [];

  constructor(protected notify: NotificationService, protected out: LoggerService, protected dao: PizzasDAOService,
    public auth: AuthService, protected router: Router, private navigation: NavigationService, protected daoIngredientes: IngredientesDAOService) { }

  public get Modo(): ModoCRUD { return this.modo; }
  public get Listado(): Array<any> { return this.listado; }
  public get Elemento(): any { return this.elemento; }
  public get isAutenticated(): boolean { return this.auth.isAutenticated; }

  public list(): void {
    this.dao.query().subscribe({
      next: data => {
        this.listado = data;
        this.modo = 'list';
      },
      error: err => this.notify.add(err.message)
    });
  }

  public add(): void {
    this.daoIngredientes.getAll().subscribe({
      next: data  => {
        this.ingredientes = data['content'];
        this.elemento = { ingredients: []};
        this.modo = 'add';
      },
      error: err => this.notify.add(err.message)
    });

  }
  public edit(key: any): void {
    this.dao.get(key).subscribe({
      next: data => {
        this.elemento = data;
        this.idOriginal = key;
        this.modo = 'edit';
      },
      error: err => this.notify.add(err.message)
    });
  }
  public view(key: any): void {
    this.dao.get(key).subscribe({
      next: data => {
        this.elemento = data;
        this.modo = 'view';
      },
      error: err => this.notify.add(err.message)
    });
  }
  public delete(key: any): void {
    if (!window.confirm('¿Seguro?')) { return; }

    this.dao.remove(key).subscribe({
      next: data => this.load(), // this.list(),
      error: err => this.notify.add(err.message)
    });
  }

  public cancel(): void {
    this.elemento = { ingredients: []};
    this.idOriginal = null;
    // this.list();
    // this.load(this.page)
    // this.router.navigateByUrl(this.listURL);
    this.navigation.back()
  }

  public send(): void {
    switch (this.modo) {
      case 'add':
        this.dao.add(this.elemento).subscribe({
          next: data => this.cancel(),
          error: err => this.notify.add(err.message)
        });
        break;
      case 'edit':
        this.dao.change(this.idOriginal, this.elemento).subscribe({
          next: data => this.cancel(),
          error: err => this.notify.add(err.message)
        });
        break;
      case 'view':
        this.cancel();
        break;
    }
  }

  clear() {
    this.elemento = {};
    this.idOriginal = null;
    this.listado = [];
  }

  page = 0;
  totalPages = 0;
  totalRows = 0;
  rowsPerPage = 5;
  load(page: number = -1) {
    if(page < 0) page = this.page
    this.dao.page(page, this.rowsPerPage).subscribe({
      next: rslt => {
        this.page = rslt.page;
        this.totalPages = rslt.pages;
        this.totalRows = rslt.rows;
        this.listado = rslt.list;
        this.modo = 'list';
      },
      error: err => this.notify.add(err.message)
    })
  }

  addIngredient(idIngredient: string){
    for(let letra of idIngredient){
      if(letra != '') {
        this.elemento.ingredients.push(idIngredient);
        return;
      }
    }

  }

  removeIngredient(index: number) {
    if (index < 0 || index >= this.elemento.ingredients.length) {
      this.out.error('Index out of range.');
      return;
    }
    this.elemento.ingredients.splice(index, 1);
  }

  getIngrediente(id: string): any {
    return this.ingredientes.find(item => item.id === id);
  }

}
