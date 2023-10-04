import { createAction } from "@reduxjs/toolkit";

export const apiCallBegan = createAction<any>("api/apiCallBegan");
export const apiCallSuccess = createAction<any>("api/apiCallSuccess");
export const apiCallFailed = createAction<any>("api/apiCallFailed");
