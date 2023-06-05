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

// To Do

A date atom to reuse with predefined format
A price atom to reuse with predefined format (including currency)
A location atom to reuse with predefined format (including country... and flag)
