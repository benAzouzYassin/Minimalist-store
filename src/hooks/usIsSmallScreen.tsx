import { useEffect, useState } from "react";

export const useIsSmallScreen = (breakpoint = 768) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

        const handleMediaQueryChange = (event: any) => {
            setIsSmallScreen(event.matches);
        };

        setIsSmallScreen(mediaQuery.matches);

        mediaQuery.addEventListener("change", handleMediaQueryChange);

        return () => {
            mediaQuery.removeEventListener("change", handleMediaQueryChange);
        };
    }, [breakpoint]);

    return isSmallScreen;
};
