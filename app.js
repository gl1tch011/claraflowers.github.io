// Firebase konfiqurasiyası
const firebaseConfig = {
    apiKey: "AIzaSyBiQr7aHxdYxk8sCkHxMebkVyBEYs3-z-E",
    authDomain: "clara-flowers.firebaseapp.com",
    projectId: "clara-flowers",
    storageBucket: "clara-flowers.appspot.com",
    messagingSenderId: "525675486288",
    appId: "1:525675486288:web:9b6f571076e85be8112da7"
};

// Firebase-i başladırıq
firebase.initializeApp(firebaseConfig);

// Firebase xidmətlərini əldə edirik
const db = firebase.firestore();
const storage = firebase.storage();

// Form submit olduqda işləyəcək funksiya
document.getElementById('productForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Form məlumatlarını alırıq
    const file = document.getElementById('productImage').files[0];
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;

    try {
        // Şəkili Storage-a yükləyirik
        const storageRef = storage.ref('products/' + Date.now() + '-' + file.name);
        const uploadTask = await storageRef.put(file);

        // Şəklin URL-ni əldə edirik
        const imageUrl = await storageRef.getDownloadURL();

        // Məhsul məlumatlarını database-ə əlavə edirik
        await db.collection('products').add({
            name: name,
            price: Number(price),
            imageUrl: imageUrl,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert('Məhsul uğurla əlavə edildi!');
        document.getElementById('productForm').reset();

    } catch (error) {
        console.error("Xəta baş verdi:", error);
        alert('Xəta baş verdi: ' + error.message);
    }
});
