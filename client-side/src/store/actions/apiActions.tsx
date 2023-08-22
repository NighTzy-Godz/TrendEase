import { createAction } from "@reduxjs/toolkit";

export const apiCallBegan = createAction("api/apiCallBegan");
export const apiCallSuccess = createAction<any[]>("api/apiCallSuccess");
export const apiCallFailed = createAction<string>("api/apiCallFailed");
