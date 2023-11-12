<script lang="ts">
  import { ConfigurationSectionStatus, type ProjectData } from "../models/project-data";

    export let projectData:ProjectData;
    export let stepName:string;
    export let checkFunction:any;

    $: isStepStatus = checkFunction(projectData);
</script>

{#if isStepStatus === ConfigurationSectionStatus.Good}
<li data-content="✓" class="step step-primary">
    {stepName}
</li>
{:else if isStepStatus === ConfigurationSectionStatus.Error}
<li data-content="?" class="step step-error">
    {stepName}
</li>
{:else}
<li class="step step-neutral">
    {stepName}
</li>
{/if}