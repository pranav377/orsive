'use client';

import useUserState from '@/state/userState';
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
import {
    Search,
    SearchIcon,
    SearchIconWrapper,
    StyledInputBase,
} from '@/ui/Navigation/Search';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import SETUP_LANGUAGES from '@/graphql/mutations/setupLanguages';
import useSnackbars from '@/hooks/new/useSnackbars';

export default function SetupComplete() {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const currUser = useUserState();

    const [selectedLangs, setSelectedLangs] = useState<Array<string>>([
        'English',
    ]);
    const [allLangs, setAllLangs] = useState(LANG_CONF.langs);
    const [setupLanguages, { loading: setupLanguagesLoading }] =
        useMutation(SETUP_LANGUAGES);

    const { displaySetupComplete, displaySetupCompleteError } = useSnackbars();

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
                        height: theme.spacing(24),
                        width: theme.spacing(24),
                        marginBottom: theme.spacing(1),
                        marginTop: theme.spacing(1),

                        marginLeft: 'auto',
                        marginRight: 'auto',
                    }}
                />
                <DialogTitle sx={{ py: 0 }}>{'Welcome to Orsive'}</DialogTitle>
                <DialogContentText>
                    Please select your preferred languages to continue
                </DialogContentText>
                <Search
                    sx={{
                        height: (theme) => theme.spacing(4),
                        textAlign: 'left',
                        mt: 1,
                        marginRight: 'auto',
                        marginLeft: 'auto',
                    }}
                >
                    <SearchIconWrapper>
                        <SearchIcon
                            sx={{
                                height: 0.7,
                            }}
                        />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search Languages"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(e) => {
                            setAllLangs(
                                LANG_CONF.langs.filter((prevLang) =>
                                    prevLang
                                        .toLowerCase()
                                        .includes(e.target.value.toLowerCase())
                                )
                            );
                        }}
                    />
                </Search>
                <DialogContent className="orsive-scrollbar" sx={{ mt: 1 }}>
                    <List dense component="div" role="list">
                        {allLangs.map((lang, idx) => {
                            return (
                                <ListItemButton
                                    key={idx}
                                    role="listitem"
                                    onClick={() => {
                                        setSelectedLangs((langs) => {
                                            if (langs.includes(lang)) {
                                                return langs.filter(
                                                    (l) => l !== lang
                                                );
                                            } else {
                                                return [...langs, lang];
                                            }
                                        });
                                    }}
                                >
                                    <ListItemIcon>
                                        <Checkbox
                                            tabIndex={-1}
                                            disableRipple
                                            checked={selectedLangs.includes(
                                                lang
                                            )}
                                            onClick={() => {}}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={lang} />
                                </ListItemButton>
                            );
                        })}
                    </List>
                </DialogContent>
                <DialogActions>
                    <LoadingButton
                        disabled={selectedLangs.length === 0}
                        loading={setupLanguagesLoading}
                        variant="contained"
                        onClick={() => {
                            setupLanguages({
                                variables: {
                                    languages: selectedLangs,
                                },
                            }).then((res) => {
                                if (res.data && !res.errors) {
                                    currUser.makeSetupComplete();
                                    displaySetupComplete();
                                } else {
                                    displaySetupCompleteError();
                                }
                            });
                        }}
                    >
                        Finish
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    );
}
