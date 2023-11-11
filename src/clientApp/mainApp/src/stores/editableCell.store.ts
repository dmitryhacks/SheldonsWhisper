import { writable } from "svelte/store";
import { FieldToEdit } from "../models/project-data";

export const editableCellIsEditableMode = writable(false);
export const editableCellDataSourceIndex = writable(-1);
export const editableCellColumnType = writable(FieldToEdit.None);
export const editableCellCurrentValue = writable('');