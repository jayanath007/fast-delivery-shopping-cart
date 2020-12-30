// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAz5DChTHUHSGcHR3BOLvjDFfLTfZQ1E8I",
    authDomain: "online-shop-299505.firebaseapp.com",
    databaseURL: "https://online-shop-299505-default-rtdb.firebaseio.com",
    projectId: "online-shop-299505",
    storageBucket: "online-shop-299505.appspot.com",
    messagingSenderId: "952363420988",
    appId: "1:952363420988:web:e8b14516d455e11dfc6239",
    measurementId: "G-5W0XJFH6FZ"
  }
};

export const application = {
  defaultUser: "https://firebasestorage.googleapis.com/v0/b/online-shop-299505.appspot.com/o/app-images%2Fdefault-user.jpg?alt=media&token=0fde39a8-15d9-4fba-a750-b7c67e23443a",
}
