import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  user: any = {};
  isLoading = false;
  message = '';
  error = '';
  showPasswordSection = false; 
  codeSent = false;           

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', Validators.required]
    });

    this.passwordForm = this.fb.group({
      code: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    const data = localStorage.getItem('user_data');
    if (data) {
      this.user = JSON.parse(data);
      this.profileForm.patchValue({
        nombre: this.user.nombre,
        apellidos: this.user.apellidos,
        telefono: this.user.telefono
      });
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
  onUpdateProfile() {
    if (this.profileForm.invalid) return;

    this.isLoading = true;
    this.message = '';
    this.error = '';

    const updateData = {
      id: this.user.id,
      ...this.profileForm.value
    };

    this.userService.updateProfile(updateData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.message = 'Perfil actualizado correctamente.';
        this.user = { ...this.user, ...this.profileForm.value };
        localStorage.setItem('user_data', JSON.stringify(this.user));
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err.error?.msg || 'Error al actualizar perfil.';
      }
    });
  }
  onRequestCode() {
    this.isLoading = true;
    this.error = '';
    this.message = '';

    this.userService.requestPasswordChange(this.user.email, this.user.nombre).subscribe({
      next: () => {
        this.isLoading = false;
        this.showPasswordSection = true;
        this.codeSent = true;
        this.message = `Código enviado a ${this.user.email}`;
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err.error?.msg || 'No se pudo enviar el código.';
      }
    });
  }

  onConfirmPasswordChange() {
    if (this.passwordForm.invalid) return;

    this.isLoading = true;
    this.error = '';
    this.message = '';

    const { code, newPassword } = this.passwordForm.value;

    this.userService.confirmPasswordChange(this.user.email, parseInt(code), newPassword).subscribe({
      next: () => {
        this.isLoading = false;
        this.message = '¡Contraseña cambiada exitosamente!';
        this.showPasswordSection = false;
        this.codeSent = false;
        this.passwordForm.reset();
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err.error?.msg || 'Código incorrecto o error al cambiar.';
      }
    });
  }
  
  logout() {
      localStorage.clear();
      this.router.navigate(['/auth/login']);
  }
}