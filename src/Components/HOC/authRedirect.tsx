import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { useFridaySelector } from '../../Redux/Store/store';
import { Navigate } from 'react-router-dom';
import { RoutesXPaths } from '../../Routes/routes';

type DivPropsType = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

type AuthRedirectPagePropsType = DivPropsType & {}

const AuthRedirectPage: React.FC<AuthRedirectPagePropsType> = React.memo( ( { children, ...restProps } ) => {

  const inLoggedIn = useFridaySelector<boolean>( state => state.login.isLoggedIn );

  if ( !inLoggedIn ) {
    return <Navigate to={ RoutesXPaths.LOGIN }/>;
  }
  return (
    <>
      <div { ...restProps }>{ children }</div>
    </>
  );
} );

export default AuthRedirectPage;