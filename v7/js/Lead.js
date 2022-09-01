const useEffect = React.useEffect;
const useState = React.useState;
const baseUrl = 'https://signup.welink.com/api.php';
var env = getCookie('env');

function Lead() {
  const [firstname, setFirstname] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const handleFirstnameInput = (e) => {
    setFirstname(e.target.value);
  };
  const handleLastNameInput = (e) => {
    setLastName(e.target.value);
  };
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };
  const handlePhoneInput = (e) => {
    setPhone(e.target.value);
  };
  
  const handleSubmit = (e) => { 
    event.preventDefault(); 
    
    $.ajax({
      async: true,
      crossDomain: false,
      url: baseUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
        "Authorization": "Bearer " + env,
      },
      data: {
        "action": "create-lead",
        "FirstName": firstname,
        "LastName": lastName,
        "Email": email,
        "Phone": phone,
        "token": env,
      },
      success: function (res) {
        console.log("==res==", res);
        if(res.status == 1){
          setCookie('cp', '#/lead', 1);
          window.location.replace('#/waitlist');
        }
      },
      error: function (err) {
        console.log("==err==", err.responseJSON);
      },
    });
  };
  
  const goback = (e) => {
    window.location.replace(getCookie('cp')); return false;
  }

  const setCookie = (cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  useEffect(() => {
    setCookie('cp', '#/', 1);
      $("#form2").validate({
        rules: {
          firstName: {
            required: true,
          },
          lastName: {
            required: true,
          },
          email: {
            email: true,
            required: true,
          },
          phone: {
            digits:true,
            minlength:10,
            maxlength:10,
            required: true,
          },
          success: function (e) {
            window.location.replace("#/waitlist");
          },
        },
      });
    
  },[]);

  return (
    <div>
      <div className="backOption">
        <a style={{"cursor":"pointer"}} onClick={goback}>
          <img src="img/coolicon.png" /> Try another address
        </a>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="divformMain">
              <div className="Mainheading">
                <h2>Service is not yet available for your home</h2>
                <p>
                  Sign up for the waitlist and be the first to know when service
                  is available for your home.
                </p>
              </div>
              <div className="formBodySectionForm2">
                <form id="form2" action="" onSubmit={handleSubmit}>
                  <div className="formUpper">
                    <div className="SectionForm2">
                      <label htmlFor="firstName">First Name*</label>
                      <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder="Enter your first name"
                        className="form-control"
                        onChange={handleFirstnameInput}
                        required
                        />
                    </div>
                    <div className="SectionForm2">
                      <label htmlFor="lastName">Last Name*</label>
                      <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="Enter your last name"
                        className="form-control"
                        onChange={handleLastNameInput}
                        required
                        />
                    </div>
                    <div className="SectionForm2">
                      <label htmlFor="email">Email address*</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email address"
                        className="form-control"
                        onChange={handleEmailInput}
                        required
                      />
                    </div>
                    <div className="SectionForm2">
                      <label htmlFor="phone">Phone Number*</label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        placeholder="eg. (888) 888-8888"
                        className="form-control"
                        onChange={handlePhoneInput}
                        required
                        />
                    </div>
                  </div>
                  <p>
                    By submitting this order, you consent to the Terms and Privacy
                    notice, and you consent to receive communications, including
                    calls, emails, and text messages, about our products and
                    services at the number and email address you provided above.
                    You agree that such calls may be made using an automatic
                    telephone dialing system, they may be considered telemarketing
                    or advertising under applicable law, and that you are not
                    required to provide your consent to these calls to make a
                    purchase from us.
                  </p>
                  <div className="form2Submit">
                    <input
                      type="submit"
                      value="Submit"
                      className="primaryButton"
                      onClick={handleSubmit}
                      />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Lead;
