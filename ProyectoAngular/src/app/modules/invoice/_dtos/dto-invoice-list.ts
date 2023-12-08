import { Customer } from "../../customer/_models/customer";
import { Item } from "../_models/item";

/* REQUERIMIENTO 3. Implementar modelo Invoice */
export class DtoInvoiceList{
    customer: Customer = new Customer();
    invoice_id: number = 0;
    rfc: string = "";
    subtotal: number = 0;
    taxes: number = 0;
    total: number = 0;
    created_at: Date = new Date();
    items: Item[] = [];
}