const initState = {
    login: !!localStorage.getItem('accessToken'),
    require: { name: '', status: false, description: '', button: '' },
    tools: { search: '', filter: { date: '', status: '', group: '' }, sortBy: '', sortOrder: '' },
};

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'logout':
            return {
                ...state,
                login: action.payload,
            };
        case 'require/login':
            return {
                ...state,
                require: action.payload,
            };
        case 'require/other':
            if (typeof action.payload === 'boolean') {
                return {
                    ...state,
                    require: { ...state.require, status: action.payload },
                };
            }
            return {
                ...state,
                require: action.payload,
            };
        case 'tools/search':
            return {
                ...state,
                tools: { ...state.tools, search: action.payload },
            };
        case 'tools/filter/date':
            return {
                ...state,
                tools: { ...state.tools, filter: { ...state.tools.filter, date: action.payload } },
            };
        case 'tools/filter/status':
            return {
                ...state,
                tools: { ...state.tools, filter: { ...state.tools.filter, status: action.payload } },
            };
        case 'tools/filter/group':
            return {
                ...state,
                tools: { ...state.tools, filter: { ...state.tools.filter, group: action.payload } },
            };
        case 'tools/sort':
            return {
                ...state,
                tools: { ...state.tools, sortBy: action.payload.sortBy, sortOrder: action.payload.sortOrder },
            };
        case 'tools/clear':
            return {
                ...state,
                tools: { search: '', filter: { date: '', status: '', group: '' }, sort: { date: '', task: '' } },
            };
        default:
            return state;
    }
};

export default rootReducer;
