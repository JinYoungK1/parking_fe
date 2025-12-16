import React from 'react';
import { useCookies } from 'react-cookie';
import { isExpired } from 'react-jwt';
import { Navigate } from 'react-router-dom';

import { OSUNG_FOOD_JWT_ACCESS_KEY } from '~/config/environment';

interface Props {
  children: React.ReactNode;
}

export default function LoginRequiredRoute({ children }: Props) {
  const [cookies] = useCookies([OSUNG_FOOD_JWT_ACCESS_KEY]);
  const isMyTokenExpired = isExpired(cookies.osung_food_access_token);

  if (!cookies.osung_food_access_token || isMyTokenExpired) {
    return <Navigate to={'/'} replace />;
  }

  return <>{children}</>;
}
