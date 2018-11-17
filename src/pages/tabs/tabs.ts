import { Component } from '@angular/core';

import { TestListPage } from '../test-list/test-list';
import { AssignmentPage } from '../assignment/assignment';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TestListPage;
  tab3Root = AssignmentPage;

  constructor() {

  }
}
