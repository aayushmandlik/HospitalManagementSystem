import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiIwIiwidGVuYW50X2VtYWlsIjoiYWF5dXNoLm1hbmRsaWtAZ29kaWdpdGFsdGMuY29tIiwiY3JlYXRlZF9vbiI6IjgvMjEvMjAyNSAxMTozMDo0NCBBTSIsImV4cCI6MTc1NjEyMTQ0NH0.0mLdEqbCwtsnviquoPg21NYkkhOTDEy0k5_-z7hqslw"

  const modifiedReq = req.clone({
    setHeaders:{
      Authorization: `Bearer ${token}`
    }
  })
  return next(modifiedReq);
};
