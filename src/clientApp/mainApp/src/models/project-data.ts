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

export enum FieldToEdit  {
    None = 'None',
    Answer = 'Answer',
    Recommendation1 = 'Recommendation 1',
    Recommendation2 = 'Recommendation 2',
    Recommendation3 = 'Recommendation 3',
  }



export interface ProjectSummary{
    projectName : string;
}

export interface QuestionAndAnswer{
    index: number;
    c: string | undefined;
    q: string | undefined;
    a: string | undefined;
    r1: string | undefined;
    r2: string | undefined;
    r3: string | undefined;
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
    qAndA: QuestionAndAnswer[];
}