<script lang="ts">
  // Import our global CSS
  import "$lib/global.css";
  import "./styles.css";

  import { onMount } from "svelte";
  import { enabledDetailSection, projectState } from "../stores/project.store";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { ProjectState } from "../models/project-data";

  $: currentPath = $page.url.pathname;

  onMount(() => {
    const unsubscribe = projectState.subscribe((value) => {
      if (value === ProjectState.NotStarted && currentPath !== "/start") {
        goto("/start");
      }
      if (value !== ProjectState.NotStarted && currentPath.toLocaleLowerCase().startsWith('/start')){
        goto("/summary");
      }
      // console.log(currentPath, value);
    });

    return unsubscribe; // Cleanup the subscription
  });
</script>

{#if $projectState !== ProjectState.NotStarted}
  <header>
    <div class="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col">
        <!-- Navbar -->
        <div class="w-full navbar bg-base-300">
          <div class="flex-none lg:hidden">
            <label
              for="my-drawer-3"
              aria-label="open sidebar"
              class="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-6 h-6 stroke-current"
                ><path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                /></svg
              >
            </label>
          </div>
          <div class="flex-1 px-2 mx-2">Sheldon whispers</div>
          <!-- <div class="flex-none hidden lg:block">
            <ul class="menu menu-vertical">
             
              <li><a href="/summary">Summary</a></li>
              <li><a href="/job_details">Job Details</a></li>
            </ul>
          </div> -->
        </div>
        <!-- Page content here -->
        <slot />
      </div>
      <div class="drawer-side">
        <label
          for="my-drawer-3"
          aria-label="close sidebar"
          class="drawer-overlay"
        ></label>
        <ul class="menu p-4 w-80 min-h-full bg-base-200">
          <!-- Sidebar content here -->
          <li><a href="/summary">Job Summary</a></li>
          <li><a href="/questions_and_answers">Questions & Answers</a></li>
          <li><a href="/questions_and_answers">Finetuning Sheldon</a></li>
          <li><a href="/preview">Preview</a></li>
          <li><a href="/questions_and_answers">Live</a></li>
        </ul>
      </div>
    </div>
  </header>
{:else}
  <slot />
{/if}
