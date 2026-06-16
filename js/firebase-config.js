const firebaseConfig = {
  apiKey: "AIzaSyBKkjDB1icKFQ9FJdvGENQQ7ZeLk7hnBGI",
  authDomain: "class-notes-hub-61b20.firebaseapp.com",
  projectId: "class-notes-hub-61b20",
  storageBucket: "class-notes-hub-61b20.firebasestorage.app",
  messagingSenderId: "112494248768",
  appId: "1:112494248768:web:ea968e4f0c2ffcc39c70a5",
  measurementId: "G-69S13B95M6"
};
// Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();
// Role Authorization Check
        const role = localStorage.getItem('role');
        if (!role) { window.location.href = "index.html"; }

        if (role === 'admin') {
            document.getElementById('welcomeText').innerText = "Welcome, Admin Teacher!";
            document.getElementById('adminPanel').style.display = "block";
        } else {
            document.getElementById('welcomeText').innerText = "Welcome, Student Portal!";
        }
