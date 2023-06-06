ng g c layout/header
ng g c layout/footer
ng g c routes/home --type=page
ng g c routes/auth/sign-up --type=page
ng g c shared/loading
ng g c shared/error
ng g c shared/list
ng g class routes/home/home --type=facade
ng g class core/command --type=state
ng g c routes/activities/detail --type=page
ng g class routes/activities/detail/detail --type=facade

npm install marked
npm install @types/marked -D

ng g c shared/date
ng g c shared/price
ng g c shared/data
ng g c shared/link
ng g c routes/home/activity --type=item

// To Do
A location atom to reuse with predefined format (including country... and flag)

Standardize component types

- [ ] block
- [ ] card
- [x] dialog
- [ ] form
- [x] item
- [ ] list
- [x] page
- [ ] widget

Standardize service/class types

- [x] facade
- [x] state
- [ ] store
