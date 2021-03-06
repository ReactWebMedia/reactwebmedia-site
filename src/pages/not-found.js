import React from 'react';
import { connect } from 'react-redux';
import { defaultSelector } from '../selectors';

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <Header is_logged_in={this.props.is_logged_in} current_user={this.props.current_user} />

        <div className="page__container">
          <div className="page__body">
            <section className="card">
              <div className="card__content">
                <p><strong>Page Not Found</strong></p>
              </div>
            </section>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(defaultSelector)(NotFound);
