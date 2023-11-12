<script lang="ts">
  import { writable } from "svelte/store";
  import { ProjectState, type ProjectData } from "../../models/project-data";
  import { projectData, projectState } from "../../stores/project.store";
  import StepWithContent from "../../components/StepWithContent.svelte";
  import {
    getSummaryJobDescription,
    getSummaryPreferenes,
    getSummaryProjectInfo,
    getSummaryResume,
  } from "../../services/projectStatus";
  import { onMount } from "svelte";
  import {
    getFiles,
    syncTextAndFile,
  } from "../../services/boostVoiceAi";

  let name = "";
  let description = "";
  let jobDescription = "";
  let resume = "";
  let preferences = "";
  let currentStep = writable(1);

  function setCurrentStepOneBack() {
    $currentStep = $currentStep - 1;
  }

  function setCurrentStepOneForward() {
    $currentStep = $currentStep + 1;
  }

  const syncWithBVAI = async (pd: ProjectData) => {
    const allFiles = await getFiles();
    await syncTextAndFile(
      pd.jobDescription,
      "job_description.txt",
      allFiles,
      "fine-tuning",
      "user-provided"
    );
    await syncTextAndFile(
      pd.resume,
      "resume.txt",
      allFiles,
      "fine-tuning",
      "user-provided"
    );
  };

  const saveProjectSummary = async () => {
    const summaryChanges = {
      projectName: name,
      projectDescription: description,
      jobDescription: jobDescription,
      resume: resume,
      preferences: preferences,
    };

    projectData.update((pd) => {
      return {
        ...pd,
        ...summaryChanges,
      };
    });

    await syncWithBVAI({ ...$projectData, ...summaryChanges });

    projectState.set(ProjectState.Configuring);
  };
</script>

<div class="card bg-base-100 shadow-xl">
  <ul class="steps">
    <StepWithContent
      projectData={$projectData}
      stepName="Project Info"
      checkFunction={getSummaryProjectInfo}
    />
    <StepWithContent
      projectData={$projectData}
      stepName="Job Description"
      checkFunction={getSummaryJobDescription}
    />
    <StepWithContent
      projectData={$projectData}
      stepName="Your Resume"
      checkFunction={getSummaryResume}
    />
    <StepWithContent
      projectData={$projectData}
      stepName="Your Preferences"
      checkFunction={getSummaryPreferenes}
    />
  </ul>
  <div class="card-body">
    {#if $currentStep === 1}
      <h2 class="card-title">Project Info</h2>
      <div class="form step-one mt-8 items-center flex flex-col">
        <div class="form-control w-full max-w-xs">
          <label class="label" for="summmary_projectName">
            <span class="label-text"
              >What is the nature of the employment to which you're applying?</span
            >
          </label>
          <input
            name="summmary_projectName"
            bind:value={name}
            type="text"
            placeholder="Junior NodeJS Software Developer"
            class="input input-bordered input-md w-full max-w-xs"
          />
        </div>
        <div class="form-control w-full max-w-xs">
          <label class="label" for="summmary_projectDescription">
            <span class="label-text">Say more?</span>
          </label>
          <textarea
            name="summmary_projectDescription"
            bind:value={description}
            class="textarea textarea-bordered textarea-md"
            placeholder="Description"
          />
        </div>
      </div>
    {:else if $currentStep === 2}
      <h2 class="card-title">Job Description</h2>
      <div class="form step-one mt-8 items-center flex flex-col">
        <div class="form-control w-full max-w-xs">
          <label class="label" for="summmary_jobDescription">
            <span class="label-text">Paste job description</span>
          </label>
          <textarea
            name="summmary_jobDescription"
            bind:value={jobDescription}
            class="textarea textarea-bordered textarea-md"
            placeholder="Job Description"
          />
        </div>
      </div>
    {:else if $currentStep === 3}
      <h2 class="card-title">Resume</h2>
      <div class="form step-one mt-8 items-center flex flex-col">
        <div class="form-control w-full max-w-xs">
          <label class="label" for="summmary_resume">
            <span class="label-text">Paste your resume</span>
          </label>
          <textarea
            name="summmary_resume"
            bind:value={resume}
            class="textarea textarea-bordered textarea-md"
            placeholder="Resume"
          />
        </div>
      </div>
    {:else}
      <h2 class="card-title">Your preferences</h2>
      <div class="form step-one mt-8 items-center flex flex-col">
        <div class="form-control w-full max-w-xs">
          <label class="label" for="summmary_preferences">
            <span class="label-text">What do you want?</span>
          </label>
          <textarea
            name="summmary_preferences"
            bind:value={preferences}
            class="textarea textarea-bordered textarea-md"
            placeholder="I want 120K salary"
          />
        </div>
      </div>
    {/if}
    <div class="card-actions">
      {#if $currentStep !== 1}
        <button
          on:click={setCurrentStepOneBack}
          class="btn btn-active btn-ghost">Back</button
        >
      {/if}

      {#if $currentStep < 4}
        <button
          on:click={() => {
            saveProjectSummary();
            setCurrentStepOneForward();
          }}
          class="btn btn-active btn-primary">Next</button
        >
      {:else}
        <button on:click={saveProjectSummary} class="btn btn-active btn-primary"
          >Save</button
        >
      {/if}
    </div>
  </div>
</div>
