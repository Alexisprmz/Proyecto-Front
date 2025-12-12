import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.scss'
})
export class VerifyCodeComponent {
  email = '';
  codeControl = new FormControl('', [Validators.required, Validators.pattern('^[0-9]{6}$')]);
  isLoading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {
    this.email = this.authService.recoveryEmail;
    if (!this.email) this.router.navigate(['/auth/forgot-password']);
  }

  onVerify() {
    if (this.codeControl.invalid) return;
    this.isLoading = true;

    this.authService.verifyRecoveryCode(this.email, Number(this.codeControl.value)).subscribe({
      next: () => {
        this.router.navigate(['/auth/reset-password']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.msg || 'Código incorrecto';
      }
    });
  }
}