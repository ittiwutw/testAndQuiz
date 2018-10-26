import { Component } from '@angular/core';

import { TestListPage } from '../test-list/test-list';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TestListPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
