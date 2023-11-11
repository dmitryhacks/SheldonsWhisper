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
  import { PUBLIC_OPENAI_APIKEY } from '$env/static/public';
  import * as openAI from 'openai';

  import Papa from "papaparse";
  import QAndAEditableCell from "../../components/QAndAEditableCell.svelte";

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
  let editableCellValue = writable('');



  

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
            c: 'technical',
            q: element.Question,
            a: element.Answer,
            r1: '',
            r2: '',
            r3: '',
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

  function getRecommendations(){
    fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${PUBLIC_OPENAI_APIKEY}`
    },
    body: JSON.stringify({
      "model": "gpt-4",
      "messages":[
        {
        "role": "system",
        "content": "You are a helpful assistant. Your results are JSON string of array. Your prompt will be an JSON array of two strings. THe first part is the interview question. The second part is the answer to the interview question. You must provide between 1 and 3 recommendations, so if I read the interview question, and your recommendations, I can deduce the anwer. Your recommendations should be very concise (up to 6 words per recommendation. Here is an example of the request: [\"Explain the concept of event-driven programming in Node.js\",\"Node.js is built around an event-driven architecture, where certain kinds of objects (called \"emitters\") emit named events that cause Function objects (\"listeners\") to be called.\"] And here is a sample answer: [\"event-driven architecture\",\"emitters emit events\",\"triggers listeners to be called\",]"
      },
      {
        "role": "user",
        "content": "[\"What is the purpose of module.exports in Node.js?\",\"module.exports is used to export functions, objects, or primitive values from a module so they can be used by other programs with the require() function.\"]"
      }
      ],
      "response_format": { "type": "json_object" },
      "temperature": 0,
      "max_tokens": 100,
      "top_p": 1,
      "frequency_penalty": 0.0,
      "presence_penalty": 0.0,
      "stop": ["\n"]
    })
  }
).then(r=>console.log(r))
  }

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

  function saveProjectQA() {
    projectData.update((pd) => {
      return {
        ...pd,
        //add fields here
      };
    });

    projectState.set(ProjectState.Configuring);
  }
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
                  <td>{qAndA.q}
                    <br/>
                    <span class="badge badge-ghost badge-sm">{qAndA.c}</span>
                </td>
                  <td>
                    <QAndAEditableCell qAndA = {qAndA} fieldToEdit = {FieldToEdit.Answer} />
                </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    {:else if $currentStep === 3}
      <h2 class="card-title">Recommendations</h2><button on:click={getRecommendations} class="btn btn-active btn-primary" >Get one</button>
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
                <td>{qAndA.q}<br/>
                  <span class="badge badge-ghost badge-sm">{qAndA.c}</td>
                <td>{qAndA.a}</td>
                <td><QAndAEditableCell qAndA = {qAndA} fieldToEdit = {FieldToEdit.Recommendation1} /></td>
                <td><QAndAEditableCell qAndA = {qAndA} fieldToEdit = {FieldToEdit.Recommendation2} /></td>
                <td><QAndAEditableCell qAndA = {qAndA} fieldToEdit = {FieldToEdit.Recommendation3} /></td>
              </tr>
            {/each}
              
            </tbody>
          </table>
        </div>
      </div>
    {:else}
      <h2 class="card-title">Finale Review</h2>
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
            saveProjectQA();
            setCurrentStepOneForward();
          }}
          class="btn btn-active btn-primary">Next</button
        >
      {:else}
        <button on:click={saveProjectQA} class="btn btn-active btn-primary"
          >Save</button
        >
      {/if}
    </div>
  </div>
</div>
