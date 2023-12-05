/* REQUERIMIENTO 3. Implementar modelo Invoice */

export class Invoice{
  
  invoice_id: number = 0;
  rfc: string = "";
  subtotal: number = 0;
  taxes: number = 0;
  total: number = 0;
  created_at: string = "";
  status: number = 0;
}