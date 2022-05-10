import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class FailInterceptor implements HttpInterceptor {
  private readonly errorMessages: ReadonlyArray<string> = [
    'Щось пішло не так',
    'Закешило і не працює',
    'something went wrong',
    'algo salió mal',
    "quelque chose s'est mal passé'",
    '何かがうまくいかなかった',
    'Бекенд поламався',
    'Тирнет здох',
  ];

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map(request => {
        if (!environment.failChance) {
          return request;
        }

        if (this.getRandomNumber(100) < environment.failChance * 100) {
          const message = this.errorMessages[this.getRandomNumber(this.errorMessages.length)];
          throw new Error(message);
        }

        return request;
      })
    );
  }

  private getRandomNumber(maxNumber: number): number {
    return Math.floor(Math.random() * maxNumber);
  }
}
