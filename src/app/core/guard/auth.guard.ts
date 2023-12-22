import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  user: any;
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
