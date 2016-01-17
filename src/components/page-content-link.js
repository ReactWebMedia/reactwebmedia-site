import React from 'react';
import { Link } from 'react-router';

export default class PageContentLink extends React.Component {
  static displayName = 'PageContentLink';
  static propTypes = {
    visible: React.PropTypes.bool,
    className: React.PropTypes.string,
    activeClassName: React.PropTypes.string,
    to: React.PropTypes.string
  };

  render() {
    let {
      visible,
      className,
      activeClassName,
      to,
      children
    } = this.props;

    if (visible) {
      return <Link className={className} activeClassName={activeClassName} to={to}>{children}</Link>;
    }

    return false;
  }
}
