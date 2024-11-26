export const logout = (data) => {
    return {
        type: 'logout',
        payload: data,
    };
};

export const requireLogin = (data) => {
    const defaultData = { name: 'login', description: 'You need to log in to continue', status: data, button: 'Login' };
    return {
        type: 'require/login',
        payload: defaultData,
    };
};

export const requireOther = (data) => {
    return {
        type: 'require/other',
        payload: data,
    };
};

export const searchTool = (data) => {
    return {
        type: 'tools/search',
        payload: data,
    };
};

export const filterDate = (data) => {
    return {
        type: 'tools/filter/date',
        payload: data,
    };
};

export const filterGroup = (data) => {
    return {
        type: 'tools/filter/group',
        payload: data,
    };
};

export const filterStatus = (data) => {
    return {
        type: 'tools/filter/status',
        payload: data,
    };
};

export const toolSorts = (data) => {
    return {
        type: 'tools/sort',
        payload: data,
    };
};

export const clearTool = () => {
    return {
        type: 'tools/clear',
    };
};
