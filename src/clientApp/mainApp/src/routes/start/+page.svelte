<script>
  import { onMount } from "svelte";
  import StartProject from "../../components/StartProject.svelte";
  import { projectState } from "../../stores/project.store";
  import { goto } from "$app/navigation";
  import { ProjectState } from "../../models/project-data";
  onMount(() => {
    let state;
    const unsubscribe = projectState.subscribe((value) => {
      state = value;
      if (state !== ProjectState.NotStarted) {
        goto("/summary", { replaceState: true });
      }
    });

    return unsubscribe;
  });
</script>

<StartProject />
