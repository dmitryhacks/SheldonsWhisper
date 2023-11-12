<script lang="ts">
  import { FieldToEdit, type QuestionAndAnswer } from "../models/project-data";
  import {
    editableCellColumnType,
    editableCellCurrentValue,
    editableCellDataSourceIndex,
    editableCellIsEditableMode,
  } from "../stores/editableCell.store";
  import { projectData } from "../stores/project.store";

  export let qAndA: QuestionAndAnswer;
  export let fieldToEdit: FieldToEdit;

  const displayColumn = (qaItem: QuestionAndAnswer, column: FieldToEdit) => {
    let valueToDisplay = '';
    switch (column) {

      case FieldToEdit.Answer: {
        valueToDisplay = qaItem.a || "";
        break;
      }
      case FieldToEdit.Recommendation1: {
        valueToDisplay = qaItem.r1 || "";
        break;
      }
      case FieldToEdit.Recommendation2: {
        valueToDisplay = qaItem.r2 || "";
        break;
      }
      case FieldToEdit.Recommendation3: {
        valueToDisplay = qaItem.r3 || "";
        break;
      }
      default: {
        break;
      }
    }
    return valueToDisplay || '<empty>';
  };

  const startEditModel = (
    qAndA: QuestionAndAnswer,
    fieldToEdit: FieldToEdit
  ) => {
    if (!$editableCellIsEditableMode) {
      editableCellColumnType.set(fieldToEdit);
      editableCellDataSourceIndex.set(qAndA.index);
      editableCellIsEditableMode.set(true);
      switch (fieldToEdit) {
        case FieldToEdit.Answer: {
          editableCellCurrentValue.set(qAndA.a || "");
          break;
        }
        case FieldToEdit.Recommendation1: {
          editableCellCurrentValue.set(qAndA.r1 || "");
          break;
        }
        case FieldToEdit.Recommendation2: {
          editableCellCurrentValue.set(qAndA.r2 || "");
          break;
        }
        case FieldToEdit.Recommendation3: {
          editableCellCurrentValue.set(qAndA.r3 || "");
          break;
        }
        default: {
          break;
        }
      }
    }
  };

  const saveEdit = () => {
    if ($editableCellIsEditableMode) {
      projectData.update((pd) => {
        switch ($editableCellColumnType) {
          case FieldToEdit.Answer: {
            pd.qAndA[$editableCellDataSourceIndex - 1].a =
              $editableCellCurrentValue;
            break;
          }
          case FieldToEdit.Recommendation1: {
            pd.qAndA[$editableCellDataSourceIndex - 1].r1 =
              $editableCellCurrentValue;
            break;
          }
          case FieldToEdit.Recommendation2: {
            pd.qAndA[$editableCellDataSourceIndex - 1].r2 =
              $editableCellCurrentValue;
            break;
          }
          case FieldToEdit.Recommendation3: {
            pd.qAndA[$editableCellDataSourceIndex - 1].r3 =
              $editableCellCurrentValue;
            break;
          }
          default: {
            break;
          }
        }
        editableCellCurrentValue.set("");
        editableCellIsEditableMode.set(false);
        editableCellDataSourceIndex.set(-1);
        return pd;
      });
    }
  };

  const cancelEdit = () => {
    if ($editableCellIsEditableMode) {
      editableCellCurrentValue.set("");
      editableCellIsEditableMode.set(false);
      editableCellDataSourceIndex.set(-1);
    }
  };
</script>

{#if !$editableCellIsEditableMode}
  {displayColumn(qAndA, fieldToEdit)}
  <br />
  <button
    on:click={() => {
      startEditModel(qAndA, fieldToEdit);
    }}
    class="btn btn-ghost btn-xs">edit</button
  >
{:else if $editableCellDataSourceIndex == qAndA.index && $editableCellColumnType == fieldToEdit}
  <div class="form step-one flex flex-col">
    <div class="form-control w-full">
      <textarea
        name="editableCell"
        bind:value={$editableCellCurrentValue}
        class="textarea textarea-bordered textarea-xs"
        placeholder=""
      />
    </div>
    <div class="card-actions">
      <button on:click={saveEdit} class="btn btn-active btn-ghost btn-xs"
        >save</button
      >
      <button on:click={cancelEdit} class="btn btn-active btn-ghost btn-xs"
        >cancel</button
      >
    </div>
  </div>
{:else}
  {displayColumn(qAndA, fieldToEdit)}
{/if}
