const useEffect = React.useEffect;
const useState = React.useState;
const baseUrl = 'https://signup.welink.com/api.php';
//const baseUrl = 'http://localhost:8070/wizardreg/api.php';
var env = getCookie('env');
function getCookie(cname){
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

function Subscription() {
  const [firstname, setFirstname] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [plan, setPlan] = useState('');
  const [place, setPlace] = useState('');
  const [placetype, setPlacetype] = useState('');
  
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

  const handleSelect = (e) => {
    var dt = e.target.attributes.getNamedItem("data-type").value;
    var id = e.target.attributes.getNamedItem("data-id").value;
    if(dt == 'plan'){
      setPlan(id);
    }else if(dt == 'place'){
      setPlace(id);
    }else if(dt == 'place_type'){
      setPlacetype(id);
    }
  }

  const handleSumbitForm2 = (e) => {
    event.preventDefault();
    var planid = getCookie('planid');
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
        "action": "create-subscription",
        "FirstName": firstname,
        "LastName": lastName,
        "Email": email,
        "Plan": planid,
        "PriceOption": place,
        "Place": place,
        "PlaceType": placetype,
        "token": env,
      },
      success: function (res) {
        console.log("==res==", res);
        if(res.status == 1){
          setCookie('cp', '#/subscription', 1);
          window.location.replace("#/thanks");
        }
      },
      error: function (err) {
        console.log("==err==", err.responseJSON);
      },
    });
  };

  const goback = (e) => {
    window.location.replace(getCookie("cp"));
    return false;
  };

  const setCookie = (cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };

  useEffect(() => {
    setCookie('cp', '#/plans', 1);
    $.ajax({
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:8070/wizardreg/api.php",
      "method": "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "cache-control": "no-cache",
        "Authorization": "Bearer " + env,
      },
      data: {
        "action": "plans",
        "token": env,
      },
      success: function (res) {
        res = JSON.parse(res);
        console.log("==res==", res.data);
        if(res.data){
          //setPlanid(res.data[0].Id);
        }
      }
    });
    
    $("#form3").validate({
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
          digits: true,
          minlength: 10,
          maxlength: 10,
          required: true,
        },
        termsandcondition: {
          required: true
        },
        success: function (e) {
          window.location.replace("#/thanks");
        },
      },
    });
  }, []);

  return (
    <div className="">
      <div className="">
        <div className="backOption">
          <a style={{"cursor":"pointer"}} onClick={goback}>
            <img src="img/coolicon.png" /> Back
          </a>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="divformMain">
                <div className="Mainheading">
                  <h2>Complete your order in 3 simple steps</h2>
                </div>
                <div className="stepsAll">
                  <div className="step1">
                    <div className="stepHeading">
                      <p>Step 1</p>
                      <h2>Pick your plan</h2>
                    </div>
                    <div className="stepSubheading">
                      <p>Each plan comes with a free trial for 1 month</p>
                    </div>
                    <div className="step1Body">
                      <div className="step1Planselection">
                        <div className="planselect"  >
                          <div className="planselectRadio">
                            <input type="radio" name="plan" value="$70" id="pickPlan70"  />
                            <label htmlFor="pickPlan70" data-type="plan" data-id="a0v5e000001SHhMAAW" onClick={handleSelect}>$70 per month</label>
                          </div>
                          <span>24-month term after free trial</span>
                        </div>
                        <div className="planselect" >
                          <div className="planselectRadio">
                            <input type="radio" id="pickPlan80" name="plan" value="$80"  />
                            <label htmlFor="pickPlan80" data-type="plan" data-id="a0v5e000001SHhOAAW" onClick={handleSelect}>$80 per month</label>
                          </div>
                          <span>No term requirement, cancel anytime</span>
                        </div>
                      </div>
                      <div className="planDetail">
                        <a
                          style={{"cursor":"pointer"}}
                          data-toggle="modal"
                          data-target=".planDetails"
                        >
                          See plan details
                        </a>
                      </div>
                      <div className="trialDue">
                        <div className="freeTrail">
                          <span>Free Trail</span>
                          <span>1 month</span>
                        </div>
                        <div className="dueToday">
                          <span>Due Today</span>
                          <span>$0</span>
                        </div>
                      </div>
                      <div className="stepsDesc">
                        <strong>
                          There is no upfront cost to complete your order. You
                          will not be charged until after your free trial has
                          expired.
                        </strong>
                        <p>
                          *Offer availability is not guaranteed and may vary by
                          household. Monthly subscription cost does not include
                          taxes. See
                          <a
                            style={{"cursor":"pointer"}}
                            data-toggle="modal"
                            data-target=".termsandcondition"
                          >
                            Terms and Conditions
                          </a>
                          for more details.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="step2">
                    <div className="stepHeading">
                      <p>Step 2</p>
                      <h2>Tell us about your place</h2>
                    </div>
                    <div className="step2Body">
                      <div className="step2Planselection">
                        <div className="placeHeading">
                          <h3>What kind of place do you have?</h3>
                        </div>
                        <div className="placeOption">
                          <div className="optionSection" >
                            <img src="img/home.png" />
                            <input type="radio" name="place" id="placeHome" hidden/>
                            <label htmlFor="placeHome" data-type="place" data-id="Home" onClick={handleSelect}>Home</label>
                         </div>
                          <div className="optionSection" >
                            <img src="img/town.png" />
                            <input type="radio" name="place" id="placeTown" hidden />
                            <label htmlFor="placeTown" data-type="place" data-id="Townhouse" onClick={handleSelect}>Townhouse</label>
                         </div>
                          <div className="optionSection" >
                            <img src="img/apartment.png" />
                            <input type="radio" name="place" id="placeApartment" hidden />
                            <label htmlFor="placeApartment" data-type="place" data-id="Apartment" onClick={handleSelect}>Apartment</label>
                         </div>
                        </div>
                      </div>
                      <div className="step2Planselection">
                        <div className="placeHeading">
                          <h3>What kind of place do you have?</h3>
                        </div>
                        <div className="placeOption">
                          <div className="placeselect">
                            <div className="placeselectRadio">
                              <input type="radio" name="place_type" value="Own" id="kindPlaceOwn"/>
                              <label htmlFor="kindPlaceOwn" data-type="place_type" data-id="Own" onClick={handleSelect}>Own</label>
                              {/* <span className="spanClassOwn"></span> */}
                           </div>
                          </div>
                          <div className="placeselect">
                            <div className="placeselectRadio">
                              <input type="radio" name="place_type" value="Rent" id="kindPlaceRent"/>
                              <label htmlFor="kindPlaceRent" data-type="place_type" data-id="Rent" onClick={handleSelect}>Rent</label>
                              {/* <span className="spanClassRent"></span> */}
                           </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="step3">
                    <div className="stepHeading">
                      <p>Step 3</p>
                      <h2>Tell us a little more about you</h2>
                    </div>
                    <div className="step3Subheading">
                      <p>
                        Please provide your contact information so we can reach
                        you when it’s time to schedule your installation.
                      </p>
                    </div>
                    <div className="contactForm">
                      <form id="form3" action="" onSubmit={handleSumbitForm2}>
                        <div className="contactUpperForm">
                          <div className="sectionForm5">
                            <label htmlFor="firstName">First Name*</label>
                            <input
                              type="text"
                              placeholder="Enter your first name"
                              name="firstname"
                              id="firstname"
                              className="form-control"                        
                              onChange={handleFirstnameInput}
                              required
                            />
                          </div>
                          <div className="sectionForm5">
                            <label htmlFor="lastName">Last Name*</label>
                            <input
                              type="text"
                              placeholder="Enter your last name"
                              name="lastname"
                              id="lastname"
                              className="form-control"                        
                              onChange={handleLastNameInput}
                              required
                            />
                          </div>
                          <div className="sectionForm5">
                            <label htmlFor="email">Email address*</label>
                            <input
                              type="text"
                              placeholder="Enter your email address"
                              name="email"
                              id="email"
                              className="form-control"                        
                              onChange={handleEmailInput}
                              required
                            />
                          </div>
                          <div className="sectionForm5">
                            <label htmlFor="phone">Phone number*</label>
                            <input
                              type="text"
                              placeholder="e.g. (888) 888-8888"
                              name="phone"
                              id="phone"
                              className="form-control"                        
                              onChange={handlePhoneInput}
                              required
                            />
                          </div>
                        </div>
                        <div className="step3TC" style={{position: "relative"}}>
                          <input
                            type="checkbox"
                            id="termsandcondition"
                            name="termsandcondition"
                          />
                          <label>
                            By checking this box, I agree to the WeLink order
                            <a
                              data-toggle="modal"
                              data-target=".termsandcondition"
                            >
                              Terms and Conditions
                            </a>
                          </label>
                        </div>
                        <div className="step3desc">
                          <p>
                            By submitting this order, you consent to the Terms
                            and Privacy notice, and you consent to receive
                            communications, including calls, emails, and text
                            messages, about our products and services at the
                            number and email address you provided above. You
                            agree that such calls may be made using an automatic
                            telephone dialing system, they may be considered
                            telemarketing or advertising under applicable law,
                            and that you are not required to provide your
                            consent to these calls to make a purchase from us.
                          </p>
                        </div>
                        <div className="form3Submit">
                          <input
                            type="submit"
                            value="Submit"
                            className="primaryButton"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade termsandcondition"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modaltermsCondition">
          <div className="modal-content">
            <div className="modal-body">
              <div className="modalHeaderTC">
                <h5 className="modal-title">Terms and Conditions</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="bodySectionModal">
                <h3>WeLink Home Broadband Installation and Service</h3>
                <p>
                  This WeLink Home Broadband Installation and Service Agreement,
                  together with the Order Form and Exhibits identified below
                  (together the “Agreement”) is entered into between the
                  Customer identified in the Order Form (“Customer” or “you”)
                  and WeLink Communications, Inc. (“WeLink” or “we” or “us”) and
                  sets forth the terms and conditions applicable to the goods
                  and or services provided by WeLink and or its affiliates.
                </p>
                <p>
                  This WeLink Home Broadband Installation and Service Agreement,
                  together with the Order Form and Exhibits identified below
                  (together the “Agreement”) is entered into between the
                  Customer identified in the Order Form (“Customer” or “you”)
                  and WeLink Communications, Inc. (“WeLink” or “we” or “us”) and
                  sets forth the terms and conditions applicable to the goods
                  and or services provided by WeLink and or its affiliates.
                </p>
                <p>
                  This WeLink Home Broadband Installation and Service Agreement,
                  together with the Order Form and Exhibits identified below
                  (together the “Agreement”) is entered into between the
                  Customer identified in the Order Form (“Customer” or “you”)
                  and WeLink Communications, Inc. (“WeLink” or “we” or “us”) and
                  sets forth the terms and conditions applicable to the goods
                  and or services provided by WeLink and or its affiliates.
                </p>
              </div>
              <div className="modalTC">
                <label>
                  <input type="checkbox" name="termsandcondition" /> I agree to
                  the WeLink order <a href="#0">Terms and Conditions</a>
                </label>
              </div>
              <p className="scrollButtom">
                Please scroll to the bottom before checking the box
              </p>
              <button data-dismiss="modal" className="primaryButton">
                Done
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade planDetails"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modalplan" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="modalHeaderSection">
                <h5 className="modal-title">Plan details</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modalDescSection">
                <h3>Your WeLink subscription comes with</h3>
                <ul>
                  <li>Download and upload speeds up to 700 Mbps</li>
                  <li>Unlimited data, without overages</li>
                  <li>Unlimited data, without overages</li>
                  <li>24/7 customer support</li>
                </ul>
              </div>
              <div className="modalDescSection">
                <h3>
                  Professional installation and standard equipment included at
                  no cost to you
                </h3>
                <ul>
                  <li>Rooftop network receiver</li>
                  <li>WiFi router</li>
                  <li>High-speed modem</li>
                  <li>May include broadband backup power system</li>
                </ul>
              </div>
              <div className="modalFooterSection">
                <button data-dismiss="modal">Done</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscription;
