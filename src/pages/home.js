import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import NotFound from './not-found';
import { ActionsTrigger } from '../triggers';
import { defaultSelector } from '../selectors';

import Nav from '../components/nav';

class HomePage extends React.Component {
  static displayName = 'UserPage';

  static async fetchData(params, store, client) {
  }

  render () {
    return (
      <div id="home-page">
      	<Nav></Nav>
        <section className="hero">
          <div className="hero-background">
            <div className="hero-slider">
              <img src="/images/hero/v1-slide-01.jpg" alt="Woman with computer on bench" />
            </div>
            <video preload="auto" loop className="video" autoPlay>
              <source src="/images/hero/v1-video.mp4" type="video/mp4"/>
              <source src="/images/hero/v1-video.webm" type="video/webm"/>
            </video>
          </div>
          <div className="hero-foreground">
            <h1>Hire experienced fullstack React.js developers</h1>
            <a href="#" className="hero-cta btn btn-default" role="button">Get Started</a>
          </div>
        </section>
        <section className="we-are">
          <div className="top-angle"></div>
          <div className="row">
            <div className="hidden-xs hidden-sm col-md-2">
              &nbsp;
            </div>
            <div className="col-md-4 we-title">
              <h2>We Build</h2>
            </div>
            <div className="col-md-8">
              <p className="we-sub-title">Prototypes, {'MVP\u0027s'}, and Production Ready, real-time web apps using React.js</p>
            </div>
            <div className="hidden-xs hidden-sm col-md-2">
              &nbsp;
            </div>
          </div>
          <div className="row">
            <div className="hidden-xs hidden-sm col-md-2">
              &nbsp;
            </div>
            <div className="col-xs-16 col-md-12">
              <p className="we-text">ReactWebMedia is a fast turnaround, nearshore, production house specialized in the development of real-time web applications using React.js, Node.js, and PostgreSQL</p>
            </div>
            <div className="hidden-xs hidden-sm col-md-2">
              &nbsp;
            </div>
          </div>
          <div className="bottom-angle bottom-angle-inverted"></div>
        </section>
        <section className="parallax-clients">
          <h2>Clients</h2>
          <div className="row">
            <div className="col-sm-2 hidden-xs">
              &nbsp;
            </div>
            <div className="col-sm-4 client-logo">
              <img src="/images/clients/liberty-soil-logo.png" alt=""/>
            </div>
            <div className="col-sm-4 client-logo">
              <img src="/images/clients/angel-list-logo.png" alt=""/>
            </div>
            <div className="col-sm-4 client-logo">
              <img src="/images/clients/persist-iq-logo.png" alt=""/>
            </div>
            <div className="col-sm-2 hidden-xs">
              &nbsp;
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4 hidden-xs">
              &nbsp;
            </div>
            <div className="col-sm-4 client-logo">
              <img src="/images/clients/aligned-logo.png" alt=""/>
            </div>
            <div className="col-sm-4 client-logo">
              <img src="/images/clients/order-cup-logo.png" alt=""/>
            </div>
            <div className="col-sm-4 hidden-xs">
              &nbsp;
            </div>
          </div>
        </section>
        <section className="team bg-brand-gray">
          <div className="top-angle before-bg-brand-gray"></div>
          <h2>Team</h2>
          <div className="row">
            <div className="hidden-xs col-sm-2">
              &nbsp;
            </div>
            <div className="col-xs-16 col-sm-6 col-md-4 member">
              <div className="member-image-holder">
                <img src="/images/team/placeholder.jpg" alt=""/>
              </div>
              <h3>Leo DiReactio</h3>
              <h4>Oscar Hunter</h4>
            </div>
            <div className="col-xs-16 col-sm-6 col-md-4 member">
              <div className="member-image-holder">
                <img src="/images/team/placeholder.jpg" alt=""/>
              </div>
              <h3>Leo DiReactio</h3>
              <h4>Oscar Hunter</h4>
            </div>
            <div className="hidden-xs col-sm-2 hidden-md hidden-lg">
              &nbsp;
            </div>
            <div className="hidden-xs col-sm-2 clear-left-sm hidden-md hidden-lg">
              &nbsp;
            </div>
            <div className="col-xs-16 col-sm-6 col-md-4 member">
              <div className="member-image-holder">
                <img src="/images/team/placeholder.jpg" alt=""/>
              </div>
              <h3>Leo DiReactio</h3>
              <h4>Oscar Hunter</h4>
            </div>
            <div className="hidden-xs hidden-sm col-md-2">
              &nbsp;
            </div>
            <div className="hidden-xs hidden-sm col-md-2 clear-left-md clear-left-lg">
              &nbsp;
            </div>
            <div className="col-xs-16 col-sm-6 col-md-4 member">
              <div className="member-image-holder">
                <img src="/images/team/placeholder.jpg" alt=""/>
              </div>
              <h3>Leo DiReactio</h3>
              <h4>Oscar Hunter</h4>
            </div>
            <div className="hidden-xs col-sm-2 hidden-md hidden-lg">
              &nbsp;
            </div>
            <div className="hidden-xs col-sm-2 clear-left-sm hidden-md hidden-lg">
              &nbsp;
            </div>
            <div className="col-xs-16 col-sm-6 col-md-4 member">
              <div className="member-image-holder">
                <img src="/images/team/placeholder.jpg" alt=""/>
              </div>
              <h3>Leo DiReactio</h3>
              <h4>Oscar Hunter</h4>
            </div>
            <div className="col-xs-16 col-sm-6 col-md-4 member">
              <div className="member-image-holder">
                <img src="/images/team/placeholder.jpg" alt=""/>
              </div>
              <h3>Leo DiReactio</h3>
              <h4>Oscar Hunter</h4>
            </div>
            <div className="hidden-xs col-sm-2">
              &nbsp;
            </div>
          </div>
          <div className="bottom-angle before-bg-brand-gray"></div>
        </section>
        <section className="traits">
          <div className="row">
            <div className="hidden-xs col-sm-2">
              &nbsp;
            </div>
            <div className="col-xs-16 col-sm-4 trait">
              <div className="trait-image-holder">
                <img src="/images/traits/icon-agile.png" alt=""/>
              </div>
              <h3>Agile</h3>
              <p>Quick &amp; efficient delivery by implementing:</p>
              <ul>
                <li><span>Daily SCRUM meetings</span></li>
                <li><span>One week sprints</span></li>
                <li><span>Weekly Demos</span></li>
              </ul>
              <div className="cta-holder">
                <a href="#" className="traits-cta btn btn-default" role="button">Read More</a>
              </div>
            </div>
            <div className="col-xs-16 col-sm-4 trait">
              <div className="trait-image-holder">
                <img src="/images/traits/icon-fullstack.png" alt=""/>
              </div>
              <h3>Full Stack</h3>
              <p>Senior React.js developers that are:</p>
              <ul>
                <li><span>Multidisciplinary</span></li>
                <li><span>Entrepreneurial</span></li>
                <li><span>Experts</span></li>
              </ul>
              <div className="cta-holder">
                <a href="#" className="traits-cta btn btn-default" role="button">Read More</a>
              </div>
            </div>
            <div className="col-xs-16 col-sm-4 trait">
              <div className="trait-image-holder">
                <img src="/images/traits/icon-easy.png" alt=""/>
              </div>
              <h3>Easy</h3>
              <p>Get started in just three easy steps:</p>
              <ul>
                <li><span>Schedule Skype Call</span></li>
                <li><span>Formalize Agreement</span></li>
                <li><span>Pay with Paypal</span></li>
              </ul>
              <div className="cta-holder">
                <a href="#" className="traits-cta btn btn-default" role="button">Read More</a>
              </div>
            </div>
            <div className="hidden-xs col-sm-2">
              &nbsp;
            </div>
          </div>
        </section>
        <section className="footer bg-brand-gray">
          <div className="row">
            <div className="hidden-xs col-sm-2">
              &nbsp;
            </div>
            <div className="col-sm-3 footer-links">
              <ul>
                <li>
                  <a href="#">How it works</a>
                </li>
                <li>
                  <a href="#">Get started</a>
                </li>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">TicoWebMedia</a>
                </li>
              </ul>
            </div>
            <div className="col-sm-6 footer-form">
              <form>
                <div className="form-group">
                  <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
                </div>
                <button type="submit" className="btn btn-default">Get Sarted</button>
              </form>
            </div>
            <div className="hidden-xs col-sm-3">
              <div className="footer-logo-holder">
                <img src="/images/reactwebmedia-logo-icon.png" alt=""/>
              </div>
            </div>
            <div className="hidden-xs col-sm-2">
              &nbsp;
            </div>
          </div>
          <div className="footer-centered row">
            <ul className="footer-social-icons">
              <li>
                <a href="#"><i className="fa fa-facebook"></i></a>
              </li>
              <li>
                <a href="#"><i className="fa fa-github-alt"></i></a>
              </li>
              <li>
                <a href="#"><i className="fa fa-twitter"></i></a>
              </li>
            </ul>
            <p className="copyright">2016 &copy; <a href="#">ReactWebMedia</a>, All Rights Reserved, Developed by <a href="#">TicoWebMedia</a></p>
          </div>
        </section>
      </div>
    )
  }
}

export default connect(defaultSelector)(HomePage);