import "../CSS/AboutPage.css";
import githubwhite from "../img/github-icon-white.png";

function Aboutpage() {
    return (
        <div className='about-page'>
            <div className="app-about">
                <h1>FullStyle Story</h1>
                <p>This app is meant to be an inspirational space for everybody.</p>
                <div>

<p>Imagine a place where you, as a web creator, can not only showcase your creations but also share the very essence of your creativity with others. FullStyle is more than just a social library; it is a canvas upon which your imagination can run wild. Sign up, and unlock the doors to a world of endless possibilities. </p>

<p>With FullStyle, you have the power to add your websites and their code, offering a glimpse into the intricate web of your design genius. But FullStyle is not just about showcasing your work; it is about fostering a community of like-minded individuals, a tribe united by their passion for innovation and their dedication to excellence.</p>

<p>FullStyle is not just a platform; it is a movement towards a future where collaboration triumphs over competition, where inspiration flows freely, and where innovation knows no bounds. </p>

              
             </div>
             <br/>
             <h1> Creators</h1>
                <p>Pauline and Dilan are two students from the Iron Hack School. They have created this app as a final project for their training.</p>
            </div>
            
            <div className="creators-about">
            
                <section className="about-card">
                    <h3>Pauline</h3>
                    <p>FullStack Web Developer, UX/UI Designer, Sociology Student, Meme Queen</p>
                    <a href="https://github.com/Paulinecvt">
                    <img className="github" src={githubwhite} alt="github-logo" />
                    </a>
                </section>
                <section className="about-card">
                    <h3>Dilan</h3>
                    <p>FullStack Web Developer</p>
                    <a href="https://github.com/karkelo1">
                    <img className="github" src={githubwhite} alt="github-logo" />
                    </a>
                </section>

            </div>
        </div>
    )
};

export default Aboutpage;