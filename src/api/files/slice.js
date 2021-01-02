import {createSlice} from '@reduxjs/toolkit';
import {actions as filesAction} from './actions';
import {thunks as filesThunks} from './thunks';

function createInitialUploadState(fileName) {
    return {
        fileName: fileName,
        progress: 0,
        processing: false,
        error: null
    }
} 

export const filesSlice = createSlice({
    name: 'files',
    initialState: {
        uploads: [],
        processing: false
    },
    reducers: {},
    extraReducers: {
        [filesThunks.allFiles.post.pending]: (state, {meta}) => {
            const uploads = meta.arg.map((file) => createInitialUploadState(file.name));
            state.uploads = uploads;
            state.processing = true;
        },
        [filesThunks.allFiles.post.fulfilled]: (state) => {
            state.processing = false;
        },
        [filesThunks.allFiles.post.rejected]: (state) => {
            state.processing = false;
        },
        [filesThunks.singleFile.post.pending]: (state, {meta}) => {
            const {uploadIndex} = meta.arg;
            state.uploads[uploadIndex].processing = true;
        },
        [filesAction.singleFile.post.inform]: (state, action) => {
            const {progress, uploadIndex} = action.payload;
            state.uploads[uploadIndex].progress = progress;
        },
        [filesThunks.singleFile.post.fulfilled]: (state, action) => {
            const {uploadIndex} = action.payload;
            state.uploads[uploadIndex].processing = false;
        },
        [filesThunks.singleFile.post.rejected]: (state, action) => {
            const {data, uploadIndex} = action.payload;
            state.uploads[uploadIndex].processing = false;
            state.uploads[uploadIndex].error = data;
        }
    }
});

export const filesReducer = filesSlice.reducer;
