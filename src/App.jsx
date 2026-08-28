import { useEffect, useState } from "react";

import SmoothScroll from "./components/SmoothScroll";
import ScrollAnimations from "./components/ScrollAnimations";
import ScrollProgress from "./components/ScrollProgress";
import Loader from "./components/Loader";
import ProfileChooser from "./components/ProfileChooser";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Services from "./components/Services";
import Journal from "./components/Journal";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import { portfolioProfiles } from "./data/content.js";
import { getSavedProjects, subscribeToProjects } from "./lib/projectStore.js";
import "./admin.css";

export default function App() {
  const isAdminRoute = window.location.pathname.replace(/\/$/, "") === "/admin";
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasChosenProfile, setHasChosenProfile] = useState(false);
  const [isErfanProfile, setIsErfanProfile] = useState(false);
  const [savedProjects, setSavedProjects] = useState(() => ({
    erfan: getSavedProjects("erfan"),
    matin: getSavedProjects("matin"),
  }));

  useEffect(
    () =>
      subscribeToProjects(() => {
        setSavedProjects({
          erfan: getSavedProjects("erfan"),
          matin: getSavedProjects("matin"),
        });
      }),
    [],
  );

  useEffect(() => {
    if (isAdminRoute) return;
    const activeProfile = isErfanProfile
      ? portfolioProfiles.erfan
      : portfolioProfiles.matin;
    document.title = hasChosenProfile
      ? activeProfile.metaTitle
      : "Erfan Akrami × Matin Asghari — Portfolio";
  }, [hasChosenProfile, isAdminRoute, isErfanProfile]);

  if (isAdminRoute) return <AdminPanel />;

  const baseProfile = isErfanProfile
    ? portfolioProfiles.erfan
    : portfolioProfiles.matin;
  const profile = {
    ...baseProfile,
    projects: [...savedProjects[baseProfile.id], ...baseProfile.projects],
  };
  const avatarSrc = isErfanProfile
    ? "/assets/hero.png"
    : "/assets/avatar.png";
  const heroSrc = isErfanProfile
    ? "/assets/avatar.png"
    : "/assets/hero.png";
  const experienceReady = isLoaded && hasChosenProfile;

  const handleProfileChange = (profileId) => {
    setIsErfanProfile(profileId === "erfan");
  };

  const handleProfileComplete = () => {
    setHasChosenProfile(true);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <>
      <SmoothScroll />
      <ScrollAnimations refreshKey={profile.id} isReady={experienceReady} />
      <ScrollProgress />

      {!isLoaded && <Loader onComplete={() => setIsLoaded(true)} />}

      {!hasChosenProfile && (
        <ProfileChooser
          onProfileChange={handleProfileChange}
          onComplete={handleProfileComplete}
        />
      )}

      <Navbar
        isLoaded={experienceReady}
        avatarSrc={avatarSrc}
        avatarAlt={profile.hero.name + " profile"}
        isErfanProfile={isErfanProfile}
        onAvatarClick={() => setIsErfanProfile((current) => !current)}
      />

      <main
        key={profile.id}
        id="app-canvas"
        className="flex min-h-screen w-full flex-col items-center justify-center bg-white"
      >
        <Hero heroSrc={heroSrc} content={profile.hero} />
        <Projects projects={profile.projects} />
        <About content={profile.about} />
        <Services
          service={profile.service}
          milestones={profile.milestones}
          skills={profile.skills}
        />
        <Journal content={profile.journal} />
        <Contact content={profile.contact} />
      </main>

      <Footer content={profile.footer} />
    </>
  );
}