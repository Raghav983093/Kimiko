import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { VoidFunc } from '@/interfaces';

export default function Congratulation({ open, toggleDrawerState } : { open: boolean, toggleDrawerState: VoidFunc }) {

  const toggleDrawer = () => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    toggleDrawerState();
  };

  return (
    <div>
      {(['left', 'right', 'top', 'bottom'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <Drawer
            anchor={'bottom'}
            open={open}
            onClose={toggleDrawer()}
          >
            <Box
              sx={{ width: 'auto' }}
              role="presentation"
              onClick={toggleDrawer}
              onKeyDown={toggleDrawer}
            >
              <h1 className='text-3xl font-black text-green-400'>{"Congratulations!"}</h1>
              <h3 className='text-md text-kimnavy'>Your Ad has been published</h3>
            </Box>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}