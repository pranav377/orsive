'use client';

import useUserState from '@/state/userState';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import LANG_CONF from '@packages/config/global-lang-list.json';
import LogoSVG from '@/components/svgs/logo.svg';

export default function SetupComplete() {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const currUser = useUserState();

    return (
        <>
            <Dialog
                fullScreen={fullScreen}
                fullWidth={true}
                maxWidth={'md'}
                open={
                    currUser.is === 'authenticated' && !currUser.setupComplete
                }
                aria-labelledby="responsive-dialog-title"
                sx={{
                    textAlign: 'center',
                }}
            >
                <LogoSVG
                    style={{
                        height: theme.spacing(14),
                        width: theme.spacing(14),
                        marginBottom: theme.spacing(1),
                        marginTop: theme.spacing(1),

                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                />
                <DialogTitle>{'Welcome to Orsive'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please select your preferred languages to continue
                    </DialogContentText>

                    <List
                        dense
                        component="div"
                        role="list"
                        className="language-setup-list"
                    >
                        {LANG_CONF.langs.map((lang, idx) => {
                            return (
                                <ListItemButton key={idx} role="listitem">
                                    <ListItemIcon>
                                        <Checkbox tabIndex={-1} disableRipple />
                                    </ListItemIcon>
                                    <ListItemText primary={lang} />
                                </ListItemButton>
                            );
                        })}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus>Disagree</Button>
                    <Button autoFocus>Agree</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
