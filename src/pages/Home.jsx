import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page">
      
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to EduGrade-AI!</h1>
          <p>
            The objective of this project is to develop an AI-powered teacher assistant that automates the grading process and provides personalized feedback to students. By leveraging artificial intelligence, the solution aims to reduce the workload of educators, allowing them to focus more on teaching and mentoring. This system will ensure timely, accurate, and constructive feedback, fostering a more effective learning environment.
          </p>
          <button className="cta-button">Take me Home</button>
        </div>
      </section>

      <section className="features">
        <h2>Key Features</h2>
        <div className="features-list">
          {[
            "Integration with Colleges",
            "Grading and Evaluating System",
            "AI Quiz",
            "AI Study Buddy",
            "AI Grading",
            "AI Homeworks",
            "Extra Courses",
            "Course Recommendations",
            "AI-Powered Progress Tracking & Insights"
          ].map((feature, index) => (
            <div className="feature" key={index}>
              <h3>{`${index + 1}. ${feature}`}</h3>
              <p>Feature description for {feature} goes here.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-bottom">
        <h2>Ready to take the next step?</h2>
        <button className="cta-button">Teacher</button>
        <button className="cta-button">Student</button>
      </section>

      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {[
            "What is your product about?",
            "How much does it cost?",
            "Do you have a free trial?",
            "How can I contact you?"
          ].map((question, index) => (
            <div className="faq-item" key={index}>
              <h3>{question}</h3>
              <p>Answer for {question} goes here.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
