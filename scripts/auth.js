// add admin cloud function
const adminForm = document.querySelector('.admin-actions-on-admin');
adminForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const adminEmail = document.querySelector('#admin-email').value;
  const addAdminRole = functions.httpsCallable('addAdminRole');
  addAdminRole({ email: adminEmail }).then(result => {
    console.log(result);
    adminForm.reset();
  });
});

// add Grower cloud function
const growerForm = document.querySelector('.admin-actions-on-grower');
growerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const growerEmail = document.querySelector('#grower-email').value;
  const addGrowerRole = functions.httpsCallable('addGrowerRole');
  addGrowerRole({ email: growerEmail }).then(result => {
    console.log(result);
    growerForm.reset();
  });
});



// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
      user.getIdTokenResult().then(idTokenResult => {
        user.grower = idTokenResult.claims.grower;
        user.admin = idTokenResult.claims.admin;
        setupUI(user);
        SendFCM(user);
        });
    } else {
      setupUI();
      SendFCM();
    }
  });
  
  
  // signup
  const signupForm = document.querySelector('#signup-form');
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
  
    // sign up the user & add firestore data
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('users').doc(cred.user.uid).set({

        userName: signupForm['signup-username'].value,
        userEmail: signupForm['signup-email'].value,
        aboutbio: signupForm['signup-bio'].value,
        phoneNo: signupForm['signup-phonenumber'].value
        });
  }).then(() => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
    signupForm.querySelector('.error').innerHTML = '';
  }).catch(err => {
    signupForm.querySelector('.error').innerHTML = err.message;
});
});
  // logout
  const logout = document.querySelector('#logout');
  logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
  });
  
  // login
  const loginForm = document.querySelector('#login-form');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
  
    // log the user in
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
      // close the signup modal & reset form
      const modal = document.querySelector('#modal-login');
      M.Modal.getInstance(modal).close();
      loginForm.reset();
      loginForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
        loginForm.querySelector('.error').innerHTML = err.message;
    });
  
  });


const deviceAddForm = document.querySelector('.admin-actions-on-adding-device-grower');
deviceAddForm.addEventListener('submit', (e) => {
  e.preventDefault();
    const growerEmailForDeviceAdd = document.querySelector('#grower-email-for-device-add').value;
    const deviceId = document.querySelector('#grower-deviceId').value;
db.collection("users").where("userEmail", "==", growerEmailForDeviceAdd)
  .get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          const groweruserid=doc.id;
db.collection("users").doc(groweruserid).update({
  deviceID : deviceId
})
deviceAddForm.reset();
alert(" FarmSmart Device with Device ID " + deviceId + " added to " + growerEmailForDeviceAdd)
      });
  })
}) 


