const initState = {
    taskBoards: JSON.parse(localStorage.getItem(`TaskBoards`)) || [
        { id: 1, name: 'Your Workspace', config: '/taskBoard/221228712000' },
    ],
    addTaskTable: [],
    searchTaskTable: { value: null, index: null },
    filterTool: {
        groupFilter: { indexTB: null, index: null },
        dueDateFilter: { indexTB: null, value: null },
        statusFilter: { indexTB: null, value: null },
    },
    hideTool: { index: null, hideToolValue: [true, true, true] },
    sortTool: { index: null, indexTB: null, sortToolValue: null, label: '' },
    login: !!localStorage.getItem('accessToken'),
    require: { name: '', status: false, description: '', button: '' },
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
        case 'taskBoards/addTaskBoard':
            localStorage.setItem('TaskBoards', JSON.stringify([...state.taskBoards, action.payload]));
            return {
                ...state,
                taskBoards: [...state.taskBoards, action.payload],
            };
        case 'taskBoards/deleteTaskBoard':
            const taskBoardDelelte = [...state.taskBoards];
            taskBoardDelelte.splice(action.payload, 1);
            localStorage.setItem(`TaskBoards`, JSON.stringify([...taskBoardDelelte]));
            return {
                ...state,
                taskBoards: [...taskBoardDelelte],
            };
        case 'taskBoards/editTaskBoard':
            const updatedTaskBoards = state.taskBoards.map((item, index) => {
                if (index === action.payload.index) {
                    return { ...item, name: action.payload.value };
                }
                return item;
            });
            localStorage.setItem('TaskBoards', JSON.stringify([...updatedTaskBoards]));
            return {
                ...state,
                taskBoards: [...updatedTaskBoards],
            };
        case 'addTaskTable':
            return {
                ...state,
                addTaskTable: [...state.addTaskTable, action.payload],
            };
        case 'resetTaskTable':
            return {
                ...state,
                addTaskTable: [],
            };
        case 'searchTaskTable':
            return {
                ...state,
                searchTaskTable: action.payload,
            };
        case 'filterTool/groupFilter':
            return {
                ...state,
                filterTool: { ...state.filterTool, groupFilter: action.payload },
            };
        case 'filterTool/statusFilter':
            return {
                ...state,
                filterTool: { ...state.filterTool, statusFilter: action.payload },
            };
        case 'filterTool/dueDateFilter':
            return {
                ...state,
                filterTool: { ...state.filterTool, dueDateFilter: action.payload },
            };
        case 'hideTool/editHideTool':
            return {
                ...state,
                hideTool: action.payload,
            };
        case 'sortTool':
            return {
                ...state,
                sortTool: action.payload,
            };
        default:
            return state;
    }
};

export default rootReducer;
