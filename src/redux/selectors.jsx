export const taskBoardsSelector = (state) => state.taskBoards;
export const addTaskTableSelector = (state) => state.addTaskTable;
export const searchTaskTableSelector = (state) => state.searchTaskTable;
export const groupFilterSelector = (state) => state.filterTool.groupFilter;
export const dueDateFilterSelector = (state) => state.filterTool.dueDateFilter;
export const statusFilterSelector = (state) => state.filterTool.statusFilter;
export const hideToolSelector = (state) => state.hideTool;
export const sortToolSelector = (state) => state.sortTool;
