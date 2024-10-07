import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Token {
  permissions?: Record<string, any>;
}

export const UseAceessBtn = () => {
  const [showBtnCreate, setShowBtnCreate] = useState<boolean>(false);
  const [showBtnUpdate, setShowBtnUpdate] = useState<boolean>(false);
  const [showBtnDelete, setShowBtnDelete] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const accessButton = () => {
      const storedValue = localStorage.getItem('auth_token_typeScript');
      if (storedValue) {
        const token = jwt.decode(storedValue) as Token;
        for (const routes in token?.permissions) {
          for (const nestedRoutes in token?.permissions[routes]) {
            console.log('levelTwoValue', token?.permissions[routes]);
            console.log('nestedRoutes', nestedRoutes);
            if (router.pathname.includes(nestedRoutes)) {
              const levelTwoValue = token?.permissions[routes][nestedRoutes];
              if (levelTwoValue.includes('create')) {
                setShowBtnCreate(true);
              } else {
                setShowBtnCreate(false);
              }
              if (levelTwoValue.includes('update')) {
                setShowBtnUpdate(true);
              } else {
                setShowBtnUpdate(false);
              }
              if (levelTwoValue.includes('delete')) {
                setShowBtnDelete(true);
              } else {
                setShowBtnDelete(false);
              }
            }
          }
        }
      }
    };
    accessButton();
  }, [router.pathname]);
  return { showBtnCreate, showBtnUpdate, showBtnDelete };
};
