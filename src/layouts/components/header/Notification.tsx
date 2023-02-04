import { IconButton } from '@mui/material';

import { MyTooltip } from 'src/components/ui';
import { NotificationsNoneIcon } from 'src/components/ui/Icons';

function Notification() {
  return (
    <MyTooltip title="Notifications">
      <IconButton color="inherit" onClick={() => {}}>
        <NotificationsNoneIcon fontSize="large" />
      </IconButton>
    </MyTooltip>
  );
}

export default Notification;
