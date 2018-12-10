'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _velocityReact = require('velocity-react');

var _styled = require('@emotion/styled');

var _styled2 = _interopRequireDefault(_styled);

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Li = (0, _styled2.default)('li', {
    shouldForwardProp: function shouldForwardProp(prop) {
        return ['className', 'children', 'ref'].indexOf(prop) !== -1;
    }
})(function (_ref) {
    var style = _ref.style;
    return style;
});
var Ul = (0, _styled2.default)('ul', {
    shouldForwardProp: function shouldForwardProp(prop) {
        return ['className', 'children', 'ref'].indexOf(prop) !== -1;
    }
})(function (_ref2) {
    var style = _ref2.style;
    return style;
});

var TreeNode = function (_React$Component) {
    (0, _inherits3.default)(TreeNode, _React$Component);

    function TreeNode() {
        (0, _classCallCheck3.default)(this, TreeNode);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TreeNode.__proto__ || (0, _getPrototypeOf2.default)(TreeNode)).call(this));

        _this.onClick = _this.onClick.bind(_this);
        _this.onArrowClick = _this.onArrowClick.bind(_this);
        _this.onDoubleClick = _this.onDoubleClick.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(TreeNode, [{
        key: 'onClick',
        value: function onClick() {
            var _props = this.props,
                node = _props.node,
                onToggle = _props.onToggle;
            var toggled = node.toggled;


            if (onToggle) {
                onToggle(node, !toggled);
            }
        }
    }, {
        key: 'onArrowClick',
        value: function onArrowClick() {
            var _props2 = this.props,
                node = _props2.node,
                onArrowClick = _props2.onArrowClick;
            var toggled = node.toggled;

            if (onArrowClick) {
                onArrowClick(node, !toggled);
            }
        }
    }, {
        key: 'onDoubleClick',
        value: function onDoubleClick() {
            var _props3 = this.props,
                node = _props3.node,
                onDoubleClick = _props3.onDoubleClick;
            var toggled = node.toggled;

            if (onDoubleClick) {
                onDoubleClick(node, !toggled);
            }
        }
    }, {
        key: 'animations',
        value: function animations() {
            var _props4 = this.props,
                animations = _props4.animations,
                node = _props4.node;


            if (animations === false) {
                return false;
            }

            var anim = (0, _assign2.default)({}, animations, node.animations);
            return {
                toggle: anim.toggle(this.props),
                drawer: anim.drawer(this.props)
            };
        }
    }, {
        key: 'decorators',
        value: function decorators() {
            // Merge Any Node Based Decorators Into The Pack
            var _props5 = this.props,
                decorators = _props5.decorators,
                node = _props5.node;

            var nodeDecorators = node.decorators || {};

            return (0, _assign2.default)({}, decorators, nodeDecorators);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var style = this.props.style;

            var decorators = this.decorators();
            var animations = this.animations();

            return _react2.default.createElement(
                Li,
                { innerRef: function innerRef(ref) {
                        return _this2.topLevelRef = ref;
                    },
                    style: style.base },
                this.renderHeader(decorators, animations),
                this.renderDrawer(decorators, animations)
            );
        }
    }, {
        key: 'renderDrawer',
        value: function renderDrawer(decorators, animations) {
            var _this3 = this;

            var toggled = this.props.node.toggled;


            if (!animations && !toggled) {
                return null;
            } else if (!animations && toggled) {
                return this.renderChildren(decorators, animations);
            }

            var restAnimationInfo = (0, _objectWithoutProperties3.default)(animations.drawer, []);

            return _react2.default.createElement(
                _velocityReact.VelocityTransitionGroup,
                (0, _extends3.default)({}, restAnimationInfo, {
                    ref: function ref(_ref3) {
                        return _this3.velocityRef = _ref3;
                    } }),
                toggled ? this.renderChildren(decorators, animations) : null
            );
        }
    }, {
        key: 'renderHeader',
        value: function renderHeader(decorators, animations) {
            var _props6 = this.props,
                node = _props6.node,
                style = _props6.style;


            if (!node.children && node.type === 'folder') {
                node.children = [{ name: '(Empty)', key: -1, __virtual: true }];
            }

            return _react2.default.createElement(_header2.default, { animations: animations,
                decorators: decorators,
                node: (0, _assign2.default)({}, node),
                onClick: this.onClick,
                onArrowClick: this.onArrowClick,
                onDoubleClick: this.onDoubleClick,
                style: style });
        }
    }, {
        key: 'renderChildren',
        value: function renderChildren(decorators) {
            var _this4 = this;

            var _props7 = this.props,
                animations = _props7.animations,
                propDecorators = _props7.decorators,
                node = _props7.node,
                style = _props7.style;


            if (node.loading) {
                return this.renderLoading(decorators);
            }

            var children = node.children;
            if (!Array.isArray(children)) {
                children = children ? [children] : [];
            }

            return _react2.default.createElement(
                Ul,
                { style: style.subtree,
                    ref: function ref(_ref4) {
                        return _this4.subtreeRef = _ref4;
                    } },
                children.map(function (child, index) {
                    return _react2.default.createElement(TreeNode, (0, _extends3.default)({}, _this4._eventBubbles(), {
                        animations: animations,
                        decorators: propDecorators,
                        key: child.id || index,
                        node: child,
                        style: style }));
                })
            );
        }
    }, {
        key: 'renderLoading',
        value: function renderLoading(decorators) {
            var style = this.props.style;


            return _react2.default.createElement(
                Ul,
                { style: style.subtree },
                _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(decorators.Loading, { style: style.loading })
                )
            );
        }
    }, {
        key: '_eventBubbles',
        value: function _eventBubbles() {
            var _props8 = this.props,
                onToggle = _props8.onToggle,
                onArrowClick = _props8.onArrowClick,
                onDoubleClick = _props8.onDoubleClick;

            return {
                onToggle: onToggle,
                onArrowClick: onArrowClick,
                onDoubleClick: onDoubleClick
            };
        }
    }]);
    return TreeNode;
}(_react2.default.Component);

TreeNode.propTypes = {
    style: _propTypes2.default.object.isRequired,
    node: _propTypes2.default.object.isRequired,
    decorators: _propTypes2.default.object.isRequired,
    animations: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.bool]).isRequired,
    onToggle: _propTypes2.default.func,
    onArrowClick: _propTypes2.default.func,
    onDoubleClick: _propTypes2.default.func
};

exports.default = TreeNode;