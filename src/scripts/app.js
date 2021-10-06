// Dependency
import Default from './config/default';

import Credit from './component/credit';

import Navbar from './component/navbar';
import Home from './pages/home';

class App {
  constructor() {
    this.init();
  }

  init() {
    Default();
    Navbar();
    new Home();
    Credit();
  }
}

new App();
