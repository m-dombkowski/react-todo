import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footerTextContainer}>
        <p className={classes.message}>Made by Mateusz Dombkowski © 2022.</p>
        <a
          href="https://mateuszdombkowski.netlify.app/"
          className={classes.anchor}
          target="_blank"
          rel="noreferrer"
        >
          My Website
        </a>
      </div>
    </footer>
  );
};

export default Footer;
