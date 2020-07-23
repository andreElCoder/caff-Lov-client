import React from "react";
import { MDBContainer, MDBFooter } from "mdbreact";
import {NavLink} from "react-router-dom"
const Footer = () => {
  return (<div className="footer">
    <MDBFooter className="font-small pt-1 mt-1">
      <MDBContainer fluid className="text-center text-md-left footer-color">
            <div>
                <h5 className="title"><span role="img" aria-label="coffee">☕☕☕☕☕</span></h5>
                <p>
                    ❤︎ We Love Coffee ❤︎
                </p>
            </div>

            <div id="footer-links">
            <h5 className="title">Links</h5>
            <NavLink className="nav-bar-link" activeClassName="selected" to='/about'>About</NavLink>
            <NavLink className="nav-bar-link" activeClassName="selected" to='/API'>API</NavLink>
            </div>
        </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: CaffeLov made by ->  <a href="https://github.com/andreElCoder"> andreElCoder </a>
        </MDBContainer>
      </div>
    </MDBFooter>
    </div>
  );
}

export default Footer;