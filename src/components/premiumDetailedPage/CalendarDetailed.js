import React from 'react'

const CalendarDetailed = () => {

    function notifyMe() {
        console.log('notifying')
        // Let's check if the browser supports notifications
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
        }

        // Let's check whether notification permissions have already been granted
        else if (Notification.permission === "granted") {
            // If it's okay let's create a notification
            var notification = new Notification('Timer Done');
        }

        // Otherwise, we need to ask the user for permission
        else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(function (permission) {
                // If the user accepts, let's create a notification
                if (permission === "granted") {
                    var notification = new Notification("Hi there!");
                }
            });
        }
    }

    return (
        <div>Hello
            <button onClick={notifyMe}>Send Notification</button>
        </div>
    )
}

export default CalendarDetailed