<script lang="ts">
 import { projectState } from '../stores/project.store';
    import { goto } from '$app/navigation';
  import { ProjectState } from '../models/project-data';

    function onClickStartProject() {
        projectState.set(ProjectState.Configuring);
        goto('/summary');
    }

</script>

<style>
    .brighter {
        color: rgb(216 216 221);
    }
</style>

<div data-theme="dark" class="hero min-h-screen" style="background-image: url(/images/sheldon_hero.jpg);">
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold">Hello there</h1>
        <p class="mb-5 brighter">I suppose you're seeking employment and, predictably, you're concerned about the interview. Well, you're in luck. I'm Sheldon, and I'm here to elevate your interview skills to a level that, frankly, you could never achieve on your own. Think of me as your secret weapon in the tedious world of job interviews. Ready to outsmart the interviewer? Click below and let's begin. Just try to keep up.</p>
        <button
        on:click={onClickStartProject}
         class="btn btn-primary">Start Job Interview Prep</button>
      </div>
    </div>
  </div>