'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react'),
    extend = require("extend"),
    Bloodhound = require('typeahead.js/dist/bloodhound'),
    Typeahead = require('typeahead.js/dist/typeahead.jquery'),
    ReactTypeahead;

ReactTypeahead = React.createClass({ displayName: "ReactTypeahead",
  getDefaultProps: function getDefaultProps() {
    return {
      bloodhound: {},
      typeahead: {},
      datasource: {}
    };
  },

  /**
  * 'initOptions' method
     * This method sets up the typeahead with initial config parameters. The first set is default
     * and the other set is defined by the
     */
  initOptions: function initOptions() {
    var defaultMinLength = 2,
        config = {};

    var defaults = {
      bloodhound: {
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace
      },
      typeahead: {
        minLength: defaultMinLength,
        hint: true,
        highlight: true
      },
      datasource: {
        displayProperty: 'value',
        queryStr: '%QUERY'
      }
    };

    config.bloodhound = extend(true, {}, defaults.bloodhound, this.props.bloodhound);
    config.typeahead = extend(true, {}, defaults.typeahead, this.props.typeahead);
    config.datasource = extend(true, {}, defaults.datasource, this.props.datasource);

    return config;
  },

  loadScript: function loadScript(scriptURL) {
    script = document.createElement('script');
    script.src = scriptURL;
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);
  },

  /**
   * 'getInitialState' method
   * We want to make sure that the jquery and typeahead libraries are loaded into the DOM
   */
  getInitialState: function getInitialState() {
    return { data: [] };
  },
  /**
     * 'componentDidMount' method
     * Initializes react with the typeahead component.
     */
  componentDidMount: function componentDidMount() {
    var self = this,
        options = this.initOptions();

    var remoteCall = new Bloodhound(options.bloodhound);
    options.datasource.source = remoteCall;
    var typeaheadInput = React.findDOMNode(self);
    if (typeaheadInput) this.typeahead = $(typeaheadInput).typeahead(options.typeahead, options.datasource);

    this.bindCustomEvents();
  },

  render: function render() {
    var className = "typeahead";

    if (this.props.className) className += ' ' + this.props.className;

    return React.createElement('input', _extends({ className: className, type: 'text', placeholder: this.props.placeHolder }, this.props.inputAttributes));
  },

  bindCustomEvents: function bindCustomEvents() {
    var customEvents = this.props.customEvents;

    if (!customEvents) return;

    for (var event in customEvents) this.typeahead.on(event, customEvents[event]);
  }
});

module.exports = ReactTypeahead;
