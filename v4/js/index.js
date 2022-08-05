//import { Route, Link, HashRouter } from "react-router-dom";

const Link = ReactRouterDOM.Link;
const Route = ReactRouterDOM.Route;
const useHistory = ReactRouterDOM.useHistory;
const Redirect = window.ReactRouterDOM.Redirect;
const useEffect = React.useEffect;
const useState = React.useState;
const baseUrl = 'https://partial-welink.cs226.force.com/welinkreg/';
var env = getCookie('env');

function App() {
  return (
    <ReactRouterDOM.HashRouter>
      {/* <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
      <Link to="/login">Login</Link>
      </li>
      <li>
      <Link to="/register">Register</Link>
      </li>
    </ul> */}

      <Route path="/" exact component={Home} />
      <Route path="/lead" component={Lead} />
      <Route path="/waitlist" component={Waitlist} />
      <Route path="/plans" component={Plans} />
      <Route path="/subscription" component={Subscription} />
      <Route path="/thanks" component={Thanks} />
    </ReactRouterDOM.HashRouter>
  );
}

function nextPath(path) {
  window.location.replace(path);

  //window.history.pushState('', null, path);
}

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

function Home() {
  const [address, setAddress] = useState("");

  const handleAddressInput = (e) => {
    setAddress(e.target.value);
  };

  const handleSumbitForm1 = (e) => {
    event.preventDefault();
    if (address == "1234567890") {
      window.location.replace("#/plans");
    } else {
      window.location.replace("#/lead");
    }
  };

  const setCookie = (cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  };


  useEffect(() => {
    // -----------------------Auth------------------------
    if (env == null || env == "") {
      fetch(baseUrl+"services/apexrest/welinkRegistration", {
      // Adding method type
      method: "POST",
      mode: 'no-cors',
      // Adding body or contents to send
      body: JSON.stringify({
        action: "access-token",
      }),
      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
      },
    })
    // Converting to JSON
    .then(response => console.log(response))
    // Displaying results to console
    .then(json => console.log(json));

      // $.ajax({
      //   async: true,
      //   crossDomain: false,
      //   url: baseUrl+"services/apexrest/welinkRegistration",
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "cache-control": "no-cache",
      //   },
      //   data: JSON.stringify({
      //     action: "access-token",
      //   }),
      //   success: function (res) {
      //     console.log("==res==", res);
      //     env = res;
      //     setCookie("env", res, 0.5);
      //   },
      //   error: function (err) {
      //     console.log("==err==", err);
      //   },
      // });
    }
    // -------------------------------------------------------

    setCookie("cp", "#/", 1);
    const newaddress = document.querySelectorAll("#address")[0];
    //console.log(address)
    setTimeout(() => {
      newaddress.innerHTML = address;
    }, 3000);

    $("#form1").validate({
      rules: {
        address: {
          minlength: 10,
          required: true,
        },
        success: function (e) {
          if ($("#address").val() == "1234567890") {
            window.location.replace("#/plans");
          } else {
            window.location.replace("#/lead");
          }
        },
      },
    });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="divformMain">
            <div className="Mainheading">
              <h2>Find out if WeLink is available for your home</h2>
            </div>
            <div className="formBodySectionForm1">
              <form id="form1" action="" onSubmit={handleSumbitForm1}>
                <div className="leftSectionForm1">
                  <label htmlFor="location">Home address*</label>
                  <input
                    type="address"
                    placeholder="Enter Location"
                    id="address"
                    name="address"
                    className="form-control"
                    autoComplete="off"
                    onChange={handleAddressInput}
                    value={address}
                    required
                  />
                </div>
                <div className="rightSection">
                  {/* <Link to='/lead' id="tolead" style={{display:'none'}}>tolead</Link> */}
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
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
