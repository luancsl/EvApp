import { createActions, createReducer } from 'reduxsauce';

/* Types and actions */
export const { Types, Creators } = createActions({
    addSpace: ['value', 'manual'],
    getSpace: ['value'],
    removeSpace: ['']
});


/* Valaue init */
const INITIAL_STATE = [];


/* Functions Reducers */
const addSpace = (state = INITIAL_STATE, action) => {

    if (state.length == 20) { state.pop() }

    if (action.manual) {
        return (
            [
                {
                    calculationType: 'manual',
                    ...action.value,
                },
                ...state
            ]
        );
    } else {
        return (
            [
                {
                    calculationType: 'automatic',
                    ...action.value,
                },
                ...state

            ]
        );
    }

};

const getSpace = (state = INITIAL_STATE, action) => state

const removeSpace = (state = INITIAL_STATE, action) => []



/* Create reducers */
export default createReducer(INITIAL_STATE, {
    [Types.ADD_SPACE]: addSpace,
    [Types.GET_SPACE]: getSpace,
    [Types.REMOVE_SPACE]: removeSpace
})