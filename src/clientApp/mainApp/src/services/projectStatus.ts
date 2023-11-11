import { ConfigurationSectionStatus, type ProjectData } from "../models/project-data";

export function getSummaryProjectInfo(projectData: ProjectData) {
    if (projectData === undefined){
        return ConfigurationSectionStatus.Error;
    }
    if (projectData?.projectName?.length === 0 )
        return ConfigurationSectionStatus.Error;
    else
        return ConfigurationSectionStatus.Good;
}

export function getSummaryJobDescription(projectData : ProjectData){
    if (projectData === undefined){
        return ConfigurationSectionStatus.Error;
    }
    return projectData.jobDescriptionProvided ? ConfigurationSectionStatus.Good : ConfigurationSectionStatus.Error;
}

export function getSummaryResume(projectData : ProjectData){
    if (projectData === undefined){
        return ConfigurationSectionStatus.Error;
    }
    return projectData.resumeProvided ? ConfigurationSectionStatus.Good : ConfigurationSectionStatus.Draft;
}

export function getSummaryPreferenes(projectData : ProjectData){
    if (projectData === undefined){
        return ConfigurationSectionStatus.Error;
    }
    return projectData.preferencesProvided ? ConfigurationSectionStatus.Good : ConfigurationSectionStatus.Draft;
}

export function getQAUpload(projectData: ProjectData) {
    if (projectData === undefined){
        return ConfigurationSectionStatus.Error;
    }
    if (projectData?.projectName?.length === 0 )
        return ConfigurationSectionStatus.Error;
    else
        return ConfigurationSectionStatus.Good;
}

export function getQAList(projectData: ProjectData) {
    if (projectData === undefined){
        return ConfigurationSectionStatus.Error;
    }
    if (projectData?.projectName?.length === 0 )
        return ConfigurationSectionStatus.Error;
    else
        return ConfigurationSectionStatus.Good;
}

export function getQARecommendation(projectData: ProjectData) {
    if (projectData === undefined){
        return ConfigurationSectionStatus.Error;
    }
    if (projectData?.projectName?.length === 0 )
        return ConfigurationSectionStatus.Error;
    else
        return ConfigurationSectionStatus.Good;
}

export function getQAFinalReview(projectData: ProjectData) {
    if (projectData === undefined){
        return ConfigurationSectionStatus.Error;
    }
    if (projectData?.projectName?.length === 0 )
        return ConfigurationSectionStatus.Error;
    else
        return ConfigurationSectionStatus.Good;
}