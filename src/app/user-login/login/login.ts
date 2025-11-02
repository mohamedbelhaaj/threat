import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {  AuthService } from '../../services/auth'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
   private fb: FormBuilder;
  private authService: AuthService;
  private router: Router;

  // Formulaires
  loginForm: FormGroup;
  signupForm: FormGroup;
  
  // États
  message: string = '';
  isLoading: boolean = false;
  isLoginMode: boolean = true;

  constructor() {
    // Injection des services
    this.fb = inject(FormBuilder);
    this.authService = inject(AuthService);
    this.router = inject(Router);

    // Formulaire de connexion
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Formulaire d'inscription
    this.signupForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      genre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Vérifier si l'utilisateur est déjà connecté
    try {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser) {
        this.router.navigate(['/soc']);
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'utilisateur:', error);
    }
  }

  /**
   * Basculer entre mode connexion et inscription
   */
  switchMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.message = '';
    // Réinitialiser les formulaires
    this.loginForm.reset();
    this.signupForm.reset();
  }

  /**
   * Connexion de l'utilisateur
   */
  async onLogin(): Promise<void> {
    // Validation du formulaire
    if (this.loginForm.invalid) {
      this.message = 'Veuillez remplir tous les champs correctement';
      return;
    }

    this.isLoading = true;
    this.message = '';

    try {
      const { email, password } = this.loginForm.value;
      await this.authService.login(email, password);
      
      // Connexion réussie
      this.message = 'Connexion réussie!';
      
      // Redirection après un court délai
      setTimeout(() => {
        this.router.navigate(['/soc']);
      }, 500);
      
    } catch (error: any) {
      console.error('Erreur de connexion:', error);
      // Extraire le message d'erreur
      this.message = error?.message || error || 'Erreur lors de la connexion';
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Inscription d'un nouvel utilisateur
   */
  async onSignup(): Promise<void> {
    // Validation du formulaire
    if (this.signupForm.invalid) {
      this.message = 'Veuillez remplir tous les champs correctement';
      return;
    }

    this.isLoading = true;
    this.message = '';

    try {
      const { email, password, nom, prenom, role, genre } = this.signupForm.value;
      
      await this.authService.signUp(
        email, 
        password, 
        nom, 
        prenom, 
        role, 
        genre
      );
      
      // Inscription réussie
      this.message = 'Inscription réussie! Vous pouvez maintenant vous connecter.';
      
      // Basculer vers le mode connexion après 2 secondes
      setTimeout(() => {
        this.isLoginMode = true;
        this.signupForm.reset();
        this.message = '';
      }, 2000);
      
    } catch (error: any) {
      console.error('Erreur d\'inscription:', error);
      // Extraire le message d'erreur
      this.message = error?.message || error || 'Erreur lors de l\'inscription';
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Réinitialisation du mot de passe
   */
  async resetPassword(): Promise<void> {
    const email = this.loginForm.get('email')?.value;
    
    if (!email) {
      this.message = 'Veuillez entrer votre email pour réinitialiser le mot de passe';
      return;
    }

    if (this.loginForm.get('email')?.invalid) {
      this.message = 'Veuillez entrer une adresse email valide';
      return;
    }

    this.isLoading = true;
    this.message = '';

    try {
      await this.authService.resetPassword(email);
      this.message = '✅ Un email de réinitialisation a été envoyé. Vérifiez votre boîte mail.';
    } catch (error: any) {
      console.error('Erreur de réinitialisation:', error);
      // Extraire le message d'erreur
      this.message = error?.message || error || 'Erreur lors de la réinitialisation';
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * Obtenir le message d'erreur pour un champ spécifique
   */
  getFieldError(form: FormGroup, fieldName: string): string {
    const field = form.get(fieldName);
    
    if (field?.hasError('required')) {
      return 'Ce champ est requis';
    }
    if (field?.hasError('email')) {
      return 'Email invalide';
    }
    if (field?.hasError('minlength')) {
      return `Minimum ${field.errors?.['minlength'].requiredLength} caractères`;
    }
    
    return '';
  }

  /**
   * Vérifier si un champ est invalide et touché
   */
  isFieldInvalid(form: FormGroup, fieldName: string): boolean {
    const field = form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  /**
   * Vérifier si le message est une erreur
   */
  isErrorMessage(): boolean {
    if (!this.message || typeof this.message !== 'string') return false;
    return this.message.toLowerCase().includes('erreur') || 
           this.message.toLowerCase().includes('incorrect') ||
           this.message.toLowerCase().includes('invalide') ||
           this.message.toLowerCase().includes('échec');
  }

  /**
   * Vérifier si le message est un succès
   */
  isSuccessMessage(): boolean {
    if (!this.message || typeof this.message !== 'string') return false;
    return this.message.toLowerCase().includes('réussi') || 
           this.message.includes('✅');
  }
}