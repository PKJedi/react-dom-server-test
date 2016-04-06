var React = require('react');
var ReactDOMServer = require('react-dom/server');

Error.stackTraceLimit = Infinity;

var StaticMarkupRenderComponent = React.createClass({
  render() {
    var stuffToRender = React.DOM.noscript({}, React.DOM.img({src: 'tracking-fallback-pixel.png'}));
    var staticContent = ReactDOMServer.renderToStaticMarkup(stuffToRender);
    var getStaticContent = () => ({__html: staticContent});
    return React.DOM.div({dangerouslySetInnerHTML: getStaticContent()});
  }
});

var ComponentWillMountSetStateComponent = React.createClass({
  componentWillMount() {
    this.setState({groovy: 'doovy'});
  },
  render() {
    return React.DOM.div({}, this.state.groovy);
  }
});

// Works
var staticRenderLast = ReactDOMServer.renderToString(
  React.DOM.div(
    {},
    React.createElement(ComponentWillMountSetStateComponent),
    React.createElement(StaticMarkupRenderComponent)
  )
);

console.log(staticRenderLast);

// Dies with
// TypeError: Cannot read property '_currentElement' of null
// in the setState
var staticRenderFirst = ReactDOMServer.renderToString(
  React.DOM.div(
    {},
    React.createElement(StaticMarkupRenderComponent),
    React.createElement(ComponentWillMountSetStateComponent)
  )
);

console.log(staticRenderFirst);

