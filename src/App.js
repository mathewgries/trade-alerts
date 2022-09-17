import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AlertNew from "./components/alerts/AlertNew";
import AlertAdd from "./components/alerts/AlertAdd";
import AlertEdit from "./components/alerts/AlertEdit";
import AlertDetailsEdit from "./components/alerts/AlertDetailsEdit";
import CredentialsUpdate from "./components/auth/CredentialsUpdate";
import RefreshTokenNew from "./components/auth/RefreshTokenNew";
import RefreshTokenUpdate from "./components/auth/RefreshTokenUpdate";
import Guides from "./components/guides/Guides";
import CreateAPIAccount from "./components/guides/CreateAPIAccount";
import AppInstall from "./components/guides/AppInstall";
import AuthPage from "./components/auth/AuthPage";

import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="app-container">
      <div>
        <Navbar />
      </div>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/alert-new" element={<AlertNew />} />
          <Route exact path="/alert-add/:id" element={<AlertAdd />} />
          <Route exact path="/alert-edit/:id" element={<AlertEdit />} />
          <Route exact path="/alert-details/edit/:id" element={<AlertDetailsEdit />} />
          <Route exact path="/auth-tokens" element={<AuthPage />} />
          <Route exact path="/credentials/update" element={<CredentialsUpdate />} />
          <Route exact path="/refresh_token/new" element={<RefreshTokenNew />} />
          <Route exact path="/refresh_token/update" element={<RefreshTokenUpdate />} />
          <Route exact path="/guides" element={<Guides />} />
          <Route exact path="/guides/create-api-account" element={<CreateAPIAccount />} />
					<Route exact path="/guides/app-install" element={<AppInstall />} />

          <Route element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
