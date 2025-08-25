import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiI2MSIsInRlbmFudF9lbWFpbCI6ImFheXVzaC5tYW5kbGlrQGdvZGlnaXRhbHRjLmNvbSIsImNyZWF0ZWRfb24iOiI4LzIxLzIwMjUgMTE6MzA6NDQgQU0iLCJleHAiOjE3NTY0Njk3NTV9.9nW090axu-Tolk8zvQxiMegCBpjLcoFItzd6bv26Ld8"

  const modifiedReq = req.clone({
    setHeaders:{
      Authorization: `Bearer ${token}`
    }
  })
  return next(modifiedReq);
};
