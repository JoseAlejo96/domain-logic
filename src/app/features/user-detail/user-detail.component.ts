import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../core/interfaces/user';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
})
export class UserDetailComponent {
  /* Se entiende que solo se quiere ver el usuario que hemos seleccionado
  *  Si se quiere acceder a cualquier usuario a traves de la URL, se podria
  *  hacer una llamada al servicio de usuarios y obtener la informacion
  *  de todos los usuarios y filtrar por el usuario que se desee.
  *  En este caso, se ha decidido que solo se muestre el usuario seleccionado
  *  en la pantalla anterior y almacenarlo en el ST para no volver a hacer otra llamada.
  */
  user?: User;

  constructor() {}

  ngOnInit(): void {
    const storedUser = sessionStorage.getItem('userDetail');

    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('userDetail');
  }

}
