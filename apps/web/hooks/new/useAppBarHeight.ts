import { useTheme, useMediaQuery } from '@mui/material';

const useAppBarHeight = (): number => {
    const {
        mixins: { toolbar },
        breakpoints,
    } = useTheme();
    const toolbarDesktopQuery = breakpoints.up('sm');
    const toolbarLandscapeQuery = `${breakpoints.up(
        'xs'
    )} and (orientation: landscape)`;
    const isDesktop = useMediaQuery(toolbarDesktopQuery);
    const isLandscape = useMediaQuery(toolbarLandscapeQuery);
    let currentToolbarMinHeight;
    if (isDesktop) {
        currentToolbarMinHeight = toolbar[toolbarDesktopQuery];
    } else if (isLandscape) {
        currentToolbarMinHeight = toolbar[toolbarLandscapeQuery];
    } else {
        currentToolbarMinHeight = toolbar;
    }
    return (
        (
            currentToolbarMinHeight as {
                minHeight: number;
            }
        ).minHeight / 8
    );
};

export default useAppBarHeight;
