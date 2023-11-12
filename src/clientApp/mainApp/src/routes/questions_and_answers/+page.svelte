<script lang="ts">
  import { writable } from "svelte/store";
  import {
    FieldToEdit,
    ProjectState,
    type QuestionAndAnswer,
  } from "../../models/project-data";
  import { projectData, projectState } from "../../stores/project.store";
  import StepWithContent from "../../components/StepWithContent.svelte";
  import {
    getQAFinalReview,
    getQAList,
    getQARecommendation,
    getQAUpload,
  } from "../../services/projectStatus";
  import { PUBLIC_OPENAI_APIKEY } from "$env/static/public";
  import * as openAI from "openai";

  import Papa from "papaparse";
  import QAndAEditableCell from "../../components/QAndAEditableCell.svelte";
  import { runWizardRecommendationsQAndA } from "../../services/boostVoiceAi";

  let file = "";
  let files: FileList;
  $: if (files) {
    // Note that `files` is of type `FileList`, not an Array:
    // https://developer.mozilla.org/en-US/docs/Web/API/FileList
    console.log(files);

    for (const file of files) {
      uploadedCSV = file;
    }
  }

  let isEditableMode = writable(false);
  let editIndex = writable(-1);
  let editColumn = writable(FieldToEdit.Answer);
  let editableCellValue = writable("");

  let description = "";
  let jobDescription = "";
  let resume = "";
  let preferences = "";
  let currentStep = writable(1);

  let uploadedCSV: any;
  let userJSON: any;

  const handleCSVSubmit = () => {
    Papa.parse(uploadedCSV, {
      header: true,
      complete: (results: any) => {
        //console.log({ results });
        var newList: QuestionAndAnswer[] = [];
        let counter = 1;
        results.data.forEach((element: { Question: any; Answer: any }) => {
          var newQandA: QuestionAndAnswer = {
            index: counter,
            c: "technical",
            q: element.Question,
            a: element.Answer,
            r1: "",
            r2: "",
            r3: "",
          };
          newList.push(newQandA);
          counter++;
        });

        projectData.update((pd) => {
          return {
            ...pd,
            qAndA: newList,
            //add fields here
          };
        });

        userJSON = results;
      },
    });
  };

  const isLoadingRecommendations = writable(false);
  const getRecommendations = async () => {
    isLoadingRecommendations.set(true);

    const newQAndA = await runWizardRecommendationsQAndA({
      items: $projectData.qAndA,
      userData: { SCOPE: "job interview" },
    });
    projectData.update((pd) => {
      isLoadingRecommendations.set(false);
      return { ...pd, qAndA: newQAndA };
    });
  };

  const handleCSVUpload = (event: { target: { files: any[] } }) => {
    console.log(event.target.files[0]);
    uploadedCSV = event.target.files[0];
  };

  function setCurrentStepOneBack() {
    $currentStep = $currentStep - 1;
  }

  function setCurrentStepOneForward() {
    $currentStep = $currentStep + 1;
  }

  const saveProjectQA = async () => {
    projectData.update((pd) => {
      return {
        ...pd,
        //add fields here
      };
    });

    projectState.set(ProjectState.Configuring);
  };

  const generateDataDialogs = async () => {
    //data dialogs for summaries (20)
    //data dialogs for QARs (30)
  };
</script>

<div class="card bg-base-100 shadow-xl">
  <ul class="steps">
    <StepWithContent
      projectData={$projectData}
      stepName="Upload"
      checkFunction={getQAUpload}
    />
    <StepWithContent
      projectData={$projectData}
      stepName="Questions & Answers"
      checkFunction={getQAList}
    />
    <StepWithContent
      projectData={$projectData}
      stepName="AI Recommendations"
      checkFunction={getQARecommendation}
    />
    <StepWithContent
      projectData={$projectData}
      stepName="Final Review"
      checkFunction={getQAFinalReview}
    />
  </ul>
  <div class="card-body">
    {#if $currentStep === 1}
      <h2 class="card-title">Upload your Q&A Excel</h2>
      <div class="form step-one mt-8 items-center flex flex-col">
        <div class="form-control w-full max-w-xs">
          <label class="label" for="qa_uploadFile">
            <span class="label-text">Upload whatever you have?</span>
          </label>
          <input
            name="qa_uploadFile"
            bind:files
            accept="text/csv"
            type="file"
            class="file-input file-input-bordered w-full max-w-xs"
          />

          <button on:click={handleCSVSubmit} class="btn btn-active btn-primary"
            >Load File</button
          >
        </div>
      </div>
    {:else if $currentStep === 2}
      <h2 class="card-title">Potential Pool of Questions and Answers</h2>
      <div class="form step-one mt-8 items-center flex flex-col">
        <div class="overflow-x-auto h-90">
          <table class="table w-full table-sm table-pin-rows">
            <!-- head -->
            <thead>
              <tr>
                <th>No.</th>
                <th>Questions</th>
                <th>Answers</th>
              </tr>
            </thead>
            <tbody>
              {#each Array.from($projectData.qAndA) as qAndA}
                <tr>
                  <th>{qAndA.index}</th>
                  <td
                    >{qAndA.q}
                    <br />
                    <span class="badge badge-ghost badge-sm">{qAndA.c}</span>
                  </td>
                  <td>
                    <QAndAEditableCell
                      {qAndA}
                      fieldToEdit={FieldToEdit.Answer}
                    />
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    {:else if $currentStep === 3}
    <div class="recommendations-container">
      <h2 class="card-title">Recommendations</h2>
      <button on:click={getRecommendations} class="btn btn-active btn-primary">
        {#if $isLoadingRecommendations}
          <span class="loading loading-spinner" />
          Loading...
        {:else}
          Autopopulate Recommendations{/if}</button
      >
    </div>
      <div class="form step-one mt-8 items-center flex flex-col">
        <div class="overflow-x-auto h-90">
          <table class="table w-full table-sm table-pin-rows">
            <!-- head -->
            <thead>
              <tr>
                <th>No.</th>
                <th>Questions</th>
                <th>Answers</th>
                <th>Recommendation 1</th>
                <th>Recommendation 2</th>
                <th>Recommendation 3</th>
              </tr>
            </thead>
            <tbody>
              {#each Array.from($projectData.qAndA) as qAndA}
                <tr>
                  <th>{qAndA.index}</th>
                  <td
                    >{qAndA.q}<br />
                    <span class="badge badge-ghost badge-sm">{qAndA.c}</span
                    ></td
                  >
                  <td>{qAndA.a}</td>
                  <td
                    ><QAndAEditableCell
                      {qAndA}
                      fieldToEdit={FieldToEdit.Recommendation1}
                    /></td
                  >
                  <td
                    ><QAndAEditableCell
                      {qAndA}
                      fieldToEdit={FieldToEdit.Recommendation2}
                    /></td
                  >
                  <td
                    ><QAndAEditableCell
                      {qAndA}
                      fieldToEdit={FieldToEdit.Recommendation3}
                    /></td
                  >
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    {:else}
      <h2 class="card-title">Final Review</h2>
      <div class="form step-one mt-8 items-center flex flex-col">
        <div class="form-control w-full max-w-xs" />
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
            saveProjectQA();
            setCurrentStepOneForward();
          }}
          class="btn btn-active btn-primary">Next</button
        >
      {:else}
        <button
          on:click={async () => {
            await saveProjectQA();
            await generateDataDialogs();
          }}
          class="btn btn-active btn-primary">Save and Submit</button
        >
      {/if}
    </div>
  </div>
</div>

<style>
  .recommendations-container {
    display: flex;
    justify-content: space-between;
  }
</style>
