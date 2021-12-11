import React from 'react'

const NotificationPopup = ({popup}) => {
    return (
        <div className={`popup ${popup ? 'show' : ''}`}>
            <h3>You have a bad memory. Hit another letter which you did not enter before.</h3>
        </div>
    )
}

export default NotificationPopup
