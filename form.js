class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: "",currentTab:0 };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        // Current tab is set to be the first tab (0)
        this.showTab(this.state.currentTab); // Display the current tab
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert("A name was submitted: " + this.state.value);
        event.preventDefault();
    }

    showTab(n) {
        // This function will display the specified tab of the form ...
        var x = document.getElementsByClassName("tab");
        x[n].style.display = "block";
        // ... and fix the Previous/Next buttons:
        if (n == 0) {
            document.getElementById("prevBtn").style.display = "none";
        } else {
            document.getElementById("prevBtn").style.display = "inline";
        }
        if (n == (x.length - 1)) {
            document.getElementById("nextBtn").innerHTML = "Submit";
        } else {
            document.getElementById("nextBtn").innerHTML = "Next";
        }
        // ... and run a function that displays the correct step indicator:
        this.fixStepIndicator(n)
    }

    nextPrev(n) {
        // This function will figure out which tab to display
        var x = document.getElementsByClassName("tab");
        // Exit the function if any field in the current tab is invalid:
        if (n == 1 && !this.validateForm()) return false;
        // Hide the current tab:
        x[this.state.currentTab].style.display = "none";
        // Increase or decrease the current tab by 1:
        this.state.currentTab = this.state.currentTab + n;
        // if you have reached the end of the form... :
        if (this.state.currentTab >= x.length) {
            //...the form gets submitted:
            document.getElementById("regForm").submit();
            return false;
        }
        // Otherwise, display the correct tab:
        this.showTab(this.state.currentTab);
    }

    validateForm() {
        // This function deals with validation of the form fields
        var x, y, i, valid = true;
        x = document.getElementsByClassName("tab");
        y = x[this.state.currentTab].getElementsByTagName("input");
        // A loop that checks every input field in the current tab:
        for (i = 0; i < y.length; i++) {
            // If a field is empty...
            if (y[i].value == "") {
            // add an "invalid" class to the field:
            y[i].className += " invalid";
            // and set the current valid status to false:
            valid = false;
            }
        }
        // If the valid status is true, mark the step as finished and valid:
        if (valid) {
            document.getElementsByClassName("step")[this.state.currentTab].className += " finish";
        }
        return valid; // return the valid status
    }

    fixStepIndicator(n) {
        // This function removes the "active" class of all steps...
        var i, x = document.getElementsByClassName("step");
        for (i = 0; i < x.length; i++) {
            x[i].className = x[i].className.replace(" active", "");
        }
        //... and adds the "active" class to the current step:
        x[n].className += " active";
    }

    render() {
        return (
            <form id="regForm" onSubmit={handleSubmit}>
                <h1>Register:</h1>
                <div className="tab">Name:
                <p><input placeholder="First name..."  /></p>
                <p><input placeholder="Last name..."  /></p>
                </div>
                
                <div className="tab">Contact Info:
                <p><input placeholder="E-mail..."  /></p>
                <p><input placeholder="Phone..."  /></p>
                </div>
                
                <div className="tab">Birthday:
                <p><input placeholder="dd"  /></p>
                <p><input placeholder="mm"  /></p>
                <p><input placeholder="yyyy"  /></p>
                </div>
                
                <div className="tab">Login Info:
                <p><input placeholder="Username..."  /></p>
                <p><input placeholder="Password..."  /></p>
                </div>
                
                <div style={{"overflow":"auto"}}>
                    <div style={{"float":"right"}}>
                        <button type="button" id="prevBtn" onClick={(e) => this.nextPrev(-1)}>Previous</button>
                        <button type="button" id="nextBtn" onClick={(e) => this.nextPrev(1)}>Next</button>
                    </div>
                </div>
                
                <div style={{textAlign:"center",marginTop:"40px"}}>
                    <span className="step"></span>
                    <span className="step"></span>
                    <span className="step"></span>
                    <span className="step"></span>
                </div>
            
            </form>
        );
    }
}

const root = ReactDOM.createRoot(
    document.getElementById('root')
);
root.render(<Form/>);
