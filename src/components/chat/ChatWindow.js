import React, {useEffect, useRef, useState} from "react";
import {Box, SpeedDial, Stack} from "@mui/material";
import {ArrowDownward} from "@mui/icons-material";

export function ChatWindow({height, children, onLoadMore}) {
    const [isTopOfWindow, setIsTopOfWindow] = useState(false);
    const [showBackToBottomBtn, setShowBackToBottomBtn] = useState(false)

    const ref = useRef(null)

    const handleScroll = (e) => {
        let endOfScrollBar = ref.current.scrollHeight - height - 50;
        setShowBackToBottomBtn(e.target.scrollTop < endOfScrollBar)
        setIsTopOfWindow(e.target.scrollTop === 0)
    }

    const handleResize = (e) => {
        console.log(e)
    }

    const handleBackToBottom = () => {
        ref.current.scrollTo({
            top: ref.current.scrollHeight,
            left: 0,
            behavior: 'smooth'
        });
    }

    const handleLoadMore = (e) => {
        if (onLoadMore && isTopOfWindow && e.deltaY < 0) {
            onLoadMore();
        }
    }

    useEffect(() => {
        ref.current?.scrollTo({
            top: ref.current.scrollHeight,
            left: 0,
        });
    }, [])

    return (
        <Box sx={{position: 'relative'}}>
            <Stack
                ref={ref}
                onResize={handleResize}
                onWheel={handleLoadMore}
                onScroll={handleScroll}
                maxHeight={height}
                overflow='hidden auto'>
                {children}
            </Stack>

            {showBackToBottomBtn &&
                <SpeedDial
                    sx={{position: 'absolute', bottom: 16, right: 16}}
                    onClick={handleBackToBottom}
                    ariaLabel={'back to bottom'}
                    icon={<ArrowDownward/>}
                />
            }
        </Box>
    )
}