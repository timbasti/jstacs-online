import {AppBar, Hidden, IconButton, makeStyles, Toolbar, Typography} from '@material-ui/core';
import BrightnessMediumIcon from '@material-ui/icons/BrightnessMedium';
import MenuIcon from '@material-ui/icons/Menu';
import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {open as openDrawer} from '../../api/drawer/actions';
import {changeApplicationTheme} from '../../api/theme/actions';
import {selectPaletteType} from '../../api/theme/selectors';
// import logo from '../../assets/logo.png';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
    const titleSpacing = 2;
    return {
        appBar: {
            [theme.breakpoints.up('md')]: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`
            },
            zIndex: theme.zIndex.drawer + 1
        },
        logo: {
            height: 48,
            marginLeft: -12,
            padding: 12,
            width: 48
        },
        title: {
            flexGrow: 1,
            marginLeft: theme.spacing(titleSpacing)
        }
    };
});

export const JstacsHeader = () => {
    const themePaletteType = useSelector(selectPaletteType);
    const dispatch = useDispatch();

    const handleDrawerOpen = useCallback(() => {
        dispatch(openDrawer());
    }, [dispatch]);

    const handleDarkThemeToggle = useCallback(() => {
        const newPaletteType = themePaletteType === 'dark' ? 'light' : 'dark';
        dispatch(changeApplicationTheme(newPaletteType));
    }, [dispatch, themePaletteType]);

    const classes = useStyles();

    return (
        <AppBar
            className={classes.appBar}
            elevation={0}
            position="fixed"
        >
            <Toolbar>
                <Hidden mdUp>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerOpen}
                        title="Toggle open/close menu"
                    >
                        <MenuIcon />
                    </IconButton>
                </Hidden>
                <Typography
                    className={classes.title}
                    variant="h6"
                >
                    TODO: Add current pathname
                </Typography>
                <IconButton
                    color="inherit"
                    edge="end"
                    onClick={handleDarkThemeToggle}
                    title="Toggle light/dark theme"
                >
                    <BrightnessMediumIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};
