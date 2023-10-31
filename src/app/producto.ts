import { SafeResourceUrl } from "@angular/platform-browser";

export class Producto {
    idProducto: number;
    nombreProducto: string;
    precioProducto: number;
    imagenProducto: File;
    imagenUrl: SafeResourceUrl | null;
}