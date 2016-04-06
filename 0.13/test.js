var React = require('react');

Error.stackTraceLimit = Infinity;

var StaticMarkupRenderComponent = React.createClass({
  render() {
    var stuffToRender = React.DOM.noscript({}, React.DOM.img({src: 'tracking-fallback-pixel.png'}));
    var staticContent = React.renderToStaticMarkup(stuffToRender);
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
var staticRenderLast = React.renderToString(
  React.DOM.div(
    {},
    React.createElement(ComponentWillMountSetStateComponent),
    React.createElement(StaticMarkupRenderComponent)
  )
);

console.log(staticRenderLast);

// Works
var staticRenderFirst = React.renderToString(
  React.DOM.div(
    {},
    React.createElement(StaticMarkupRenderComponent),
    React.createElement(ComponentWillMountSetStateComponent)
  )
);

console.log(staticRenderFirst);

