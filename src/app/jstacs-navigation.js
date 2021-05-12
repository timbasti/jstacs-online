import {Box, Collapse, Divider, Drawer, Hidden, List, ListItem, ListItemIcon, ListItemText, makeStyles} from '@material-ui/core';
import {ExpandLess, ExpandMore} from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink, useLocation, useParams} from 'react-router-dom';

import {selectAvailableApplications} from '../api/applications/selectors';
import {close as closeDrawer} from '../api/drawer/actions';
import {selectDrawerOpenState} from '../api/drawer/selectors';

const drawerWidth = 240;

const useJstacsNavigationStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up('md')]: {
            flexShrink: 0,
            width: drawerWidth
        }
    }
}));

const useNavigationDrawerStyles = makeStyles(() => ({root: {width: drawerWidth}}));

const useToolItemListStyles = makeStyles((theme) => {
    const nestedListPadding = 4;
    return {item: {paddingLeft: theme.spacing(nestedListPadding)}};
});

const ToolItemList = ({applicationId, toolItems}) => {
    const location = useLocation();
    const classes = useToolItemListStyles();

    return (
        <List disablePadding>
            {toolItems?.map(({id, name}) => {
                const toolPathname = `/applications/${applicationId}/tools/${id}`;
                const firstToolSection = `${toolPathname}/tool-overview`;
                return (
                    <ListItem
                        button
                        className={classes.item}
                        component={NavLink}
                        key={id}
                        selected={location.pathname.startsWith(toolPathname)}
                        to={firstToolSection}
                    >
                        <ListItemText primary={name} />
                    </ListItem>
                );
            })}
        </List>
    );
};

ToolItemList.propTypes = {
    applicationId: PropTypes.number.isRequired,
    toolItems: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    })).isRequired
};

const ApplicationItem = ({id, name, tools}) => {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const applicationPath = `/applications/${id}`;
        setOpen(location.pathname.startsWith(applicationPath));
    }, [id, location]);

    const handleClick = useCallback(() => {
        setOpen(!open);
    }, [open, setOpen]);

    return (
        <>
            <ListItem
                button
                onClick={handleClick}
            >
                <ListItemText secondary={name} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
                in={open}
                timeout="auto"
                unmountOnExit
            >
                <ToolItemList
                    applicationId={id}
                    toolItems={tools}
                />
            </Collapse>
        </>
    );
};

const ApplicationItemList = () => {
    const availableApplications = useSelector(selectAvailableApplications);

    return (
        <List>
            {availableApplications?.map(({id, name, tools}) => {
                return <ApplicationItem
                    id={id}
                    key={id}
                    name={name}
                    tools={tools}
                />;
            })}
        </List>
    );
};

const NavigationDrawer = ({DrawerProps}) => {
    const classes = useNavigationDrawerStyles();
    const location = useLocation();

    return (
        <Drawer
            {...DrawerProps}
            PaperProps={{className: classes.root}}
        >
            <Box
                boxSizing="content-box"
                height={128}
                m="0 auto"
                p={2}
                width={128}
            >
                <img
                    alt="Jstacs logo"
                    height={128}
                    src="/assets/favicon-196.png"
                    width={128}
                />
            </Box>
            <Divider />
            <List>
                <ListItem
                    button
                    component={NavLink}
                    selected={location.pathname === '/admin'}
                    to="/admin"
                >
                    <ListItemIcon>
                        <EditIcon />
                    </ListItemIcon>
                    <ListItemText primary="Admin" />
                </ListItem>
                <ListItem
                    button
                    component={NavLink}
                    selected={location.pathname === '/test-environment'}
                    to="/test-environment"
                >
                    <ListItemText primary="Test Environment" />
                </ListItem>
            </List>
            <Divider />
            <ApplicationItemList />
        </Drawer>
    );
};

export const JstacsNavigation = () => {
    const classes = useJstacsNavigationStyles();
    const isDrawerOpen = useSelector(selectDrawerOpenState);
    const dispatch = useDispatch();

    const handleDrawerBlur = useCallback(() => {
        dispatch(closeDrawer());
    }, [dispatch]);

    return (
        <nav
            className={classes.root}
            id="navigation"
        >
            <Hidden mdUp>
                <NavigationDrawer
                    DrawerProps={{
                        ModalProps: {
                            container: document.getElementById('navigation'),
                            keepMounted: true,
                            style: {position: 'absolute'}
                        },
                        onBlur: handleDrawerBlur,
                        open: isDrawerOpen,
                        variant: 'temporary'
                    }}
                />
            </Hidden>
            <Hidden smDown>
                <NavigationDrawer
                    DrawerProps={{
                        open: isDrawerOpen,
                        variant: 'permanent'
                    }}
                />
            </Hidden>
        </nav>
    );
};