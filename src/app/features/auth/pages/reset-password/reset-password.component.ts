import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  passControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  isLoading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {
    if (!this.authService.recoveryEmail) this.router.navigate(['/auth/forgot-password']);
  }

  onReset() {
    if (this.passControl.invalid) return;
    this.isLoading = true;

    this.authService.resetPassword(this.authService.recoveryEmail, this.passControl.value || '').subscribe({
      next: () => {
        alert('¡Contraseña actualizada! Inicia sesión.');
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.msg || 'Error al actualizar';
      }
    });
  }
}