const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();

// Multer ayarları
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

// Statik dosyalar için klasör
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Ürünleri JSON dosyasından oku
let products = [];
try {
    products = JSON.parse(fs.readFileSync('products.json'));
} catch (error) {
    products = [];
}

// Ana sayfa
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ürünleri getir
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Yeni ürün ekle
app.post('/upload-flower', upload.single('image'), (req, res) => {
    try {
        const newProduct = {
            id: Date.now(),
            image: `/uploads/${req.file.filename}`,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            seller: "Günel Tağıyeva",
            shop: "Clara Flowers"
        };

        products.push(newProduct);
        fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
        res.json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Xəta baş verdi' });
    }
});

// Ürün sil
app.delete('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    
    if (index !== -1) {
        const deletedProduct = products.splice(index, 1)[0];
        fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
        
        // Resmi de sil
        if (deletedProduct.image) {
            const imagePath = path.join(__dirname, 'public', deletedProduct.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        
        res.json({ success: true });
    } else {
        res.status(404).json({ error: 'Məhsul tapılmadı' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda işləyir`);
});