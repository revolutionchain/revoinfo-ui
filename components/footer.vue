<template>
  <!--<footer>
    <div class="container">
      <h3 class="is-size-4 is-uppercase">{{ $t('footer.contact_us') }}</h3>
      <div class="line"></div>
      <a href="mailto:info@revolutionchain.it">info@revolutionchain.it</a>

      <ul class="links">
        <li>
          <a target="_blank" href="https://www.facebook.com/revolutionchain/">
            <Icon icon="facebook" brands /> {{ $t('footer.facebook') }}
          </a>
        </li>
        <li>
          <a target="_blank" href="https://twitter.com/revolutionchain">
            <Icon icon="twitter" brands /> {{ $t('footer.twitter') }}
          </a>
        </li>
        <li>
          <a target="_blank" href="https://forum.revo.network">
            <span class="revo-icon revo-icon--revo"></span> {{ $t('footer.forum') }}
          </a>
        </li>
        <li>
          <a target="_blank" href="https://github.com/revolutionchain/revo">
            <Icon icon="github" brands /> Github
          </a>
        </li>
      </ul>

      <div class="copyright">
        2017 - 2021 REVO &copy; All rights Reserved
      </div>
    </div>
  </footer>-->
  <footer>
		<div>
      <p>Copyright © 2021 - <a href="https://revo.network/" target="_blank">Revo Technologies</a><font color="green"><br><i class="fa fa-leaf" aria-hidden="true"></i> energy saving protocol</font></p>
      <a href="#"><i class="fab fa-github-alt" aria-hidden="true"></i></a>&nbsp;
      <a href="#"><i class="fab fa-twitter" aria-hidden="true"></i></a>&nbsp;
      <a href="#"><i class="fab fa-reddit" aria-hidden="true"></i></a>
		</div>
	</footer>
</template>

<style lang="less" scoped>
  footer {
    padding-top: 3rem;
    padding-bottom: 1.5rem;
    background-color: black;
    text-align: center;
    p {
      font-size: 14px;
      font-weight: 400;
      color: #697982;
      margin-bottom: 1rem;
    }
  }
  a:link, a:visited, a:active {
    color: #87A1AD;
  }
  a:hover {
    color: green;
  }
  .line {
    width: 2rem;
    height: 1px;
    margin: 0.5rem auto;
    background-color: white;
  }
  .links {
    display: flex;
    max-width: 40rem;
    margin-left: auto;
    margin-right: auto;
    padding: 0.5rem;
    border-bottom: 1px solid rgba(242, 242, 242, 0.2);
    @media (max-width: 768px) {
      flex-wrap: wrap;
      justify-content: space-around;
      margin-top: 2rem;
      margin-bottom: 2rem;
      > li {
        flex: 50%;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
      }
    }
    @media (min-width: 769px) {
      justify-content: space-between;
      margin-top: 2.5rem;
      margin-bottom: 2.5rem;
    }
  }
  span.fab, span.fas, span.revo-icon {
    font-size: 2em;
    vertical-align: middle;
  }
</style>
