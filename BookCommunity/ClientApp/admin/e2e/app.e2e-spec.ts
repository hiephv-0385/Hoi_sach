import { AppPage } from './app.po';

<<<<<<< HEAD
describe('admin App', () => {
=======
describe('angular-cli-demo App', () => {
>>>>>>> 8b31a2f1c183f052d9864f3efd4bafa634f4f221
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
