import { Injectable, inject } from '@angular/core';
import { 
  Auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  user,
  User,
  UserCredential
} from '@angular/fire/auth';
import { 
  Firestore, 
  doc, 
  setDoc, 
  getDoc,
  collection,
  DocumentReference 
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface UserData {
  uid: string;
  email: string;
  nom: string;
  prenom: string;
  role: string;
  genre: string;
  createdAt: any; // Utiliser 'any' au lieu de 'Date' pour Firestore Timestamp
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  private router: Router = inject(Router);

  // Observable de l'état d'authentification
  user$: Observable<User | null> = user(this.auth);

  constructor() {}

  /**
   * Inscription avec email et mot de passe
   * @param email Email de l'utilisateur
   * @param password Mot de passe
   * @param nom Nom de famille
   * @param prenom Prénom
   * @param role Rôle de l'utilisateur
   * @param genre Genre de l'utilisateur
   * @returns Promise avec les données de l'utilisateur
   */
  async signUp(
    email: string, 
    password: string, 
    nom: string, 
    prenom: string, 
    role: string, 
    genre: string
  ): Promise<User> {
    try {
      console.log('🔥 Début inscription:', email);
      
      // Créer l'utilisateur avec Firebase Auth
      const credential: UserCredential = await createUserWithEmailAndPassword(
        this.auth, 
        email, 
        password
      );
      
      const user = credential.user;
      console.log('✅ Utilisateur créé dans Authentication:', user.uid);

      // Créer les données utilisateur avec Timestamp Firestore
      const userData: UserData = {
        uid: user.uid,
        email: email,
        nom: nom,
        prenom: prenom,
        role: role,
        genre: genre,
        createdAt: new Date().toISOString() // Convertir en ISO String
      };

      console.log('🔥 Tentative d\'écriture dans Firestore...');
      console.log('📝 Données à enregistrer:', userData);
      
      // Stocker les informations supplémentaires dans Firestore
      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      await setDoc(userDocRef, userData);
      
      console.log('✅ Données sauvegardées dans Firestore avec succès');
      return user;
    } catch (error: any) {
      console.error('❌ Erreur lors de l\'inscription:', error);
      console.error('❌ Code d\'erreur:', error.code);
      console.error('❌ Message:', error.message);
      
      // Si l'erreur vient de Firestore, donner plus de détails
      if (error.code?.includes('firestore') || error.code?.includes('permission-denied')) {
        console.error('❌ Erreur Firestore - Vérifiez les règles de sécurité dans Firebase Console');
        throw new Error('Erreur d\'enregistrement des données. Vérifiez les règles Firestore.');
      }
      
      const errorMessage = this.handleAuthError(error);
      throw new Error(errorMessage);
    }
  }

  /**
   * Connexion avec email et mot de passe
   * @param email Email de l'utilisateur
   * @param password Mot de passe
   * @returns Promise avec les données de l'utilisateur
   */
  async login(email: string, password: string): Promise<User> {
    try {
      console.log('🔥 Tentative de connexion:', email);
      
      const credential: UserCredential = await signInWithEmailAndPassword(
        this.auth, 
        email, 
        password
      );
      
      console.log('✅ Connexion réussie:', credential.user.uid);
      return credential.user;
    } catch (error: any) {
      console.error('❌ Erreur lors de la connexion:', error);
      console.error('❌ Code d\'erreur:', error.code);
      const errorMessage = this.handleAuthError(error);
      throw new Error(errorMessage);
    }
  }

  /**
   * Réinitialisation du mot de passe
   * @param email Email de l'utilisateur
   * @returns Promise<void>
   */
  async resetPassword(email: string): Promise<void> {
    try {
      console.log('🔥 Envoi email de réinitialisation à:', email);
      await sendPasswordResetEmail(this.auth, email);
      console.log('✅ Email de réinitialisation envoyé');
    } catch (error: any) {
      console.error('❌ Erreur lors de la réinitialisation:', error);
      const errorMessage = this.handleAuthError(error);
      throw new Error(errorMessage);
    }
  }

  /**
   * Déconnexion
   * @returns Promise<void>
   */
  async logout(): Promise<void> {
    try {
      console.log('🔥 Déconnexion en cours...');
      await signOut(this.auth);
      console.log('✅ Déconnexion réussie');
      this.router.navigate(['/login']);
    } catch (error: any) {
      console.error('❌ Erreur lors de la déconnexion:', error);
      throw error;
    }
  }

  /**
   * Récupérer l'état d'authentification
   * @returns Observable de l'utilisateur courant
   */
  getAuthState(): Observable<User | null> {
    return this.user$;
  }

  /**
   * Obtenir l'utilisateur actuellement connecté
   * @returns User | null
   */
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  /**
   * Vérifier si un utilisateur est connecté
   * @returns boolean
   */
  isLoggedIn(): boolean {
    return this.auth.currentUser !== null;
  }

  /**
   * Récupérer les données utilisateur depuis Firestore
   * @param uid ID de l'utilisateur
   * @returns Promise avec les données utilisateur
   */
  async getUserData(uid: string): Promise<UserData | null> {
    try {
      console.log('🔥 Récupération des données utilisateur:', uid);
      const userDocRef = doc(this.firestore, `users/${uid}`);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        console.log('✅ Données utilisateur trouvées');
        return userDoc.data() as UserData;
      } else {
        console.log('⚠️ Aucune donnée utilisateur trouvée');
        return null;
      }
    } catch (error: any) {
      console.error('❌ Erreur lors de la récupération des données:', error);
      console.error('❌ Code d\'erreur:', error.code);
      throw error;
    }
  }

  /**
   * Récupérer les données de l'utilisateur connecté
   * @returns Promise avec les données utilisateur
   */
  async getCurrentUserData(): Promise<UserData | null> {
    const currentUser = this.getCurrentUser();
    
    if (!currentUser) {
      console.log('⚠️ Aucun utilisateur connecté');
      return null;
    }

    return this.getUserData(currentUser.uid);
  }

  /**
   * Mettre à jour les données utilisateur dans Firestore
   * @param uid ID de l'utilisateur
   * @param data Données à mettre à jour
   * @returns Promise<void>
   */
  async updateUserData(uid: string, data: Partial<UserData>): Promise<void> {
    try {
      console.log('🔥 Mise à jour des données utilisateur:', uid);
      const userDocRef = doc(this.firestore, `users/${uid}`);
      await setDoc(userDocRef, data, { merge: true });
      console.log('✅ Données utilisateur mises à jour');
    } catch (error: any) {
      console.error('❌ Erreur lors de la mise à jour:', error);
      console.error('❌ Code d\'erreur:', error.code);
      throw error;
    }
  }

  /**
   * Gestion des erreurs d'authentification Firebase
   * @param error Erreur Firebase
   * @returns Message d'erreur en français
   */
  private handleAuthError(error: any): string {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'Cet email est déjà utilisé';
      case 'auth/invalid-email':
        return 'Email invalide';
      case 'auth/operation-not-allowed':
        return 'Opération non autorisée';
      case 'auth/weak-password':
        return 'Le mot de passe est trop faible (minimum 6 caractères)';
      case 'auth/user-disabled':
        return 'Ce compte a été désactivé';
      case 'auth/user-not-found':
        return 'Aucun utilisateur trouvé avec cet email';
      case 'auth/wrong-password':
        return 'Mot de passe incorrect';
      case 'auth/invalid-credential':
        return 'Identifiants invalides';
      case 'auth/too-many-requests':
        return 'Trop de tentatives. Veuillez réessayer plus tard';
      case 'auth/network-request-failed':
        return 'Erreur de connexion réseau';
      case 'auth/popup-closed-by-user':
        return 'Popup fermée par l\'utilisateur';
      case 'permission-denied':
        return 'Permission refusée. Vérifiez les règles de sécurité Firestore.';
      default:
        return error.message || 'Une erreur est survenue';
    }
  }
}