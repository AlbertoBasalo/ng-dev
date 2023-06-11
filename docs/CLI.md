ng g c layout/header
ng g c layout/footer
ng g c routes/home --type=page
ng g c routes/auth/sign-up --type=page
ng g c shared/loading
ng g c shared/error --type=dialog
ng g c shared/list
ng g class routes/home/home --type=facade
ng g class core/command --type=state
ng g c routes/activities/detail --type=page
ng g class routes/activities/detail --type=facade

npm install marked
npm install @types/marked -D

ng g c shared/date --type=block
ng g c shared/price --type=block
ng g c shared/data --type=block
ng g c shared/link --type=block
ng g c routes/home/activity --type=item
ng g c shared/location --type=block

ng g c routes/auth/sign-up/sign-up --type=form
ng g class core/global --type=store

ng g interceptor core/auth
ng g interceptor core/error

ng g c routes/activities/mines --type=page
ng g class routes/activities/mines --type=facade
ng g c routes/activities/activity --type=item
ng g p shared/truncate

// To Do: Move Error Dialog to main layout

Standardize component types

- [x] block
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
