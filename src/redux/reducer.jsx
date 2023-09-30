const initState = {
    taskBoards: JSON.parse(localStorage.getItem(`TaskBoards`)) || [
        { id: 1, name: 'ninh', config: '/taskBoard/221228712000' },
    ],
    hideTool: { index: null, hideToolValue: [true, true, true] },
    sortTool: { index: null, indexTB: null, sortToolValue: null, label: '' },
    addTaskTable: [],
    searchTaskTable: { value: null, index: null },
};

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'taskBoards/addTaskBoard':
            localStorage.setItem(`TaskBoards`, JSON.stringify([...state.taskBoards, action.payload]));
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
        default:
            return state;
    }
};

export default rootReducer;
