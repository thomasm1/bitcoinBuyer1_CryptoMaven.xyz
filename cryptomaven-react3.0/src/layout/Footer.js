import React, { Component } from "react";
import { Container, Row } from "reactstrap";
import stylez from "../index.css"

class Footer extends Component {
  constructor(props) {  
    super(props);  
    this.state = {  
        footerText: "Thomas Maestas"  
    };
  } 

  render() {
    return (
      <footer style={stylez} className="footer">
        <Container fluid={true}>
          <ul className="nav">
            <Row fluid={true}>
            <li className="nav-item">
              <a className="nav-link" href="thomasmaestas.net">
                Thomas Maestas
              </a>
            </li>{" "}
            <li className="nav-item">
              <a
                className="nav-link"
                href="ourdailytech.net"
              >
                ourdailytechblog
              </a>
            </li>{" "}
            </Row>
          </ul>
          <div className="copyright">
            © {new Date().getFullYear()} made with{" "}
            <i className="tim-icons icon-heart-2" /> by{" "}
            <a href="thomasmaestas.net">
            { this.state.footerText }
            </a>{" "}
            for a better web3.
          </div>
        </Container>
        
       
      </footer>
    );
  }
}

export default Footer;
