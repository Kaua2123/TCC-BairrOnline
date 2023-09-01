

import { Navigate } from 'react-router-dom';

const RotasPrivadas = ({ userType }) => {

  // Verificar se o usuário está autenticado

  const isAuthenticated = localStorage.getItem('token');

  // Verificar se o tipo de usuário é permitido para a rota

  const isUserAllowed = userType === 'denunciante'; 

  if(!isAuthenticated || !isUserAllowed) {
    return <Navigate to='/Deslogado'/>;
  }
  return null;
};

export default RotasPrivadas;