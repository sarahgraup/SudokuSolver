import React from 'react';
import { Grid, Button } from '@mui/material';


interface IPanelProps {
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
}

function ControlPanel({
  onStart, onPause, onResume, onStepForward, onStepBackward,
}: IPanelProps) {
  return (
    <Grid spacing={0} justifyContent='center' gap='10px' flex='row' alignContent='space-between' sx={{ display: 'flex', padding: 0 }}>
      <Button sx={{ padding: '6px 12px', fontSize: '0.75rem' }} variant='outlined' onClick={onStart}>Start</Button>
      <Button sx={{ padding: '6px 12px', fontSize: '0.75rem' }} variant='outlined' onClick={onPause}>Pause</Button>
      <Button sx={{ padding: '6px 12px', fontSize: '0.75rem' }} variant='outlined' onClick={onResume}>Resume</Button>
      <Button sx={{ padding: '6px 12px', fontSize: '0.75rem' }} variant='outlined' onClick={onStepForward}>Forward</Button>
      <Button sx={{ padding: '6px 12px', fontSize: '0.75rem' }} variant='outlined' onClick={onStepBackward}>Backward</Button>
    </Grid>
  );
}

export default ControlPanel;
