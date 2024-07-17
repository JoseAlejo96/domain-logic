import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormService } from '../../core/services/form.service';
import { SearchResult } from '../../core/interfaces/searchResult';
import { User } from '../../core/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css',
})
export class FormularioComponent {
  formulario: FormGroup;
  users: User[] = [];
  searchResult?: SearchResult;
  isFormSubmitted: boolean = false;

  constructor(private formService: FormService, private router: Router) {
    this.formulario = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    });
  }

  get isFormInvalid() {
    return this.formulario.invalid;
  }

  onSubmit() {
    if (this.formulario.valid) {
      const userName = this.formulario.get('userName')?.value;
      this.formService.searchUsers(userName).subscribe(
        (response: SearchResult) => {
          this.searchResult = response;
          this.users = response.items.slice(0, 10);
          this.isFormSubmitted = true;
        },
        (error) => {
          console.error('Hubo un error', error);
        }
      );
    }
  }

  limpiar() {
    this.formulario.reset();
    this.users = [];
    this.isFormSubmitted = false;
  }

  guardarDatos(user: User) {
    sessionStorage.setItem('userDetail', JSON.stringify(user)); // Guarda la búsqueda en sessionStorage
    this.router.navigate(['/user', user.login]);
  }
}
