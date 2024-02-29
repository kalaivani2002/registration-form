'use client';

import React from "react"
import { Button, Pane, Text, majorScale, Dialog } from 'evergreen-ui'

const DefaultDialogExample = ({visible}) => {
    const [isShown, setIsShown] = React.useState(false)
    setIsShown(visible)
    return (
        <Pane>
            <Dialog
                isShown={isShown}
                title="Dialog title"
                onCloseComplete={() => setIsShown(false)}
                confirmLabel="Custom Label">
                Dialog content
            </Dialog>
            <Button onClick={() => setIsShown(true)}>Show Dialog</Button>
        </Pane>
    )
}


export default DefaultDialogExample;