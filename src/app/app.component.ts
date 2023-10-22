import { Component, OnInit } from '@angular/core';
import { Producto } from './producto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './app.normalize.css', './app.skeleton.css']
})
export class AppComponent implements OnInit {
  carrito: any;
  contenedorCarrito: any;
  vaciarCarritoBtn: any;
  confirmarPedidoBtn: any;
  listarCombos: any;
  articulosCarrito: any[] = [];
  producto : Producto = new Producto();
  productos: Producto[] = [];
  ngOnInit() {
    this.carrito = document.querySelector('#carrito');
    this.contenedorCarrito = document.querySelector('#lista-carrito tbody');
    this.vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
    this.listarCombos = document.querySelector('#lista-combos');
    this.confirmarPedidoBtn = document.querySelector('#confirmar-pedido');
  
    this.cargarEventListeners();
  }
  /*
    Aqui creamos la funcion onSubmit
  */
    onFileSelected(event: any) {
      const file: File = event.target.files[0];
      this.producto.imagenProducto = file;
    }
  onSubmit(){
    this.guardarProductos();
  }
  guardarProductos(){
    //Ahora mismo todo se guarda de forma local, nada mas para testear
    this.productos.push(this.producto);
  }
  cargarEventListeners() {
    if (this.listarCombos) {
      this.listarCombos.addEventListener('click', this.agregarCombos.bind(this));
    }
  
    if (this.carrito) {
      this.carrito.addEventListener('click', this.eliminarCombo.bind(this));
    }
  
    document.addEventListener('DOMContentLoaded', () => {
      this.articulosCarrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  
      this.carritoHTML();
    });

    if (this.confirmarPedidoBtn) {
      this.confirmarPedidoBtn.addEventListener('click', this.confirmarPedido.bind(this));
    }
  
    if (this.vaciarCarritoBtn) {
      this.vaciarCarritoBtn.addEventListener('click', () => {
        this.articulosCarrito = [];
        this.limpiarHTML();
        this.carritoHTML();
      });
    }
  }
  
  agregarCombos(e: Event) {
    e.preventDefault();
  
    if ((e.target as HTMLElement).classList.contains('agregar-carrito')) {
      const comboSeleccionado = (e.target as HTMLElement).parentElement?.parentElement;
      if (comboSeleccionado) {
        this.leerDatosCombo(comboSeleccionado);
      }
    }
  }

  confirmarPedido() {
    const header = document.querySelector('#header');
  
    if (header) {
      const mensaje = document.createElement('div');
      mensaje.classList.add('form-container');
      mensaje.style.textAlign = 'center';
      mensaje.style.padding = '10px';
      mensaje.style.marginTop = '10px';
      mensaje.style.borderRadius = '5px';
  
      const submitButton = document.createElement('button');
      submitButton.textContent = 'Listo';
      submitButton.style.padding = '10px';
      submitButton.style.borderRadius = '5px';
      submitButton.style.backgroundColor = '#4CAF50';
      submitButton.style.color = 'white';
      submitButton.style.border = 'none';
      submitButton.style.cursor = 'pointer';
  
      if (this.articulosCarrito.length > 0) {
        // Clear any existing message
        while (header.firstChild) {
          header.removeChild(header.firstChild);
        }
  
        const form = document.createElement('form');
        form.style.backgroundColor = 'white';
        form.style.padding = '20px';
        form.style.borderRadius = '5px';
        form.style.width = '300px';
        form.style.margin = 'auto';
        form.style.display = 'flex';
        form.style.flexDirection = 'column';
        form.style.gap = '10px';
  
        const labelStyle = 'font-size: 1.2rem !important; color: rgb(43, 109, 253) !important; font-family: fantasy !important; font-weight: bold !important; margin-bottom: 5px !important;';
        const inputStyle = 'padding: 8px !important; border-radius: 5px !important; border: 1px solid #ddd !important;';
  
        form.innerHTML = `
          <label for="address" style="${labelStyle}">Ingrese su dirección:</label>
          <input type="text" id="address" style="${inputStyle}" name="address">
        `;
  
        submitButton.addEventListener('click', () => {
          this.articulosCarrito = [];
          this.limpiarHTML();
          this.carritoHTML();
          form.style.display = 'none';
          const row = document.createElement('div');
          row.classList.add('row');
          const headerContent = document.querySelector('#header-content');
          if (headerContent) {
            headerContent.appendChild(row);
            mensaje.textContent = '¡¡Gracias por su pedido!!';
            mensaje.style.color = 'white';
            mensaje.style.backgroundColor = 'green';
            localStorage.setItem('pedidoRealizado', 'true');
          }
        });
  
        form.appendChild(submitButton);
        mensaje.style.color = 'black';
        mensaje.style.backgroundColor = 'white';
  
        header.appendChild(mensaje);
        header.appendChild(form);
      } else {
        mensaje.textContent = 'El carrito está vacío';
        mensaje.style.color = 'black';
        mensaje.style.backgroundColor = 'yellow';
        header.appendChild(mensaje);
      }
  
      const pedidoRealizado = localStorage.getItem('pedidoRealizado');
      if (pedidoRealizado === 'true') {
        const row = document.createElement('div');
        row.classList.add('row');
        const headerContent = document.querySelector('#header-content');
        if (headerContent) {
          headerContent.appendChild(row);
          mensaje.textContent = '¡¡Gracias por su pedido!!';
          mensaje.style.color = 'white';
          mensaje.style.backgroundColor = 'green';
        }
      }
  
      // Remove the message after 3 seconds
      setTimeout(() => {
        header.removeChild(mensaje);
        localStorage.removeItem('pedidoRealizado');
      }, 3000);
    }
  }
  
  
  
  eliminarCombo(e: Event) {
    if ((e.target as HTMLElement).classList.contains('borrar-combo')) {
      const comboId = (e.target as HTMLElement).getAttribute('data-id');
      if (comboId) {
        this.articulosCarrito = this.articulosCarrito.filter((combo) => combo.id !== comboId);
        this.carritoHTML();
      }
    }
  }
  
  leerDatosCombo(combo: any) {
    if (combo) {
      const infoCombo = {
        imagen: combo.querySelector('img')?.src,
        titulo: combo.querySelector('h4')?.textContent,
        precio: combo.querySelector('.precio span')?.textContent,
        id: combo.querySelector('a')?.getAttribute('data-id'),
        cantidad: 1
      };
  
      if (infoCombo.imagen && infoCombo.titulo && infoCombo.precio && infoCombo.id) {
        const existe = this.articulosCarrito.some((combo) => combo.id === infoCombo.id);
        if (existe) {
          const combos = this.articulosCarrito.map((combo) => {
            if (combo.id === infoCombo.id) {
              combo.cantidad++;
              return combo;
            } else {
              return combo;
            }
          });
          this.articulosCarrito = [...combos];
        } else {
          this.articulosCarrito = [...this.articulosCarrito, infoCombo];
        }
  
        this.carritoHTML();
      }
    }
  }
  
  // carritoHTML() {
  //   this.limpiarHTML();
  
  //   this.articulosCarrito.forEach((combo) => {
  //     const { imagen, titulo, precio, cantidad, id } = combo;
  //     const row = document.createElement('tr');
  //     if (imagen && titulo && precio) {
  //       row.innerHTML = `
  //         <td>
  //             <img src="${imagen}" width="100">
  //         </td>
  //         <td>${titulo}</td>
  //         <td>${precio}</td>
  //         <td>${cantidad}</td>
  //         <td>
  //             <a href="#" class="borrar-combo" data-id="${id}"> X </a>
  //         </td>
  //       `;
  
  //       this.contenedorCarrito?.appendChild(row);
  //     }
  //   });
  
  //   this.sincronizarStorage();
  // }

  carritoHTML() {
    this.limpiarHTML();
  
    let totalPrice = 0;
  
    this.articulosCarrito.forEach((combo) => {
      const { imagen, titulo, precio, cantidad, id } = combo;
      const row = document.createElement('tr');
      if (imagen && titulo && precio) {
        const precioNumerico = parseInt(precio.replace('$', '', ' ','Gs')) || 0;
        const totalComboPrice = precioNumerico * cantidad;
        totalPrice += totalComboPrice;
        row.innerHTML = `
          <td>
              <img src="${imagen}" width="100">
          </td>
          <td>${titulo}</td>
          <td>${precio}</td>
          <td>${cantidad}</td>
          <td>
              <a href="#" class="borrar-combo" data-id="${id}"> X </a>
          </td>
        `;
  
        this.contenedorCarrito?.appendChild(row);
      }
    });

    const saltoLine = document.createElement('br');
    this.contenedorCarrito?.appendChild(saltoLine);
  
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
      <td colspan="2"></td>
      <td>Total a Pagar:</td>
      <td class="total-price" style="font-weight: bold; font-size: 1.4rem;">${totalPrice} Gs</td>
      <td></td>
    `;
    this.contenedorCarrito?.appendChild(totalRow);
  
    this.sincronizarStorage();
  }
  
  
  sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(this.articulosCarrito));
  }
  
  limpiarHTML() {
    while (this.contenedorCarrito && this.contenedorCarrito.firstChild) {
      this.contenedorCarrito.removeChild(this.contenedorCarrito.firstChild);
    }
  }
  }
  
  