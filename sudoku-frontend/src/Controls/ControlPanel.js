import { Button } from '@mui/material';

/** Component for Control Panel
 *  Renders buttons for controlling the solver
 * 
 * Props:
 * - function to control solver (onStart, onStop, onPause, onResume)
 * 
 * State: None 
 * 
 * Function: 
 *  - handlers for button clicks that call provided control functions
 * 
 * App -> Control Panel
 */

function ControlPanel({ onStart, onPause, onResume, onStepForward, onStepBackward }) {
    return (
        <div className="control-panel">
            <Button sx={{ padding: '6px 12px', fontSize: '0.75rem'}} variant="outlined" onClick={onStart}>Start</Button>
            <Button sx={{ padding: '6px 12px', fontSize: '0.75rem' }} variant="outlined" onClick={onPause}>Pause</Button>
            <Button sx={{ padding: '6px 12px', fontSize: '0.75rem' }} variant="outlined" onClick={onResume}>Resume</Button>
            <Button sx={{ padding: '6px 12px', fontSize: '0.75rem' }} variant="outlined" onClick={onStepForward}>Forward</Button>
            <Button sx={{ padding: '6px 12px', fontSize: '0.75rem' }} variant="outlined" onClick={onStepBackward}>Backward</Button>
        </div>
    );

}

export default ControlPanel;