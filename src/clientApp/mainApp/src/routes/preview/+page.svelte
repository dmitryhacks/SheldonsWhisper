<script lang="ts">
    import { PUBLIC_WIDGET_URL } from "$env/static/public";
    import type { QuestionAndAnswer } from "../../models/project-data";
    import { playAudioFromText } from "../../services/audioSynth";
  import { projectData } from "../../stores/project.store";

  let question: QuestionAndAnswer;
  let recommendationsQuery: string = "";

  async function getRandomQuestion() {
    if (Array.isArray($projectData.qAndA)) {
      question = $projectData.qAndA[Math.floor(Math.random()*$projectData.qAndA.length)];

      if (question.q) {
        await playAudioFromText(question.q);
        console.log('played');

        let queryBuilder = "";

        if (question.r1) {
          queryBuilder += "&r1=" + question.r1;
        }
        if (question.r2) {
          queryBuilder += "&r2=" + question.r2;
        }
        if (question.r3) {
          queryBuilder += "&r3=" + question.r3;
        }

        console.log(queryBuilder);

        if (queryBuilder !== "") {
          recommendationsQuery = queryBuilder; 
        }
      }
    }
  }
</script>

<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <div class="card-title">
      Preview
    </div>
    
    <div class="preview-container">
      <div>
        
    
        <button on:click={getRandomQuestion} class="btn btn-active btn-primary">
          Get Question
        </button>
    
        {#if question}
          <p>
            {question.q}
          </p>
        {/if}
      </div>
    
      <div class="widget">
        <iframe src="{PUBLIC_WIDGET_URL}?{recommendationsQuery}" title="preview widget" />
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

  iframe {
    height: 600px;
    width: 370px;
  }
</style>
