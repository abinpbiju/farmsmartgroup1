// Listen for Auth Status Changes
auth.onAuthStateChanged(user => {
    if (user) {
//Getting Temp Data
db.collection('users').doc(user.uid).get().then(doc => {
    const User_Name = `${doc.data().userName}`;
    const deviceId=doc.data().deviceID;
    const token = doc.data().notificationToken;
  
  var telemetry = realtimedatabase.ref('/devices/'+ deviceId);
  telemetry.on('value', function(snapshot)
  {
    temp=snapshot.val().temp;
    
    
    hum=snapshot.val().humidity;
  
    dryness=snapshot.val().moisture;
    moisture=100-dryness;
  
    console.log(temp);
    console.log(hum);
    console.log(moisture)
    console.log(deviceId)
  
  
  var key = 'AIzaSyDFkE4ubUZP4JTGEt9BXsPXflFpUyq4i_E';
  var to = token;
  var payloadtemp = {
    'title': 'Hi '+ User_Name,
    'body': 'We Suggest you to Move your Plants Somewhere Shady - Temperature  is High at '+temp+'°c',
    'icon': 'logo.png',
    'click_action': 'http://localhost:8081'
  };

  
  if(temp>40)
  {
  fetch('https://fcm.googleapis.com/fcm/send', {
    'method': 'POST',
    'headers': {
      'Authorization': 'key=' + key,
      'Content-Type': 'application/json'
    },
    'body': JSON.stringify({
      'notification': payloadtemp,
      'to': to
    })
  }).then(function(response) {
    console.log(response);
  }).catch(function(error) {
    console.error(error);
  })
  }

  // Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.setBackgroundMessageHandler` handler.
messaging.onMessage(function(payload) {
    console.log('Message received. ', payload);
    // ...
  });
  })
  // Pump Status
  var pumplevel = realtimedatabase.ref('/devices/'+ deviceId);
  pumplevel.once('value', function(snapshot)
  {
    pumpstatus=snapshot.val().pumpstatus;
    
  
    console.log(temp);
    console.log(hum);
    console.log(moisture)
    console.log(deviceId)
    console.log(pumpstatus)
  
  
  var key = 'AIzaSyDFkE4ubUZP4JTGEt9BXsPXflFpUyq4i_E';
  var to = token;
  var payloadpumpon = {
    'title': 'Hi '+ User_Name,
    'body': 'Plant is being Automaticlly Watered by FarmWare',
    'icon': 'logo.png',
    'click_action': 'http://localhost:8081'
  };
  var payloadpumpoff = {
    'title': 'Hi '+ User_Name,
    'body': 'Watering is in OFF Mode',
    'icon': 'logo.png',
    'click_action': 'http://localhost:8081'
  };
  
  if(pumpstatus=="on")
  {
  fetch('https://fcm.googleapis.com/fcm/send', {
    'method': 'POST',
    'headers': {
      'Authorization': 'key=' + key,
      'Content-Type': 'application/json'
    },
    'body': JSON.stringify({
      'notification': payloadpumpon,
      'to': to
    })
  }).then(function(response) {
    console.log(response);
  }).catch(function(error) {
    console.error(error);
  })
  } 
  else
  {
    fetch('https://fcm.googleapis.com/fcm/send', {
      'method': 'POST',
      'headers': {
        'Authorization': 'key=' + key,
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify({
        'notification': payloadpumpoff,
        'to': to
      })
    }).then(function(response) {
      console.log(response);
    }).catch(function(error) {
      console.error(error);
    })

  }

  // Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.setBackgroundMessageHandler` handler.
messaging.onMessage(function(payload) {
    console.log('Message received. ', payload);
    // ...
  });
})
  })
}
else
{
  console.log("Logged Out")
}
})