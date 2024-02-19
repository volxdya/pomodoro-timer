import { hookstate } from "@hookstate/core";

export const tasksAll = hookstate([]);
export const currentTaskId = hookstate('');
export const currentTask = hookstate({});
export const countPause = hookstate(0);
export const pomorodos = hookstate(0);
export const pauseTime = hookstate(0);
export const allTime = hookstate(0);
export const pomodorosOnTask = hookstate(0); // помидорки до начала таймера
export const chillTime = hookstate(5 * 60);