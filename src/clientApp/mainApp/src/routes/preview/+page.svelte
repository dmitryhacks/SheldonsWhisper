<script lang="ts">
  import { PUBLIC_WIDGET_URL } from "$env/static/public";
  import { writable } from "svelte/store";
  import type { QuestionAndAnswer } from "../../models/project-data";
  import { playAudioFromText } from "../../services/audioSynth";
  import { projectData } from "../../stores/project.store";

  let question: QuestionAndAnswer;
  let recommendationsQuery: string = "";

  let showAnswer: boolean = false;
  let audioPlaying = writable(false);

  const onlyWithRecommendations = () => {
    return $projectData.qAndA.filter((value) => value.r1);
  };

  async function getRandomQuestion() {
    if (Array.isArray($projectData.qAndA)) {
      showAnswer = false;
      const listWithRecommendations = onlyWithRecommendations();
      question =
        listWithRecommendations[
          Math.floor(Math.random() * listWithRecommendations.length)
        ];

      if (question.q) {
        audioPlaying.set(true);
        await playAudioFromText(question.q);
        audioPlaying.set(false);
        setTimeout(() => {
          let queryBuilder = "";
          //TODO: Fix it
          var r1 = question.r1;
          var r2 = question.r2;
          var r3 = question.r3;

          if (r1) {
            queryBuilder += "&r1=" + r1;
          }
          if (r2) {
            queryBuilder += "&r2=" + r2;
          }
          if (r3) {
            queryBuilder += "&r3=" + r3;
          }

          if (queryBuilder !== "") {
            recommendationsQuery = queryBuilder;
          }
        }, 500);
      }
    }
  }
</script>

<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <div class="card-title">Preview</div>

    <div class="preview-container">
      <div>
        <div class="question-controls">
          <button on:click={getRandomQuestion} class="btn btn-active btn-primary">
            Get Random Question
          </button>
          {#if $audioPlaying}
            <!-- volume on icon -->
            <svg
              class="swap-on fill-current speaker-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              ><path
                d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
              /></svg
            >
            <span>
              <i>
                by ElevenLabs
              </i>
            </span>
          {/if}
        </div>


        {#if question}
          <p>
            {question.q}
          </p>
        {/if}

        {#if question?.a}
          <button
            on:click={() => (showAnswer = true)}
            class="btn btn-active btn-neutral show-answer-btn"
          >
            Show Answer
          </button>

          {#if showAnswer}
            <p>
              {question.a}
            </p>
          {/if}
        {/if}
      </div>

      <div class="widget">
        <iframe
          src="{PUBLIC_WIDGET_URL}?disableTranscription=true{recommendationsQuery}"
          title="preview widget"
        />
      </div>
    </div>
  </div>
</div>

<style>
  .card-title {
    margin-bottom: 20px;
  }

  .preview-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .preview-container p {
    margin-top: 20px;
  }

  .show-answer-btn {
    margin-top: 100px;
  }

  .question-controls {
    display: flex;
    gap: 20px;
  }

  .widget {
    display: flex;
    justify-content: center;
  }

  iframe {
    height: 600px;
    width: 370px;
  }
</style>
