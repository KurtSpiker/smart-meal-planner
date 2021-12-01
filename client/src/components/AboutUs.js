import React from 'react'
import { Grid } from "@mui/material";
import aboutUsHeaderIcon from './images/aboutus.png'
import spencer from './images/spencer.jpg'
import kurt from './images/kurt.jpg'
import kenny from './images/kenny.jpg'
import linkedinIcon from './images/linkedin.png'


const AboutUs = function (props) {
  return (
    <>
      <header className="mainPageHeaders">
        <img className="headerIcon" src={aboutUsHeaderIcon} />
        About Us
      </header>

      <body>
        <div className="paragraphTitleContainer">
          <h1>The studio</h1>
          <p className="aboutUsParagraph">We approach every project in a unique way thinking about scale and flexibility, with a permanent attention to detail and sustainable designs. Based on passion and love for food, design, code and development, we believe that honest communication is key to create solid collaborations and long term relationships with clients. Our process of work involves a real understanding of the values and goals of our clients, in order to build strong design solutions. We like to think global and open ourselves to opportunities to gain in audience and visibility driven by the desire to innovate.</p>
        </div>

        <div className="paragraphTitleContainer">
          <h1>Come for seconds</h1>
          <p className="aboutUsParagraph">This is just the first course! In the coming months we'll be beefing up search, uploading even more gorgeous photos, and expanding personalized features to make ForkItOver.com the best food site online. Sign up for our weekly newsletter to get content updates and notification of site improvements!</p>
        </div>

        <div className="profileHolder">

          <div className="individualProfile">
            <img className="profilePicture" src={spencer} />
            <div className="iconAndLinkHolder">
              <img className="linkedin" src={linkedinIcon} />
              <a className="link" href="https://www.linkedin.com/in/spencer-malott-p-eng-aaba5992/">Spencer Malott</a>
            </div>
          </div>

          <div className="individualProfile">
            <img className="profilePicture" src={kurt} />
            <div className="iconAndLinkHolder">
              <img className="linkedin" src={linkedinIcon} />
              <a className="link" href="https://www.linkedin.com/in/kurt-spiker-aa8385227/">Kurt Spiker</a>
            </div>
          </div>

          <div className="individualProfile">
            <img className="profilePicture" src={kenny} />
            <div className="iconAndLinkHolder">
              <img className="linkedin" src={linkedinIcon} />
              <a className="link" href="https://www.linkedin.com/in/kenny-shinghim-tse/">Kenny Tse</a>
            </div>
          </div>
        </div>
      </body>
    </>
  )
}
export default AboutUs;