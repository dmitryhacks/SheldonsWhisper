<script lang="ts">
  import { projectId, projectState } from "../stores/project.store";
  import { goto } from "$app/navigation";
  import { ProjectState } from "../models/project-data";
  import {
    createProject,
    getAvailablePhonePools,
  } from "../services/boostVoiceAi";
  import { writable } from "svelte/store";

  const startingProject = writable(false);

  const onClickStartProject = async () => {
    startingProject.set(true);
    const availablePhonePools = await getAvailablePhonePools();
    const firstPhonePool = availablePhonePools[0];

    const projectCreationResult = await createProject({
      projectName: "Hackathon Demo",
      projectType: "copilot",
      phonePoolId: firstPhonePool.id,
    });
    projectId.set(projectCreationResult.id);

    projectState.set(ProjectState.Configuring);
    startingProject.set(false);
    goto("/summary");
  };
</script>

<div
  data-theme="dark"
  class="hero min-h-screen"
  style="background-image: url(/images/sheldon_hero.jpg);"
>
  <div class="hero-overlay bg-opacity-60" />
  <div class="hero-content text-center text-neutral-content">
    <div class="max-w-md">
      <h1 class="mb-5 text-5xl font-bold">Hello there</h1>
      <p class="mb-5 brighter">
        I suppose you're seeking employment and, predictably, you're concerned
        about the interview. Well, you're in luck. I'm Sheldon, and I'm here to
        elevate your interview skills to a level that, frankly, you could never
        achieve on your own. Think of me as your secret weapon in the tedious
        world of job interviews. Ready to outsmart the interviewer? Click below
        and let's begin. Just try to keep up.
      </p>
      <button on:click={onClickStartProject} class="btn btn-primary">
        {#if $startingProject}
          <span class="loading loading-spinner" />
          Starting...
        {:else}
          Start Job Interview Prep{/if}</button
      >
    </div>
  </div>
</div>

<style>
  .brighter {
    color: rgb(216 216 221);
  }
</style>
