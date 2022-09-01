const useEffect = React.useEffect;
const useState = React.useState;
const baseUrl = 'https://signup.welink.com/api.php';

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

function Plans() {
  const [planid, setPlanid] = useState('');

  const handleClick = (e) => {
    setCookie("cp", "#/plans", 1);
    setCookie("planid", e.target.attributes.getNamedItem("data-id").value, 1);
  }

  const goback = (e) => {
    window.location.replace(getCookie('cp')); return false;
  };

  const setCookie = (cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };


  useEffect(() => {
    setCookie('cp', '#/', 1);
    
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
          setPlanid(res.data[0].Id);
        }
      }
    });
  });

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
                  <h2>Your home is eligible to get WeLink internet*</h2>
                </div>
                <div className="cardBody">
                  <div className="cardDesc">
                    <div className="cardHeading">
                      <h1>700 Mbps</h1>
                    </div>
                    <div className="cardDescData">
                      <p>
                        <img src="img/circle_check_outline.png" />
                        <span>Download and upload speeds up to 700 Mbps</span>
                      </p>
                      <p>
                        <img src="img/circle_check_outline.png" />
                        <span>Unlimited data without caps or overages</span>
                      </p>
                      <p>
                        <img src="img/circle_check_outline.png" />
                        <span>Professional setup and installation</span>
                      </p>
                      <p>
                        <img src="img/circle_check_outline.png" />
                        <span>1 month free trial</span>
                      </p>
                      <button data-toggle="modal" data-target=".planDetails">
                        See plan details
                      </button>
                    </div>
                  </div>
                  <div className="planButton">
                    <a href="#/subscription" data-id={planid} onClick={handleClick} className="primaryButton">
                      Continue
                    </a>
                  </div>
                  <div className="termsCondition">
                    <p>
                      *Actual speeds and offer availConditionsability are not
                      guaranteed and may vary by household.{" "}
                      <u><a style={{"cursor":"pointer"}}
                          data-toggle="modal"
                          data-target=".termsandcondition">Terms and </a></u> apply.
                    </p>
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

export default Plans;
