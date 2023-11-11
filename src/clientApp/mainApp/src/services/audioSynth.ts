import axios from "axios";
import {
  PUBLIC_ELEVENLABS_API_KEY,
  PUBLIC_ELEVENLABS_VOICE_ID
} from "$env/static/public";

export async function playAudioFromText(text: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const baseUrl = "https://api.elevenlabs.io/v1/text-to-speech";
      const headers = {
        "Content-Type": "application/json",
        "xi-api-key": PUBLIC_ELEVENLABS_API_KEY,
      };
  
      const requestBody = {
        text,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5
        },
      };
  
      const voiceId = PUBLIC_ELEVENLABS_VOICE_ID;
  
      try {
        const response = await axios.post(`${baseUrl}/${voiceId}`, requestBody, {
          headers,
          responseType: "blob",
        });
  
        if (response.status === 200) {
          const audio = new Audio(URL.createObjectURL(response.data));
          audio.play();
          
          audio.onpause = () => resolve();
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
