<script lang="ts">
    import type { QuestionAndAnswer } from "../../models/project-data";
    import { playAudioFromText } from "../../services/audioSynth";
  import { projectData } from "../../stores/project.store";

  let question: QuestionAndAnswer;

  async function getRandomQuestion() {
    if (Array.isArray($projectData.qAndA)) {
      question = $projectData.qAndA[Math.floor(Math.random()*$projectData.qAndA.length)];

      if (question.q) {
        await playAudioFromText(question.q);
        console.log('played');
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
        <div class="cards-container">
          <!-- {#if question?.r1} -->
            <div class="card w-96 bg-secondary shadow-xl">
              <div class="card-body">
                {question?.r1}
                Rec 1
              </div>
            </div>
          <!-- {/if} -->
          <!-- {#if question?.r2} -->
          <div class="card w-96 bg-secondary shadow-xl">
            <div class="card-body">
              {question?.r2}
              Rec 2
            </div>
          </div>
          <!-- {/if} -->
          <!-- {#if question?.r3} -->
          <div class="card w-96 bg-secondary shadow-xl">
            <div class="card-body">
              {question?.r3}
              Rec 3
            </div>
          </div>
          <!-- {/if} -->
        </div>
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

  .cards-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
</style>
