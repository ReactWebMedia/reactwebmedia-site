import React from 'react'

export default class FooterComponent extends React.Component {
  render () {
    return (
      <footer className="page__footer footer">
        {false && <nav className="footer_nav">
          <a href="#">About</a>
          <a href="#">FAQ</a>
          <a href="#">Terms of service</a>
          <a href="#">Privacy policy</a>
        </nav>}
        <p><a href="mailto:info@reactwebmedia.co">info@reactwebmedia.co</a></p>
        <script async src="//d1ks1friyst4m3.cloudfront.net/toolbar/prod/td.js" data-trackduck-id="56182f159e7749be13765442"></script>
      </footer>
    )
  }
}
