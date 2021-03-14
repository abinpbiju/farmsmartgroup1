var temp;
var hum;
var moisture;
var dryness;

// Listen for Auth Status Changes
auth.onAuthStateChanged(user => {
  if (user) {
    db.collection('users').doc(user.uid).get().then(doc => {
      const User_details_html = `<div>Hi, ${doc.data().userName}</div>`;
      greet_heading.innerHTML=User_details_html;
      const deviceId=doc.data().deviceID;
  var telemetry = realtimedatabase.ref('/devices');
  telemetry.on('value', function(snapshot)
  {
      temp=snapshot.val()[deviceId].temp;
      tempdata.innerHTML=temp+"&deg";
      
      hum=snapshot.val()[deviceId].humidity;
      humdata.innerHTML=hum+"%";

      dryness=snapshot.val()[deviceId].moisture;
      moisture=100-dryness;
      //document.getElementById("moisturedata").innerHTML=moisture+"%";

      console.log(temp);
      console.log(hum);
      console.log(moisture)
      console.log(deviceId)

  })
    
    })
} else
{
  console.log("Logged Out")
}
});  
  





