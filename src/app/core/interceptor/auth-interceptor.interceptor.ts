import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiI2MSIsInRlbmFudF9lbWFpbCI6ImFheXVzaC5tYW5kbGlrQGdvZGlnaXRhbHRjLmNvbSIsImNyZWF0ZWRfb24iOiI4LzIxLzIwMjUgMTE6MzA6NDQgQU0iLCJleHAiOjE3NjM5MDM1NjR9.yFQVw-VFbxA1CJSBjDGnoUIvvrWQG5fkktCXisLBXGw"

  const modifiedReq = req.clone({
    setHeaders:{
      Authorization: `Bearer ${token}`
    }
  })
  return next(modifiedReq);
};
