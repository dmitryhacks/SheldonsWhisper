import { writable, type Writable } from "svelte/store";
import { browser } from "$app/environment";
import { ProjectState, type ProjectData } from "../models/project-data";

const defaultProjectState = ProjectState.NotStarted;
const initialProjectStateValue = browser
  ? window.localStorage.getItem("projectState") ?? defaultProjectState
  : defaultProjectState;

const projectStatConfig = writable<string>(initialProjectStateValue);

projectStatConfig.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem("projectState", value);
  }
});

//project data
const defaultProjectData:ProjectData = {
  projectName: undefined,
  projectDescription: undefined,
  jobDescription: undefined,
  jobDescriptionProvided: false,
  resume: undefined,
  resumeProvided: false,
  preferences: undefined,
  preferencesProvided: false,
  qAndA:[],
};

const initialProjectDataValue = browser && window.localStorage.getItem("projectData") ? 
   JSON.parse(window.localStorage.getItem("projectData") ?? '')
  : defaultProjectData;

const projectDataConfig = writable<ProjectData>(initialProjectDataValue);
projectDataConfig.subscribe((value) => {
  if (browser) {

    value.jobDescriptionProvided = (value?.jobDescription?.length ?? 0)>0;
    value.resumeProvided = (value?.resume?.length ?? 0)>0;
    value.preferencesProvided = (value?.preferences?.length ?? 0)>0;

    window.localStorage.setItem("projectData", JSON.stringify(value));
  }
});

export const projectState = projectStatConfig;
export const projectData = projectDataConfig;
export const enabledDetailSection = writable(false);
