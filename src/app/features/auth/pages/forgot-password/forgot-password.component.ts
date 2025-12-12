import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  isLoading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSendCode() {
    if (this.emailControl.invalid) return;
    this.isLoading = true;
    this.errorMessage = '';

    const email = this.emailControl.value || '';

    this.authService.sendRecoveryCode(email).subscribe({
      next: () => {
        this.authService.recoveryEmail = email;
        this.router.navigate(['/auth/verify-code']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.msg || 'Error al enviar código';
      }
    });
  }
}