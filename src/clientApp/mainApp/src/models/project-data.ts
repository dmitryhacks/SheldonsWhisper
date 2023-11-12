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

export const jobDescriptionFilePurpose = 'summarize possible questionsfor quick memory retrieval. For example, if job description says "Outstanding attention to detail", then you can generate a question by interviewer "Can you describe a time when your attention to detail prevented a mistake at work?" one question per line. Format: <Question></Question>';
export const jobDescriptionFileDescripption = 'Job Description';
export const resumeFilePurpose = 'summarize possible questions and answers for quick memory retrieval. For example, if resume says "Successfully implemented HITRUST Cloud infrastructure for B2B offerings", then you can generate a question by interviewer "What measures did you take to ensure compliance with HITRUST requirements?" and answer "Ensuring HITRUST compliance, I conducted a gap analysis, upgraded security protocols with encryption and multi-factor authentication, and established regular compliance audits. I also emphasized staff training in security practices and set up continuous monitoring systems, ensuring our cloud infrastructure met HITRUST standards effectively". One pair of question/answers per line. Format: <Question></Question><Answer></Answer>';
export const resumeFileDescripption = 'Resume';
export const operatorRole = 'an interviewee';
export const callerRole = 'an interviewer';


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