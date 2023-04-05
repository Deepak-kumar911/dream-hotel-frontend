import React from 'react';
import { Navigate} from 'react-router-dom';

export const ProtectedRoute = ({state, Children}) => {
  if(state.login && state.payload.isAdmin){
    return Children
  }
  return <Navigate to="/" replace />
}
