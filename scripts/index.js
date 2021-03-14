const accountlink = document.querySelectorAll('.accountlink');
const accountDetails = document.querySelector('.account-details');
const growerConsole = document.querySelectorAll('.grower-console');
const adminItems = document.querySelectorAll('.admin');
const login = document.querySelectorAll('.loginlink');
const logoutlink = document.querySelectorAll('.logoutlink');
const signup = document.querySelectorAll('.signuplink');
const slider = document.querySelectorAll('.slider');
const cards = document.querySelectorAll('.cards');
const header = document.querySelectorAll('.header');
const addDevice = document.querySelectorAll('.add-device');
const addGrower = document.querySelectorAll('.add-grower');
const makeAdmin = document.querySelectorAll('.make-admin');


const setupUI = (user) => {
    if (user) {
            console.log("Logged In");
        if (user.admin) 
            {
      addDevice.forEach(item => item.style.display = 'block');
      addGrower.forEach(item => item.style.display = 'block');
      makeAdmin.forEach(item => item.style.display = 'block');
      logoutlink.forEach(item => item.style.display ='block');
      accountlink.forEach(item => item.style.display = 'block');
      login.forEach(item => item.style.display = 'none');
      signup.forEach(item => item.style.display = 'none');
      slider.forEach(item => item.style.display = 'none');
      cards.forEach(item => item.style.display = 'none');
      header.forEach(item => item.style.display = 'none');
            }
        else if (user.grower) 
            {
      logoutlink.forEach(item => item.style.display = 'block');
      accountlink.forEach(item => item.style.display = 'block');
      slider.forEach(item => item.style.display = 'block');
      cards.forEach(item => item.style.display = 'block');
      growerConsole.forEach(item => item.style.display = 'block');
      header.forEach(item => item.style.display = 'block');
      login.forEach(item => item.style.display = 'none');
      signup.forEach(item => item.style.display = 'none');
              }
 
        else if(user)
              {
      login.forEach(item => item.style.display = 'none');
      logoutlink.forEach(item => item.style.display = 'block');
      accountlink.forEach(item => item.style.display = 'block');
      signup.forEach(item => item.style.display = 'none');
      slider.forEach(item => item.style.display = 'block');
      cards.forEach(item => item.style.display = 'block');
      header.forEach(item => item.style.display = 'block');
              }

               
    // Account Info  
    db.collection('users').doc(user.uid).get().then(doc => 
      {
            const html = `
            <div>User Name : ${doc.data().userName}</div>
            <div>Bio : ${doc.data().aboutbio}</div>
            <div>Phone : ${doc.data().phoneNo}</div>
            <div>Logged in as ${user.email}</div>
            <div class="pink-text">${user.admin ? 'Admin' : ''}</div>
            <div class="pink-text">${user.grower ? 'Grower' : ''}</div> `;
            accountDetails.innerHTML = html;
      });
     
    } 
    else 
    {
          //Show Login and SignUp Elemements
         login.forEach(item => item.style.display = 'block');
         signup.forEach(item => item.style.display = 'block');

         //Showing Slider
         slider.forEach(item => item.style.display = 'block');

         //Showing Slider
         cards.forEach(item => item.style.display = 'block');
         
         //Showing Headers
         header.forEach(item => item.style.display = 'block');

         //Hide LogOut Link
         logoutlink.forEach(item => item.style.display = 'none');

         //Hide Account Details
         accountlink.forEach(item => item.style.display = 'none');

        //Hide Grower Console
         growerConsole.forEach(item => item.style.display = 'none');

        //Hide Admin Items
        addDevice.forEach(item => item.style.display = 'none');
        addGrower.forEach(item => item.style.display = 'none');
        makeAdmin.forEach(item => item.style.display = 'none');
         
        // Hide Account Info
        accountDetails.innerHTML = '';
        

    }
  };



// setup materialize components
document.addEventListener('DOMContentLoaded', function() {
  
    var navelems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(navelems);

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

    var elems = document.querySelectorAll('.slider');
    M.Slider.init(elems);
          

}); 