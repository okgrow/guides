const React = require('react');

class Footer extends React.Component {
  /*
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? language + '/' : '') + doc;
  }
  */

  render() {
    const currentYear = new Date().getFullYear();

    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>Services</h5>
            <a href="https://www.okgrow.com/web">Web Development</a>
            <a href="https://www.okgrow.com/javascript-consulting">
              Javascript Consulting
            </a>
            <a href="https://www.okgrow.com/mobile">Mobile Development</a>
            <a href="https://www.okgrow.com/training">Training</a>
          </div>
          <div>
            <h5>Social</h5>
            <a href="https://twitter.com/ok_grow">Twitter</a>
            <a href="https://github.com/okgrow">GitHub</a>
            <a href="https://www.facebook.com/okgrow/">Facebook</a>
            <a href="https://www.instagram.com/ok_grow/">Instagram</a>
            <a href="https://www.youtube.com/channel/UCemC4xuL1cZhVlixuoEjtSg">
              YouTube
            </a>
          </div>
          <div>
            <h5>Contact</h5>
            <a href="https://www.okgrow.com/posts">Blog</a>
            <a href="https://www.okgrow.com/contact">Hire Us</a>
            <a href="https://www.okgrow.com/join-us">Join Us</a>
            <a href="mailto:hello@okgrow.com">hello@okgrow.com</a>
            <a href="tel:1-855-747-9930">+1-855-747-9930</a>
          </div>
        </section>

        <a href="https://www.okgrow.com/" className="fbOpenSource">
          <img
            src={this.props.config.baseUrl + 'img/logo-white.svg'}
            alt="OK GROW!"
            width="170"
            height="45"
          />
        </a>
        <section className="copyright">
          Copyright &copy; {currentYear} OK GROW!
        </section>

        {/*<a
          className="github-button"
          href={this.props.config.repoUrl}
          data-icon="octicon-star"
          data-count-href="/facebook/docusaurus/stargazers"
          data-show-count={true}
          data-count-aria-label="# stargazers on GitHub"
          aria-label="Star this project on GitHub"
        >
          Star
        </a>*/}
      </footer>
    );
  }
}

module.exports = Footer;
