import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footerTextContainer}>
        <p className={classes.message}>Made by Mateusz Dombkowski © 2022.</p>
        <a
          href="https://mateuszdombkowski.netlify.app/index.html"
          className={classes.anchor}
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          {}
          {" "}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
