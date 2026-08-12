import data from "../data/projects.json";

export const projects = data;
export const getProject = (slug) => projects.find((p) => p.slug === slug);
