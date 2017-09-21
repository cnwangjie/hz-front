<template lang="html">
  <footer id="gtco-footer" role="contentinfo">
    <div class="gtco-container">
      <div class="row copyright">
        <div class="col-md-12">
          <p>
            <small class="block">© 2017 All Rights Reserved.</small>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.gtco-container {
  max-width: 1100px;
  position: relative;
  margin: 0 auto;
  padding-left: 15px;
  padding-right: 15px;
}


#gtco-footer {
  background: #4d4d4d;
  color: rgba(255, 255, 255, 0.3); }
  #gtco-footer a:hover {
    color: #fff !important; }
  #gtco-footer .gtco-footer-links {
    padding: 0;
    margin: 0 0 20px 0;
    float: left;
    width: 100%; }
    #gtco-footer .gtco-footer-links li {
      padding: 0;
      margin: 0 0 15px 0;
      list-style: none;
      line-height: 1; }
      #gtco-footer .gtco-footer-links li a {
        color: rgba(255, 255, 255, 0.5);
        text-decoration: none; }
        #gtco-footer .gtco-footer-links li a:hover {
          color: #fff !important;
          text-decoration: underline; }
  #gtco-footer .gtco-widget {
    margin-bottom: 30px; }
    #gtco-footer .gtco-widget h3 {
      color: #fff;
      margin-bottom: 15px;
      font-weight: 300;
      font-size: 15px;
      letter-spacing: 2px;
      text-transform: uppercase; }
    #gtco-footer .gtco-widget .gtco-quick-contact {
      padding: 0;
      margin: 0; }
      #gtco-footer .gtco-widget .gtco-quick-contact li {
        padding: 0;
        margin: 0 0 10px 0;
        list-style: none; }
        #gtco-footer .gtco-widget .gtco-quick-contact li i {
          width: 30px;
          float: left;
          font-size: 18px;
          position: relative;
          margin-top: 4px;
          display: -moz-inline-stack;
          display: inline-block;
          zoom: 1;
          *display: inline; }
  #gtco-footer .footer-logo span {
    color: #66D37E; }
  #gtco-footer .copyright {
    color: #b3b3b3;
    padding-top: 3em;
    padding-bottom: 3em;
    border-top: 1px solid rgba(255, 255, 255, 0.1); }
    @media screen and (max-width: 768px) {
      #gtco-footer .copyright .pull-left,
      #gtco-footer .copyright .pull-right {
        float: none !important;
        text-align: center; } }
    #gtco-footer .copyright .block {
      display: block; }
</style>
