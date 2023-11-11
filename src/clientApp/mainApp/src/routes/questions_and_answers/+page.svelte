<script lang="ts">
    import { writable } from "svelte/store";
    import { ProjectState } from "../../models/project-data";
    import { projectData, projectState } from "../../stores/project.store";
    import StepWithContent from "../../components/StepWithContent.svelte";
    import {
  getQAFinalReview,
  getQAList,
  getQARecommendation,
  getQAUpload,

    } from "../../services/projectStatus";
  
    let file = "";
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
              <span class="label-text"
                >Upload whatever you have?</span
              >
            </label>
            <input name="qa_uploadFile" bind:value={file} type="file" class="file-input file-input-bordered w-full max-w-xs" />

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
                <!-- row 1 -->
                <tr>
                  <th>1</th>
                  <td>Explain the concept of event-driven programming in Node.js.</td>
                  <td>Node.js is built around an event-driven architecture, where certain kinds of objects (called "emitters") emit named events that cause Function objects ("listeners") to be called.</td>
                </tr>
                <!-- row 2 -->
                <tr>
                  <th>2</th>
                  <td>What is the Node.js event loop and how does it work?</td>
                  <td>The event loop is what allows Node.js to perform non-blocking I/O operations, despite JavaScript being single-threaded. It handles all asynchronous callbacks in a loop.</td>
                </tr>
                <!-- row 3 -->
                <tr>
                  <th>3</th>
                  <td>What are streams in Node.js?</td>
                  <td>Streams are collections of data that might not be available all at once and don't need to fit in memory. This makes streams ideal for reading or writing large amounts of data.</td>
                </tr>
                <!-- row 4 -->
                <tr>
                  <th>4</th>
                  <td>How does Node.js handle child threads?</td>
                  <td>Node.js, primarily being single-threaded, can spawn child processes to handle parallel processing of tasks using the 'child_process' module.</td>
                </tr>
                <!-- row 5 -->
                <tr>
                  <th>5</th>
                  <td>Explain the use of middleware in Express.js.</td>
                  <td>Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.</td>
                </tr>
                <!-- row 6 -->
                <tr>
                  <th>6</th>
                  <td>What is the difference between process.nextTick() and setImmediate()?</td>
                  <td>The process.nextTick() function defers the execution of an action till the next pass around the event loop. setImmediate() is designed to execute a script once the current poll phase completes.</td>
                </tr>
                <!-- row 7 -->
                <tr>
                  <th>7</th>
                  <td>How do you ensure that a Node.js process runs continuously?</td>
                  <td>Node.js processes can be kept running continuously by using process managers like PM2, which help in managing and keeping the Node.js processes alive.</td>
                </tr>
                <!-- row 8 -->
                <tr>
                  <th>8</th>
                  <td>What are worker threads in Node.js?</td>
                  <td>Worker threads are a way to create multiple threads in Node.js, allowing CPU-intensive tasks to be handled in the background without blocking the main thread.</td>
                </tr>
                <!-- row 9 -->
                <tr>
                  <th>9</th>
                  <td>Explain the concept of middleware in Node.js.</td>
                  <td>Middleware in Node.js is a function that has access to the request object, response object, and the next function in the application’s request-response cycle. It can execute any code, modify request and response objects, and end the request-response cycle.</td>
                </tr>
                <!-- row 10 -->
                <tr>
                  <th>10</th>
                  <td>What is the purpose of module.exports in Node.js?</td>
                  <td>module.exports is used to export functions, objects, or primitive values from a module so they can be used by other programs with the require() function.</td>
                </tr>
                <!-- row 11 -->
                <tr>
                  <th>11</th>
                  <td>How do you manage package versions in Node.js?</td>
                  <td>Package versions in Node.js are managed using the package.json file and the Node Package Manager (npm). Semantic versioning is used for specifying and managing package versions.</td>
                </tr>
                <!-- row 12 -->
                <tr>
                  <th>12</th>
                  <td>What is the event emitter in Node.js and its use?</td>
                  <td>The event emitter is a pattern that allows listeners to subscribe to named events, and when an emitter object emits an event, all attached listeners are called.</td>
                </tr>
                <!-- row 13 -->
                <tr>
                  <th>13</th>
                  <td>Explain how Node.js works with non-blocking I/O operations.</td>
                  <td>Node.js operates on a single-thread, using non-blocking I/O calls, allowing it to support thousands of concurrent connections without the burden of managing thread concurrency.</td>
                </tr>
                <!-- row 14 -->
                <tr>
                  <th>14</th>
                  <td>What are the benefits of using Node.js?</td>
                  <td>Node.js offers benefits like non-blocking I/O, a single programming language for both client and server side, high performance, and a rich ecosystem of modules.</td>
                </tr>
                <!-- row 15 -->
                <tr>
                  <th>15</th>
                  <td>How can you secure your HTTP cookies against XSS attacks in Node.js?</td>
                  <td>HTTP cookies can be secured against XSS attacks by setting the HttpOnly flag, making them inaccessible to client-side scripts.</td>
                </tr>
                <!-- row 16 -->
                <tr>
                  <th>16</th>
                  <td>What is REPL in Node.js?</td>
                  <td>REPL stands for Read-Eval-Print Loop. It is a simple, interactive computer programming environment that takes single user inputs, executes them, and returns the result to the user.</td>
                </tr>
                <!-- row 17 -->
                <tr>
                  <th>17</th>
                  <td>What is the difference between Node.js and Ajax?</td>
                  <td>While Node.js is a server-side platform for building network applications, Ajax (Asynchronous JavaScript and XML) is a client-side technique for creating asynchronous web requests.</td>
                </tr>
                <!-- row 18 -->
                <tr>
                  <th>18</th>
                  <td>How do you handle exceptions in Node.js?</td>
                  <td>Exceptions in Node.js can be handled using try-catch blocks, process.on('uncaughtException'), or using middleware in frameworks like Express.js.</td>
                </tr>
                <!-- row 19 -->
                <tr>
                  <th>19</th>
                  <td>What is the use of the Buffer class in Node.js?</td>
                  <td>The Buffer class in Node.js is used to handle binary data. It allows the manipulation of raw binary data in the same way arrays of integers are manipulated in JavaScript.</td>
                </tr>
                <!-- row 20 -->
                <tr>
                  <th>20</th>
                  <td>Explain the concept of middleware in Express.js.</td>
                  <td>Middleware in Express.js is a series of functions that get executed in the order they are introduced into the server. They can execute code, modify request and response objects, end the request-response cycle, or call the next middleware in the stack.</td>
                </tr>
              </tbody>
            </table>
          </div>
          
        </div>
      {:else if $currentStep === 3}
      <h2 class="card-title">Recommendations</h2>
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
                <!-- row 1 -->
                <tr>
                  <th>1</th>
                  <td>Explain the concept of event-driven programming in Node.js.</td>
                  <td>Node.js is built around an event-driven architecture, where certain kinds of objects (called "emitters") emit named events that cause Function objects ("listeners") to be called.</td>
                  <td>Event-driven architecture</td>
                  <td>Emitters emit events</td>
                  <td>Triggers listeners to be called</td>
                </tr>
                <!-- row 2 -->
                <tr>
                  <th>2</th>
                  <td>What is the Node.js event loop and how does it work?</td>
                  <td>The event loop is what allows Node.js to perform non-blocking I/O operations, despite JavaScript being single-threaded. It handles all asynchronous callbacks in a loop.</td>
                  <td>Non-blocking I/O</td>
                  <td>Single-threaded nature</td>
                  <td>Asynchronous callbacks</td>
                </tr>
                <!-- row 3 -->
                <tr>
                  <th>3</th>
                  <td>What are streams in Node.js?</td>
                  <td>Streams are collections of data that might not be available all at once and don't need to fit in memory. This makes streams ideal for reading or writing large amounts of data.</td>
                  <td>Handling large data</td>
                  <td>Efficient data processing</td>
                  <td>Readable and writable</td>
                </tr>
                <!-- row 4 -->
                <tr>
                  <th>4</th>
                  <td>How does Node.js handle child threads?</td>
                  <td>Node.js, primarily being single-threaded, can spawn child processes to handle parallel processing of tasks using the 'child_process' module.</td>
                  <td>Child processes</td>
                  <td>Parallel processing</td>
                  <td>'child_process' module</td>
                </tr>
                <!-- row 5 -->
                <tr>
                  <th>5</th>
                  <td>Explain the use of middleware in Express.js.</td>
                  <td>Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.</td>
                  <td>Request-response cycle</td>
                  <td>Function access to req and res</td>
                  <td>Next middleware function</td>
                </tr>
                <!-- row 6 -->
                <tr>
                  <th>6</th>
                  <td>What is the difference between process.nextTick() and setImmediate()?</td>
                  <td>The process.nextTick() function defers the execution of an action till the next pass around the event loop. setImmediate() is designed to execute a script once the current poll phase completes.</td>
                  <td>Event loop phases</td>
                  <td>process.nextTick() usage</td>
                  <td>setImmediate() usage</td>
                </tr>
                <!-- row 7 -->
                <tr>
                  <th>7</th>
                  <td>How do you ensure that a Node.js process runs continuously?</td>
                  <td>Node.js processes can be kept running continuously by using process managers like PM2, which help in managing and keeping the Node.js processes alive.</td>
                  <td>Process managers</td>
                  <td>PM2 usage</td>
                  <td>Continuous running</td>
                </tr>
                <!-- row 8 -->
                <tr>
                  <th>8</th>
                  <td>What are worker threads in Node.js?</td>
                  <td>Worker threads are a way to create multiple threads in Node.js, allowing CPU-intensive tasks to be handled in the background without blocking the main thread.</td>
                  <td>Multi-threading</td>
                  <td>CPU-intensive tasks</td>
                  <td>Non-blocking processing</td>
                </tr>
                <!-- row 9 -->
                <tr>
                  <th>9</th>
                  <td>Explain the concept of middleware in Node.js.</td>
                  <td>Middleware in Node.js is a function that has access to the request object, response object, and the next function in the application’s request-response cycle. It can execute any code, modify request and response objects, and end the request-response cycle.</td>
                  <td>Code execution</td>
                  <td>Modify req/res objects</td>
                  <td>Control flow</td>
                </tr>
                <!-- row 10 -->
                <tr>
                  <th>10</th>
                  <td>What is the purpose of module.exports in Node.js?</td>
                  <td>module.exports is used to export functions, objects, or primitive values from a module so they can be used by other programs with the require() function.</td>
                  <td>Module reusability</td>
                  <td>Exporting modules</td>
                  <td>require() function</td>
                </tr>
                <!-- Additional rows omitted for brevity -->
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
  