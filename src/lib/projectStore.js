const STORAGE_KEY = "portfolio-admin-projects-v1";
const PROJECTS_UPDATED_EVENT = "portfolio-projects-updated";

const emptyProjects = {
  erfan: [],
  matin: [],
  hiddenBuiltIns: { erfan: [], matin: [] },
};

function readProjectStore() {
  if (typeof window === "undefined") return emptyProjects;
  try {
    const savedProjects = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    return {
      erfan: Array.isArray(savedProjects?.erfan) ? savedProjects.erfan : [],
      matin: Array.isArray(savedProjects?.matin) ? savedProjects.matin : [],
      hiddenBuiltIns: {
        erfan: Array.isArray(savedProjects?.hiddenBuiltIns?.erfan)
          ? savedProjects.hiddenBuiltIns.erfan
          : [],
        matin: Array.isArray(savedProjects?.hiddenBuiltIns?.matin)
          ? savedProjects.hiddenBuiltIns.matin
          : [],
      },
    };
  } catch {
    return emptyProjects;
  }
}

export function getSavedProjects(profileId) {
  return readProjectStore()[profileId] ?? [];
}

export function getBuiltInProjectId(project) {
  return `built-in:${project.title}:${project.image}`;
}

export function getHiddenBuiltInProjectIds(profileId) {
  return readProjectStore().hiddenBuiltIns[profileId] ?? [];
}

export function saveProject(profileId, project) {
  const projects = readProjectStore();
  projects[profileId] = [project, ...(projects[profileId] ?? [])];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  window.dispatchEvent(new CustomEvent(PROJECTS_UPDATED_EVENT));
}

export function deleteProject(profileId, projectId) {
  const projects = readProjectStore();
  projects[profileId] = (projects[profileId] ?? []).filter(
    (project) => project.id !== projectId,
  );
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  window.dispatchEvent(new CustomEvent(PROJECTS_UPDATED_EVENT));
}

export function deleteBuiltInProject(profileId, projectId) {
  const projects = readProjectStore();
  const hiddenProjects = projects.hiddenBuiltIns[profileId] ?? [];

  if (!hiddenProjects.includes(projectId)) {
    projects.hiddenBuiltIns[profileId] = [...hiddenProjects, projectId];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    window.dispatchEvent(new CustomEvent(PROJECTS_UPDATED_EVENT));
  }
}

export function subscribeToProjects(onUpdate) {
  window.addEventListener(PROJECTS_UPDATED_EVENT, onUpdate);
  window.addEventListener("storage", onUpdate);
  return () => {
    window.removeEventListener(PROJECTS_UPDATED_EVENT, onUpdate);
    window.removeEventListener("storage", onUpdate);
  };
}
