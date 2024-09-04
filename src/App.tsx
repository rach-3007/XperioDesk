import { AppContent } from "./AppContent";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import LoginPage from "./Pages/LoginPage";
import { loginRequest } from "./Config/authConfig";
function App() {
  {
    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();

    const handleLoginRedirect = () => {
      instance
        .loginRedirect({
          ...loginRequest,
          prompt: "create",
        })
        .catch((error) => console.log(error));
    };

    const handleLogoutRedirect = () => {
      sessionStorage.clear();
      instance.logoutPopup({});
      window.location.reload();
    };

    return (
      <div className="App">
        <AuthenticatedTemplate>
          {activeAccount ? (
            <>
              
                <AppContent />
                
            
            </>
          ) : null}
        </AuthenticatedTemplate>

        <UnauthenticatedTemplate>
          <>
            <LoginPage />
          </>
        </UnauthenticatedTemplate>
      </div>
    );
  }
}
export default App;
