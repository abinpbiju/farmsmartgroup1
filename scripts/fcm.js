const SendFCM = (user) => {
    if (user) {
      if (user.grower) 
            {
console.log("This User Is a Grower")
messaging.requestPermission().then(function() {
                    console.log('Notification permission granted.');
                    // TODO(developer): Retrieve an Instance ID token for use with FCM.
                    // ...
// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
messaging.getToken().then(function(currentToken) {
    if (currentToken) {
console.log(currentToken)
db.collection('users').doc(user.uid).update({
    notificationToken : currentToken
})
    }
else {
      // Show permission request.
      console.log('No Instance ID token available. Request permission to generate one.');
    }
  }).catch(function(err) {
    console.log('An error occurred while retrieving token. ', err);
  });

                  }).catch(function(err) {
                    console.log('Unable to get permission to notify.', err);
                  });

}
        }
    }


