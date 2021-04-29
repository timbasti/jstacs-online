import {createSelector} from '@reduxjs/toolkit';

export const selectState = (state) => state.tools;

export const selectError = (state) => {
    const toolsState = selectState(state);
    return toolsState.error;
};

export const selectProcessing = (state) => {
    const toolsState = selectState(state);
    return toolsState.processing;
};

export const selectAvailableTools = (state) => {
    const toolsState = selectState(state);
    return toolsState.available;
};

export const selectHasError = createSelector([selectError], (error) => Boolean(error));

export const selectNumberOfTools = createSelector([selectAvailableTools], (tools) => tools && tools.length || 0);
