import { useRouteError } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="error__page">
      <h2>{error?.status || 'Oops! Something went wrong.'}</h2>
      <p>{error?.statusText || error?.message || 'Page not found'}</p>
    </div>
  );
};

export default ErrorPage;
