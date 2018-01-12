/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const Flower = require(process.cwd() + '/core/Flower.js');
const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + '/siteConfig.js');

function imgUrl(img) {
  return siteConfig.baseUrl + 'img/' + img;
}

function docUrl(doc, language) {
  return (
    siteConfig.baseUrl +
    'docs/' +
    (language ? language + '/' : '') +
    doc +
    '.html'
  );
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + '/' : '') + page;
}

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
);

const ProjectTitle = props => (
  <h2 className="projectTitle">{siteConfig.tagline}</h2>
);

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

class HomeSplash extends React.Component {
  render() {
    let language = this.props.language || '';
    return (
      <SplashContainer>
        <div className="inner">
          <Flower />
          <ProjectTitle />
          <PromoSection>
            <Button href={docUrl('dev-principles')}>Our Processes</Button>
            <Button href="https://www.okgrow.com/contact">Work with Us</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

const Block = props => (
  <Container
    padding={['bottom', 'top']}
    id={props.id}
    background={props.background}
  >
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container>
);

const Phase1 = props => (
  <Block background="light">
    {[
      {
        content:
          "We like to do things consistently without having to re-invent the wheel or spend a lot of time making decisions each time something needs to be done. But we're not robots or slaves to an inflexible bureaucracy. We all like to constantly improve the way we do things and everyone is empowered to do that.",
        image: imgUrl('icon-1.png'),
        imageAlign: 'left',
        title: 'Try it Out',
      },
    ]}
  </Block>
);

const Phase2 = props => (
  <Block background="light">
    {[
      {
        content:
          "We try new things as experiments which we document on our Experiments Trello board so we can see what has been tried before, how it turned out, and have a discussion around it. When they're a success we update these docs and do it the new way going forward.",
        image: imgUrl('icon-2.png'),
        imageAlign: 'right',
        title: 'Processes',
      },
    ]}
  </Block>
);

class Index extends React.Component {
  render() {
    let language = this.props.language || '';

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer">
          <Phase1 />
          <Phase2 />
        </div>
      </div>
    );
  }
}

module.exports = Index;
