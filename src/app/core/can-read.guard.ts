import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService } from '../core/auth.service';
import { tap,map,take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CanReadGuard implements CanActivate {
  constructor(private auth:AuthService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.user$.pipe(
      take(1),
      map(user=> user && this.auth.canRead(user)  ? true: false),
      tap(isAdmin=>{
        if(!isAdmin){
          console.error('Access denied - CanReadGuard')
        }
      })
     );
  }
}
