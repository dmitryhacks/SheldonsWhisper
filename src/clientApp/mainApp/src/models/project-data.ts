export enum ProjectState {
    NotStarted = "NotStarted",
    Starter = "Started",
    Configuring = "Configuring",
    Preview = "Preview",
    Live = "Live",
}

export enum ConfigurationSectionStatus {
    Draft = "draft",
    Good = "good",
    Error = "error"
}


export interface ProjectSummary{
    projectName : string;
}

export interface ProjectData {
    projectName : string | undefined;
    projectDescription : string | undefined;
    jobDescription: string | undefined;
    jobDescriptionProvided : boolean | undefined;
    resume: string | undefined;
    resumeProvided: boolean | undefined;
    preferences: string | undefined;
    preferencesProvided: boolean | undefined;
}