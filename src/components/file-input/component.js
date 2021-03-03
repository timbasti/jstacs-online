import {Box, FormControl, FormHelperText, InputLabel, OutlinedInput} from '@material-ui/core';
import {saveAs} from 'file-saver';
import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useRef, useState} from 'react';

import {SplitButton} from '../split-button/component';
import {useStyles} from './styles';

const getFileUrl = (name) => `${process.env.REACT_APP_SERVICE_HOST}/files/${name}`;

const saveFile = (file) => {
    if (!file.name) {
        return;
    }
    if (file.size && typeof file.size === 'number') {
        saveAs(file);
    } else {
        const fileUrl = getFileUrl(file.name);
        saveAs(fileUrl, file.name);
    }
};

const options = ['Load file', 'Save file'];

const FileInput = ({name, label, file, helperText, onChange, className}) => {
    const inputRef = useRef();
    const labelRef = useRef();
    const [labelWidth, setLabelWidth] = useState(0);
    const classes = useStyles({labelWidth});

    const handleFileInputChanged = useCallback(
        (evnt) => {
            const [loadedFile] = evnt.target.files;
            if (!loadedFile) {
                return;
            }
            onChange(loadedFile);
        },
        [onChange]
    );

    const handleOptionClick = useCallback(
        (clickedOption) => {
            switch (clickedOption) {
            case 0:
                inputRef.current.click();
                break;
            case 1:
                saveFile(file);
                break;
            default:
                break;
            }
        },
        [inputRef, file]
    );

    useEffect(() => {
        if (labelRef.current) {
            const padding = 28;
            const {clientWidth} = labelRef.current;
            const scalingFactor = 0.75;
            const scaledWidth = clientWidth * scalingFactor;
            setLabelWidth(scaledWidth + padding);
        }
    }, [labelRef, setLabelWidth]);

    return (
        <FormControl
            className={`${className} ${classes.root}`}
            variant="outlined"
        >
            <InputLabel
                htmlFor={name}
                ref={labelRef}
            >
                {label}
            </InputLabel>

            <Box className={classes.input}>
                <OutlinedInput
                    className={classes.fileDisplay}
                    id={name}
                    label={label}
                    readOnly
                    type="text"
                    value={file && file.name}
                />

                <SplitButton
                    className={classes.fileAction}
                    defaultSelected={file && file.name ? 1 : 0}
                    label="Select file operation"
                    onClick={handleOptionClick}
                    options={options}
                />
            </Box>

            <FormHelperText className={classes.fileComment}>
                {helperText}
            </FormHelperText>

            <input
                hidden
                onChange={handleFileInputChanged}
                ref={inputRef}
                type="file"
            />
        </FormControl>
    );
};

FileInput.propTypes = {
    className: PropTypes.string,
    file: PropTypes.shape({name: PropTypes.string.isRequired}),
    helperText: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func
};

FileInput.defaultProps = {
    className: '',
    file: {name: ''},
    helperText: '',
    label: '',
    name: '',
    onChange: () => {}
};

export {FileInput};
