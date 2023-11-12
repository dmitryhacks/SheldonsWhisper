import axios from "axios";

import { PUBLIC_BOOST_VOICE_AI_APIKEY, PUBLIC_BOOST_VOICE_AI_URI } from "$env/static/public";

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

export interface BVAIFile {
  id: string;
  organizationId: string;
  name: string;
  purpose: string;
  description: string;
  size: number;
  createdUtc: Date;
}

export interface FileCreationSettings {
  File: File;
  purpose: string;
  description: string;
}

const bvaiBaseUrl = PUBLIC_BOOST_VOICE_AI_URI;

const standardHeaders = {
  "Content-Type": "application/json",
  "BVAI-Key": PUBLIC_BOOST_VOICE_AI_APIKEY,
};

const uploadHeaders = {
  "Content-Type": "multipart/form-data",
  "BVAI-Key": PUBLIC_BOOST_VOICE_AI_APIKEY,
};

export const syncTextAndFile = async (
    fileContent: string | undefined,
    fileName: string,
    allFiles: BVAIFile[],
    purpose: string,
    description: string
  ) => {
    let changeHappened = false;
    const existingFile = allFiles.find((file) => file.name == fileName);
    if (existingFile) {
      await deleteFile(existingFile.id);
      changeHappened = true;
    }

    if (fileContent) {
      //add file
      var fileBlob = new Blob([fileContent ?? ""]);
      var newFile = new File([fileBlob], fileName);

      await uploadFile({
        File: newFile,
        purpose,
        description,
      });
      changeHappened = true;
    }
    if (changeHappened){
        allFiles = await getFiles();
    }
  };

export async function uploadFile(
  fileCreationSettings: FileCreationSettings
): Promise<BVAIFile> {
  return new Promise(async (resolve, reject) => {
    // Create a FormData object
    const formData = new FormData();

    formData.append("File", fileCreationSettings.File);

    formData.append("purpose", fileCreationSettings.purpose);
    formData.append("description", fileCreationSettings.description);

    try {
      const response = await axios.post(
        `${bvaiBaseUrl}/files/upload`,
        formData,
        {
          headers: uploadHeaders,
        }
      );

      if (response.status === 200) {
        resolve(response.data.data as BVAIFile);
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

export async function deleteFile(fileId: string): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete(`${bvaiBaseUrl}/files/${fileId}`, {
        headers: standardHeaders,
      });

      if (response.status === 200) {
        resolve(true);
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

export async function getFiles(): Promise<BVAIFile[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`${bvaiBaseUrl}/files`, {
        headers: standardHeaders,
      });

      if (response.status === 200) {
        resolve(response.data.data as BVAIFile[]);
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
      const response = await axios.post(
        `${bvaiBaseUrl}/projects`,
        requestBody,
        {
          headers: standardHeaders,
        }
      );

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
