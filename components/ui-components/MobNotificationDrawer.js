import React, { useState } from 'react'
import MobDrawer from './MobDrawer'
import NotificationPage from '../../screens/notification';

function MobNotificationDrawer({open, onClose}) {
    // const [notificationOpen, setNotificationOpen] = useState(false);

  return (
    <MobDrawer
            open={open}
            onClose={onClose}
            title="Notifications">
            <NotificationPage />
    </MobDrawer>
  )
}

export default MobNotificationDrawer
