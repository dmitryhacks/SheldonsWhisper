import axios from "axios";

import { PUBLIC_BOOST_VOICE_AI_APIKEY } from "$env/static/public";

export interface ProjectCreationSettings {
  projectName: string;
  projectType: "copilot" | "autopilot";
  phonePoolId: string | undefined;
}

export interface ProjectSetting {
  projectType: "copilot" | "autopilot";
  audioSourceType: string;
  callbackRecommendationType: string;
  callbackTranscriptionType: string;
  callbackAudioType: string;
  phonePoolId: string;
}

export interface ProjectWithSettings {
  id: string;
  organizationId: string;
  name: string;
  settings: ProjectSetting;
}

export interface PhonePool {
  id: string;
  poolName: string;
  phoneProvider: string;
  isPrivate: boolean;
}

const bvaiBaseUrl = "http://localhost:8088/api";

const standardHeaders = {
  "Content-Type": "application/json",
  "BVAI-Key": PUBLIC_BOOST_VOICE_AI_APIKEY,
};

export async function getAvailablePhonePools(): Promise<PhonePool[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`${bvaiBaseUrl}/phone_pools`, {
        headers: standardHeaders,
      });

      if (response.status === 200) {
        resolve(response.data.data as PhonePool[]);
      } else {
        console.error("Error: Unable to stream audio.");
        reject();
      }
    } catch (error) {
      console.error("Error: Unable to stream audio.");
      reject();
    }
  });
}

export async function createProject(
  projectCreationDetails: ProjectCreationSettings
): Promise<ProjectWithSettings> {
  return new Promise(async (resolve, reject) => {
    const requestBody = {
        ...projectCreationDetails,
      };

    try {
      const response = await axios.post(`${bvaiBaseUrl}/projects`, requestBody, {
        headers: standardHeaders,
      });

      if (response.status === 200) {
        resolve(response.data.data as ProjectWithSettings);
      } else {
        console.error("Error: Unable to stream audio.");
        reject();
      }
    } catch (error) {
      console.error("Error: Unable to stream audio.");
      reject();
    }
  });
}
