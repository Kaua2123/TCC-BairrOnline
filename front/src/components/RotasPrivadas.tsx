

import { Navigate } from 'react-router-dom';

const RotasPrivadas = ({ children, userType }) => {

  // Verificar se o usuário está autenticado

  const isAuthenticated = localStorage.getItem('token');

  // Verificar se o tipo de usuário é permitido para a rota

  const isUserAllowed = userType === 'denunciante' || userType === 'instituicao' || userType === 'administrador'; 

  if(!isAuthenticated || !isUserAllowed) {
    return <Navigate to='/Deslogado'/>;
  }

  if(!isUserAllowed) {
    return <Navigate to='/'/>
  }

  return children;
};

export default RotasPrivadas;