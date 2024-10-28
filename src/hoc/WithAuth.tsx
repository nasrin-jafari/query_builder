// withAuth.tsx

const WithAuth = (WrappedComponent: React.ComponentType<any>) => {
  const AuthenticatedComponent = (props: any) => {

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default WithAuth;
