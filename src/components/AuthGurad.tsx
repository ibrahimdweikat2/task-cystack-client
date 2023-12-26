import useAuth from '../hooks/useAuth';

const AuthGuard = ({ children }: any) => {
  const auth = useAuth();

  return <>{children}</>;
};

export default AuthGuard;