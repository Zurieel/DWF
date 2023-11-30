import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartCommunicationService {

  private rfcSource = new Subject<string>();

  rfc$ = this.rfcSource.asObservable();

  notificarRFC(rfc: string) {
    this.rfcSource.next(rfc);
  }

  // ... (otros métodos y propiedades)
  
  constructor() { }
}