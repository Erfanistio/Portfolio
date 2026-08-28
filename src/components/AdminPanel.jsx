import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Check,
  ImagePlus,
  Layers3,
  LockKeyhole,
  LogOut,
  Plus,
  ShieldCheck,
  Trash2,
  UploadCloud,
} from "lucide-react";
import {
  deleteProject,
  getSavedProjects,
  saveProject,
  subscribeToProjects,
} from "../lib/projectStore.js";
import { portfolioProfiles } from "../data/content.js";

const SESSION_KEY = "portfolio-admin-session-v1";
const MAX_IMAGE_SIZE = 2.5 * 1024 * 1024;

const accounts = {
  erfanistio: {
    id: "erfanistio",
    label: "Erfanistio",
    profileId: "erfan",
    password: import.meta.env.VITE_ERFANISTIO_ADMIN_PASSWORD || "erfanistio",
    accent: "#ff5c35",
  },
  nuxander: {
    id: "nuxander",
    label: "Nuxander",
    profileId: "matin",
    password: import.meta.env.VITE_NUXANDER_ADMIN_PASSWORD || "nuxander",
    accent: "#d9ff43",
  },
};

function getSessionAccount() {
  const accountId = window.sessionStorage.getItem(SESSION_KEY);
  return accounts[accountId] ?? null;
}

function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const accountId = username.trim().toLowerCase();
    const account = accounts[accountId];

    if (!account || password !== account.password) {
      setError("That username or password doesn’t match.");
      return;
    }

    window.sessionStorage.setItem(SESSION_KEY, account.id);
    onLogin(account);
  };

  return (
    <main className="admin-shell min-h-screen bg-[#11110f] p-3 text-white sm:p-5 lg:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-[1440px] overflow-hidden rounded-[32px] border border-white/10 bg-[#1a1a17] sm:min-h-[calc(100vh-2.5rem)] sm:rounded-[42px] lg:grid-cols-[1.08fr_0.92fr]">
        <section className="relative hidden overflow-hidden border-r border-white/10 p-14 lg:flex lg:flex-col lg:justify-between">
          <div className="admin-orb absolute -bottom-40 -left-32 h-[520px] w-[520px] rounded-full bg-[#ff5c35] opacity-80" />
          <div className="admin-orb absolute -right-32 top-14 h-[360px] w-[360px] rounded-full bg-[#d9ff43] opacity-60" />
          <div className="relative z-10 flex items-center gap-3 font-inter text-sm uppercase tracking-[0.2em] text-white/65">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20">
              <Layers3 size={18} />
            </span>
            Portfolio control room
          </div>
          <div className="relative z-10 max-w-xl">
            <p className="mb-5 font-inter text-xs font-semibold uppercase tracking-[0.28em] text-white/50">
              Private workspace
            </p>
            <h1 className="font-inter text-[clamp(4rem,7vw,7.5rem)] font-semibold leading-[0.84] tracking-[-0.075em]">
              Keep the work moving.
            </h1>
          </div>
        </section>

        <section className="flex items-center justify-center px-5 py-10 sm:px-12 lg:px-20">
          <div className="w-full max-w-md">
            <a
              href="/"
              className="mb-20 inline-flex items-center gap-2 font-inter text-sm text-white/55 transition hover:text-white lg:mb-28"
            >
              <ArrowLeft size={17} /> Back to portfolio
            </a>
            <div className="mb-10">
              <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black">
                <ShieldCheck size={22} />
              </span>
              <h2 className="font-inter text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">
                Welcome back.
              </h2>
              <p className="mt-3 font-inter text-sm leading-6 text-white/50">
                Sign in as Erfanistio or Nuxander to manage that portfolio’s projects.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block font-inter text-sm text-white/70">
                Username
                <input
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                    setError("");
                  }}
                  autoComplete="username"
                  autoFocus
                  className="admin-input mt-2"
                  placeholder="erfanistio or nuxander"
                  required
                />
              </label>
              <label className="block font-inter text-sm text-white/70">
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                  }}
                  autoComplete="current-password"
                  className="admin-input mt-2"
                  placeholder="Enter your password"
                  required
                />
              </label>
              {error && (
                <p role="alert" className="font-inter text-sm text-[#ff8265]">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="flex h-14 w-full items-center justify-center rounded-2xl bg-white font-inter text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-[#d9ff43] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Sign in
              </button>
            </form>

            <p className="mt-8 border-t border-white/10 pt-6 font-inter text-xs leading-5 text-white/35">
              Local setup: each default password matches its lowercase username. Set the Vite admin password variables before deployment.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function ProjectForm({ account }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef(null);

  const handleImage = (file) => {
    setError("");
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Choose a JPG, PNG, WebP, or GIF image.");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setError("The background photo must be smaller than 2.5 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(String(reader.result));
      setImageName(file.name);
    };
    reader.onerror = () => setError("The image could not be read. Try another file.");
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSaved(false);

    if (!image) {
      setError("Add a background photo before publishing.");
      return;
    }

    const project = {
      id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
      title: name.trim(),
      category: category.trim(),
      image,
      alt: `${name.trim()} project background`,
      createdAt: new Date().toISOString(),
    };

    try {
      saveProject(account.profileId, project);
      setName("");
      setCategory("");
      setImage("");
      setImageName("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2600);
    } catch {
      setError("This browser is out of local storage. Try a smaller image or remove an older project.");
    }
  };

  return (
    <section className="rounded-[28px] bg-white p-5 shadow-[0_20px_70px_rgba(26,26,20,0.07)] sm:p-7">
      <div className="mb-7 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/35">New entry</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">Add a project</h2>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#171713] text-white">
          <Plus size={19} />
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block text-sm font-medium text-black/65">
          Project name
          <input value={name} onChange={(event) => setName(event.target.value)} className="admin-light-input mt-2" placeholder="e.g. Atlas Commerce" maxLength={60} required />
        </label>
        <label className="block text-sm font-medium text-black/65">
          Project category
          <input value={category} onChange={(event) => setCategory(event.target.value)} className="admin-light-input mt-2" placeholder="e.g. Front-end build" maxLength={40} required />
        </label>

        <div>
          <span className="block text-sm font-medium text-black/65">Project background photo</span>
          <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={(event) => handleImage(event.target.files?.[0])} className="sr-only" id="project-background" />
          <label htmlFor="project-background" className="mt-2 flex min-h-44 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-dashed border-black/20 bg-[#f6f5f1] transition hover:border-black/40">
            {image ? (
              <span className="relative block h-52 w-full">
                <img src={image} alt="Project preview" className="h-full w-full object-cover" />
                <span className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-xl bg-black/70 px-3 py-2 text-xs text-white backdrop-blur-md">
                  <span className="truncate">{imageName}</span><span className="shrink-0">Change</span>
                </span>
              </span>
            ) : (
              <span className="flex flex-col items-center px-5 text-center">
                <UploadCloud size={28} strokeWidth={1.5} className="mb-3 text-black/45" />
                <strong className="text-sm font-semibold">Choose a background image</strong>
                <span className="mt-1 text-xs text-black/40">JPG, PNG, WebP or GIF · max 2.5 MB</span>
              </span>
            )}
          </label>
        </div>

        {error && <p role="alert" className="text-sm text-[#c33f24]">{error}</p>}
        {saved && <p role="status" className="flex items-center gap-2 text-sm text-[#376a18]"><Check size={17} /> Published to {account.label}.</p>}
        <button type="submit" className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#171713] text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
          <Plus size={17} /> Add project
        </button>
      </form>
    </section>
  );
}

function ProjectCard({ project, account, isBuiltIn }) {
  return (
    <article className="group overflow-hidden rounded-[22px] bg-white shadow-[0_14px_40px_rgba(26,26,20,0.06)]">
      <div className="relative aspect-[1.25] overflow-hidden bg-black/5">
        <img src={project.image} alt={project.alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        {isBuiltIn ? (
          <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-white/85 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-black/60 backdrop-blur-md">
            <LockKeyhole size={12} /> Built in
          </span>
        ) : (
          <button type="button" onClick={() => deleteProject(account.profileId, project.id)} aria-label={`Delete ${project.title}`} className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/65 text-white opacity-100 backdrop-blur-md transition hover:bg-[#d84328] sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100">
            <Trash2 size={16} />
          </button>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-black/35">{project.category}</p>
          {!isBuiltIn && <span className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#b53e26]">Admin</span>}
        </div>
        <h3 className="mt-2 truncate text-lg font-semibold tracking-[-0.025em]">{project.title}</h3>
      </div>
    </article>
  );
}

function ProjectList({ customProjects, builtInProjects, account }) {
  const allProjects = [
    ...customProjects.map((project) => ({ ...project, isBuiltIn: false })),
    ...builtInProjects.map((project, index) => ({
      ...project,
      id: `built-in-${account.profileId}-${index}`,
      isBuiltIn: true,
    })),
  ];

  return (
    <section className="rounded-[28px] border border-black/10 bg-transparent p-5 sm:p-7">
      <div className="mb-7">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/35">Live collection</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">All projects</h2>
      </div>
      {allProjects.length === 0 ? (
        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[22px] border border-dashed border-black/15 px-8 text-center">
          <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-black/[0.04] text-black/35"><ImagePlus size={24} /></span>
          <h3 className="text-lg font-semibold">Nothing added yet</h3>
          <p className="mt-2 max-w-xs text-sm leading-6 text-black/45">Your first custom project will appear here and on the public portfolio.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {allProjects.map((project) => (
            <ProjectCard key={project.id} project={project} account={account} isBuiltIn={project.isBuiltIn} />
          ))}
        </div>
      )}
    </section>
  );
}
function AdminDashboard({ account, onLogout }) {
  const [projects, setProjects] = useState(() => getSavedProjects(account.profileId));
  const builtInProjects = portfolioProfiles[account.profileId]?.projects ?? [];
  const totalProjects = projects.length + builtInProjects.length;

  useEffect(
    () => subscribeToProjects(() => setProjects(getSavedProjects(account.profileId))),
    [account.profileId],
  );

  return (
    <main className="admin-shell min-h-screen bg-[#efeee9] font-inter text-[#171713]" style={{ "--admin-accent": account.accent }}>
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="flex items-center justify-between bg-[#171713] px-5 py-4 text-white lg:flex-col lg:items-stretch lg:px-7 lg:py-8">
          <div>
            <a href="/" className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-bold text-black" style={{ backgroundColor: account.accent }}>{account.label.slice(0, 2).toUpperCase()}</span>
              <span><strong className="block text-sm font-semibold">{account.label}</strong><small className="text-[11px] text-white/45">Portfolio admin</small></span>
            </a>
            <nav className="mt-12 hidden lg:block"><span className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm text-white"><Layers3 size={18} /> Projects</span></nav>
          </div>
          <div className="flex items-center gap-2 lg:block">
            <a href="/" className="hidden items-center gap-3 rounded-2xl px-4 py-3 text-sm text-white/55 transition hover:bg-white/5 hover:text-white sm:flex"><ArrowLeft size={17} /> View portfolio</a>
            <button type="button" onClick={onLogout} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-white/55 transition hover:bg-white/5 hover:text-white"><LogOut size={17} /> <span className="hidden sm:inline">Sign out</span></button>
          </div>
        </aside>

        <div className="px-4 py-7 sm:px-8 lg:px-[clamp(2rem,5vw,6rem)] lg:py-12">
          <header className="mx-auto flex max-w-[1180px] flex-col justify-between gap-4 border-b border-black/10 pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-black/40">Project library</p>
              <h1 className="text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">Make something visible.</h1>
            </div>
            <span className="rounded-full border border-black/10 bg-white/50 px-4 py-2 text-xs text-black/55">{totalProjects} total {totalProjects === 1 ? "project" : "projects"}</span>
          </header>
          <div className="mx-auto grid max-w-[1180px] gap-6 py-8 xl:grid-cols-[minmax(0,0.88fr)_minmax(420px,1.12fr)]">
            <ProjectForm account={account} />
            <ProjectList customProjects={projects} builtInProjects={builtInProjects} account={account} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default function AdminPanel() {
  const [account, setAccount] = useState(getSessionAccount);

  useEffect(() => {
    document.title = account ? `${account.label} — Project Admin` : "Portfolio Admin — Sign in";
  }, [account]);

  const logout = () => {
    window.sessionStorage.removeItem(SESSION_KEY);
    setAccount(null);
  };

  return account ? <AdminDashboard account={account} onLogout={logout} /> : <LoginScreen onLogin={setAccount} />;
}
