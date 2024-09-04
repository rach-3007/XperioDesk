import {
    AuthenticationResult,
    EventType,
    PublicClientApplication,
  } from "@azure/msal-browser";
  import { ReactNode } from "react";
  import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "../Config/authConfig";
   
  interface AuthProviderProps {
    children: ReactNode;
  }
  const msalInstance = new PublicClientApplication(msalConfig);
   
  export const AuthProvider = ({ children }: AuthProviderProps) => {
   
   
    // Default to using the first account if no account is active on page load
    if (
      !msalInstance.getActiveAccount() &&
      msalInstance.getAllAccounts().length > 0
    ) {
      // Account selection logic is app dependent. Adjust as needed for different use cases.
      msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
    }
   
    // Listen for sign-in event and set active account
    msalInstance.addEventCallback((event) => {
      const authenticationResult = event.payload as AuthenticationResult;
      const account = authenticationResult?.account;
      if (event.eventType === EventType.LOGIN_SUCCESS && account) {
        msalInstance.setActiveAccount(account);
      }
    });
   
    return (
      <MsalProvider instance={msalInstance}>
        {children}
      </MsalProvider>
    );
  };
   
  export const useAuthProvider = () =>{
     return { AuthProvider }
  }