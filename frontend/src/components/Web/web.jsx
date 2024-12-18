import React, { useEffect, useRef } from 'react';
import  { useState } from 'react'; 
import './web.css';
import { Link } from 'react-router-dom';
import Certificate from './certificate';
import aninditaImage from './anindita.jpg';
import { FaLinkedin, FaGithub, FaTwitter, FaFacebook, FaInstagram, FaWhatsapp} from 'react-icons/fa';
import { FaShippingFast,FaSchool } from 'react-icons/fa';
import { FaFileArchive,fasfamobile } from 'react-icons/fa';
import { FaHome, FaInfoCircle, FaFileAlt, FaBriefcase, FaTrophy, FaEnvelope,FaAddressBook ,
  FaPhone ,
  FaMapMarkerAlt } from 'react-icons/fa'
  import certificate from './certificate';
import ContactForm from '../Web/Feedbaackform'; 
import FormPage from '../Web/FormPage';
import Calculator from '../Web/calculator';
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
  
/>


function Web() {
  const textRef = useRef(null);
  const phrases = [
    "Welcome to my portfolio.",
    "I'm a software developer.",
    "Let's build something amazing!",
    "I'm a Teacher.",
    "Let's learn Maths together...",
    "I'm a Student",
    "Continuously Learning  from experiences..",
    "I'm an aspiring Software Engineer.."
    
  ];
  let phraseIndex = 0;
  let letterIndex = 0;
  let typingInterval;

  useEffect(() => {
    const typeText = () => {
      typingInterval = setInterval(() => {
        if (letterIndex < phrases[phraseIndex].length) {
          textRef.current.textContent += phrases[phraseIndex].charAt(letterIndex);
          letterIndex++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            eraseText();
          }, 2000); // Wait before erasing
        }
      }, 100);
    };
    
    const eraseText = () => {
      const eraseInterval = setInterval(() => {
        if (letterIndex > 0) {
          textRef.current.textContent = textRef.current.textContent.slice(0, -1);
          letterIndex--;
        } else {
          clearInterval(eraseInterval);
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(() => {
            typeText();
          }, 500);
        }
      }, 50);
    };

    typeText();

    return () => clearInterval(typingInterval);
  }, [phrases]);
  const [showImage, setShowImage] = useState(false);

    const handleClick = () => {
      setShowImage(true);
    };

  return (
    <>
      <div className="container">
        <section id="home" className="section">
          <div className="title-container">
            <div className="title">
              <h1>👋 Hi, welcome Anindita here.</h1>
            </div>
            <h2 className="typing-text">
              <span id="typed-text" ref={textRef}></span>
              <span className="typed-cursor">|</span>
            </h2>
          </div>
      

    <div className="social-links">
      <a href="https://www.linkedin.com/in/anindita-ghosh-25bb47266?trk=contact-info" target="_blank" rel="noopener noreferrer">
        <FaLinkedin />
      </a>
      <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
        <FaGithub />
      </a>
      <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
        <FaTwitter />
      </a>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebook />
      </a>
      <a href="https://instagram/aninditaghosh36.com" target="_blank" rel="noopener noreferrer">
        <FaInstagram />
      </a>
    </div>




    <div className="sidebar">
      <a href="#home"><FaHome /></a>
      <a href="#about"><FaInfoCircle /></a>
      <a href="#resume"><FaFileAlt /></a>
      <a href="#portfolio"><FaBriefcase /></a>
      <a href="#achievements"><FaTrophy /></a>
      <a href="#contact"><FaEnvelope /></a>
    </div>

          </section>
        
      </div>

      <section id="about" className="section about">
        <h1>About Me</h1>
        <div className="about-content">
          <p><b>Hello! I'm Anindita Ghosh, a passionate software developer with a love for learning and exploring new technologies. I am a beginner in computer science and have worked on various web development projects.</b></p>
          <p><b>My journey in the tech world began with a curiosity to understand how things work, which led me to pursue a career in software development. Over the years, I have honed my skills in various programming languages and frameworks, and I'm always eager to take on new challenges and expand my knowledge.</b></p>
          <p><b>In my free time, I enjoy reading, hiking, and experimenting with new coding projects. I'm also an avid traveler and love exploring new cultures and cuisines.</b></p>
        </div>
      </section>

      <section id="resume">
        <h1 align="center"><u>RESUME</u></h1>
        <div className="resume">
          <div className="resume-item">
            <div className="personal-info">
         

<img src={aninditaImage} alt="Anindita Ghosh" />

              <p align="justify" className="moral"><b>"If you can think, then you can create."</b></p>
              <p align="right" className="signature">~Anindita Ghosh</p>
            </div>
            <h3>Summary</h3>
            <p>As a prospective full-stack software engineer, I'm deeply passionate about developing scalable, high-performance, and reliable software systems.</p>
            <h3>Education</h3>
            <p><strong>Bachelor of Engineering in Information Technology (2022-2026)</strong><br />St. Thomas College of Engineering & Technology, Kolkata</p>
            <p><strong>Class 12th Board (2022)</strong><br />Dum Dum Ananda Ashram Sarada Vidyapith (WBCHSE)</p>
            <p><strong>Class 10th Board (2020)</strong><br />Baranagore Rajkumari Memorial Girl's High School (WBBSE)</p>
            <h3>Experience</h3>
            <p>Excited to announce that I've been selected for a Web Development Internship at IntechtechSoft Services Pvt Ltd! Looking forward to gaining knowledge and experience.</p>
          </div>

          <div className="resume-item">
    <h3>Skills</h3>
    <div className="skill-name"><span className="fab fa-python"></span> Python</div>
    <div className="skill-bar">
        <div className="skill-bar-fill python" style={{ width: '90%' }} data-label="90%"></div>
    </div>
    <div className="skill-name"><span className="fab fa-java"></span> Java</div>
    <div className="skill-bar">
        <div className="skill-bar-fill java" style={{ width: '85%' }} data-label="85%"></div>
    </div>
    <div className="skill-name"><span className="fab fa-html5"></span> HTML/CSS/JS</div>
    <div className="skill-bar">
        <div className="skill-bar-fill htmlcssjs" style={{ width: '80%' }} data-label="80%"></div>
    </div>
    <div className="skill-name"><span className="fab fa-laptop-code"></span> C</div>
    <div className="skill-bar">
        <div className="skill-bar-fill c" style={{ width: '75%' }} data-label="75%"></div>
    </div>
            <h3>Hobbies</h3>
            <ol>
              <li>Listening to Music</li>
              <li>Travelling</li>
              <li>Photography</li>
              <li>Exploring New Technologies</li>
            </ol>
            <div className="achievement-buttons">
              <p>To know more, click 👇</p>
              <a href="/CV.pdf" target="_blank">Resume</a>



            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="section portfolio">
  <h1 align="left" fontcolor='blue'>Portfolio</h1>    <br></br>
  <div className="portfolio-content">
    <p align="center"><b>Here are some of my works:</b></p>    <br></br>
    <ol>
      <li>
        <p>Tic Tac Toe game website (using HTML, CSS, JS): 👉<a href='./TicTacToe'><u>TicTacToe Game</u></a></p>
      </li>
      <br></br>


       <li> <p>Calculator (using MERN Technology): 👉<a href='./calculator'><u> Calculator</u></a></p>
      </li>
     <br></br>

     <li>
  <p>
    TO-DO LIST (using HTML, CSS, JS): 
    👉 <a href="https://phone-auth-f076e.web.app" target="_blank"><u>TO-DO LIST</u></a>
  </p>
</li>
    <br></br><li>
  <p>
    Student Admission form (using Python GUI TKINTER MODULE): 👉  <a href='./FormPage'><u>Student Form</u></a>
  </p>
</li>    <br></br>
    
    </ol>
  </div>
</section>
      <section id="achievements" class="section achievements">
            
            <h1 align="left" fontstyle='italic' tabindex="uppercase" >ACHIVEMENT</h1> 
             <p align="center"><b>Here are some of my Certificates:👇</b></p>

            
            <Certificate/>
          
        </section>
    

        
        <section id="contact" class="section contact">
  <div class="contact-container">
    <div class="contact-form">

      <h1>Contact Me</h1>    <br></br>
            <p><FaAddressBook /> ganindita10@gmail.com</p>    <br></br>
            <p><FaPhone /> +91 7980456257</p>
            <p><FaWhatsapp/>+91 7980456257</p>
            <p><FaMapMarkerAlt /> 24/1, R.N.C Road, Kolkata 700035</p>
          
            </div>
      
     </div>  <h3>Or,</h3>  <h3>Write Your Message </h3>
          <ContactForm />
          
        </section>
        <div class="map-container">
                <iframe align="right" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d471218.0924057887!2d88.26063980499653!3d22.649671428934672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02772f8a92440d%3A0x9db2711d8f4b3aeb!2sBaranagar%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1655568543834!5m2!1sen!2sin" allowfullscreen="" loading="lazy"></iframe>
            </div>
           
    
            <section id="footer">
        <footer>
          &copy; 2024 Anindita Ghosh. All Rights Reserved.
        </footer>
      </section>
    </>
  );
}

export default Web;
