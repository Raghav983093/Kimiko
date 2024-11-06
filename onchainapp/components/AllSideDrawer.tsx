import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import { DrawerState, ScrollToSection, SectionId, ToggleDrawer } from '@/interfaces';

export default function AllSideDrawer({ drawerState, toggleDrawer, children} : {children: React.ReactNode, activeLink: SectionId, scrollToSection: ScrollToSection, drawerState: DrawerState, toggleDrawer: ToggleDrawer}) {
  
  return (
    <div>
      {(['left', 'right', 'top', 'bottom'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={drawerState[anchor]}
            onClose={toggleDrawer(anchor, false, "")}
          >
            {
              (anchor === "bottom") && <>
                {/* <Navigator scrollToSection={scrollToSection} activeLink={activeLink} /> */}
                <Divider />
              </>
            }
            { children }
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
