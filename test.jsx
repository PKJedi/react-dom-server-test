import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'

var StaticMarkupRenderComponent = React.createClass({
  render() {
    var stuffToRender = <noscript><img src="tracking-fallback-pixel.png" /></noscript>;
    var staticContent = ReactDOMServer.renderToStaticMarkup(stuffToRender);
    var getStaticContent = () => ({__html: staticContent});
    return <div dangerouslySetInnerHTML={getStaticContent()} />
  }
});

var ComponentWillMountSetStateComponent = React.createClass({
  componentWillMount() {
    this.setState({groovy: 'doovy'});
  },
  render() {
    return <div>{this.state.groovy}</div>;
  },
});

var staticRenderLast = ReactDOMServer.renderToString(
  <div>
    <ComponentWillMountSetStateComponent />
    <StaticMarkupRenderComponent />
  </div>
);

console.log(staticRenderLast);

var staticRenderFirst = ReactDOMServer.renderToString(
  <div>
    <StaticMarkupRenderComponent />
    <ComponentWillMountSetStateComponent />
  </div>
);

console.log(staticRenderFirst);

