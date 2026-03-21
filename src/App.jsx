import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { PageLayout } from './components/layout/PageLayout';
import { LandingPage } from './pages/Landing';
import { FeaturesPage } from './pages/Features/FeaturesPage';
import { HowItWorksPage } from './pages/HowItWorks/HowItWorksPage';
import { AboutPage } from './pages/About/AboutPage';
import { ContactPage } from './pages/Contact/ContactPage';
import { SignInPage } from './pages/Auth/SignInPage';
import { GetStartedPage } from './pages/Auth/GetStartedPage';
import { NotFoundPage } from './pages/NotFound';
import { ROUTES } from './constants/routes';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route
            path={ROUTES.HOME}
            element={
              <PageLayout>
                <LandingPage />
              </PageLayout>
            }
          />
          <Route
            path="/features"
            element={
              <PageLayout>
                <FeaturesPage />
              </PageLayout>
            }
          />
          <Route
            path="/how-it-works"
            element={
              <PageLayout>
                <HowItWorksPage />
              </PageLayout>
            }
          />
          <Route
            path="/about"
            element={
              <PageLayout>
                <AboutPage />
              </PageLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <PageLayout>
                <ContactPage />
              </PageLayout>
            }
          />
          <Route
            path="/sign-in"
            element={<SignInPage />}
          />
          <Route
            path="/get-started"
            element={<GetStartedPage />}
          />
          <Route
            path="*"
            element={
              <PageLayout>
                <NotFoundPage />
              </PageLayout>
            }
          />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
