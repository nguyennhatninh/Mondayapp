export const logout = (data) => {
    return {
        type: 'logout',
        payload: data,
    };
};

export const requireLogin = (data) => {
    return {
        type: 'requireLogin',
        payload: data,
    };
};

export const addTaskBoard = (data) => {
    return {
        type: 'taskBoards/addTaskBoard',
        payload: data,
    };
};

export const deleteTaskBoard = (data) => {
    return {
        type: 'taskBoards/deleteTaskBoard',
        payload: data,
    };
};

export const editTaskBoard = (data) => {
    return {
        type: 'taskBoards/editTaskBoard',
        payload: data,
    };
};

export const addTaskTable = (data) => {
    return {
        type: 'addTaskTable',
        payload: data,
    };
};
export const resetTaskTable = () => {
    return {
        type: 'resetTaskTable',
    };
};
export const searchTaskTable = (data) => {
    return {
        type: 'searchTaskTable',
        payload: data,
    };
};

export const groupFilter = (data) => {
    return {
        type: 'filterTool/groupFilter',
        payload: data,
    };
};

export const statusFilter = (data) => {
    return {
        type: 'filterTool/statusFilter',
        payload: data,
    };
};

export const dueDateFilter = (data) => {
    return {
        type: 'filterTool/dueDateFilter',
        payload: data,
    };
};

export const editHideTool = (data) => {
    return {
        type: 'hideTool/editHideTool',
        payload: data,
    };
};

export const sortTool = (data) => {
    return {
        type: 'sortTool',
        payload: data,
    };
};
