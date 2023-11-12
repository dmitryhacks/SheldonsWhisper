<script lang="ts">
    import { PUBLIC_WIDGET_URL } from "$env/static/public";
  import { createSession, type ProjectSession } from "../../services/boostVoiceAi";
    import { projectId } from "../../stores/project.store";

  let session: ProjectSession;
  let userPhoneNumber: string;

  let promise: Promise<ProjectSession>;

  async function onStart(event: SubmitEvent & {
    currentTarget: EventTarget & HTMLFormElement;
  }) {
    var formData = new FormData(event.currentTarget);
    userPhoneNumber = formData.get('phone_number') as string;

    session = await createSession({
      projectId: $projectId,
      destination_phone_number: userPhoneNumber,
    })
  }
</script>

<div class="card bg-base-100 shadow-xl">
  <div class="card-body">
    <div class="card-title">Live</div>

    <div class="live-container">
      {#if !session}

        <form on:submit|preventDefault={onStart}>
          <input
            type="tel"
            placeholder="Your phone number"
            class="input input-bordered w-full max-w-xs"
            required
            name="phone_number"
          />
          <button
            type="submit"
            class="btn btn-active btn-primary"
          >
            Start
          </button>
        </form>

      {:else}
      <div>
        <div>
          Your interviewer will call this number:
        </div>
        <h2>
          +{session.phoneNumber}
        </h2>

        <div>
          Sheldon will quietly join you by calling this number:
        </div>
        <h2>
          {userPhoneNumber}
        </h2>
      </div>
      
      <div class="widget">
        <iframe
          src="{PUBLIC_WIDGET_URL}?session_id={session.id}"
          title="preview widget"
        />
      </div>
      {/if}
    </div>
  </div>
</div>

<style>
  iframe {
    height: 600px;
    width: 370px;
  }

  .live-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .live-container h2 {
    font-size: 2em;
    margin-bottom: 20px;
  }

  .widget {
    display: flex;
    justify-content: center;
  }

</style>
