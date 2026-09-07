import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useAuth } from "../../contexts/AuthContext";

import JoinAsGuestForm from "./JoinAsGuestForm";
import Tabs from "../../components/ui/Tabs";
import SignupForm from "./SignupForm";

function SignUpOptions() {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/game";
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;
    navigate(from);
  }, [isAuthenticated, from, navigate]);

  return (
    <Tabs id="create">
      <Tabs.List>
        <Tabs.Tab id="create">Create an account</Tabs.Tab>
        <Tabs.Tab id="guest">Join as a guest</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel id="create">
        <SignupForm />
      </Tabs.Panel>
      <Tabs.Panel id="guest">
        <JoinAsGuestForm />
      </Tabs.Panel>
    </Tabs>
  );
}

export default SignUpOptions;
