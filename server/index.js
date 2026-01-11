const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const db = client.db("petNestDB");
        const usersCollection = db.collection("users");
        const listingsCollection = db.collection("listings");
        const ordersCollection = db.collection("orders");

        // JWT related API
        app.post('/jwt', async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            res.send({ token });
        });

        // Middlewares 
        const verifyToken = (req, res, next) => {
            if (!req.headers.authorization) {
                return res.status(401).send({ message: 'unauthorized access' });
            }
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).send({ message: 'unauthorized access' });
                }
                req.decoded = decoded;
                next();
            })
        };

        const verifyAdmin = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email };
            const user = await usersCollection.findOne(query);
            const isAdmin = user?.role === 'admin';
            if (!isAdmin) {
                return res.status(403).send({ message: 'forbidden access' });
            }
            next();
        };

        // User related API
        app.post('/users', async (req, res) => {
            const user = req.body;
            const query = { email: user.email };
            const existingUser = await usersCollection.findOne(query);
            if (existingUser) {
                return res.send({ message: 'user already exists', insertedId: null });
            }
            const result = await usersCollection.insertOne({ ...user, role: 'user' });
            res.send(result);
        });

        app.get('/users/role/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const user = await usersCollection.findOne(query);
            res.send({ role: user?.role || 'user' });
        });

        // Admin only user APIs
        app.get('/admin/users', verifyToken, verifyAdmin, async (req, res) => {
            const result = await usersCollection.find().toArray();
            res.send(result);
        });

        app.patch('/admin/users/role/:id', verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const { role } = req.body;
            const filter = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: { role: role }
            };
            const result = await usersCollection.updateOne(filter, updatedDoc);
            res.send(result);
        });

        // Dashboard Overview Data
        app.get('/admin/stats', verifyToken, verifyAdmin, async (req, res) => {
            const users = await usersCollection.estimatedDocumentCount();
            const listings = await listingsCollection.estimatedDocumentCount();
            const orders = await ordersCollection.estimatedDocumentCount();

            // Revenue (example calculation if price exists)
            const payments = await ordersCollection.find().toArray();
            const revenue = payments.reduce((total, payment) => total + (payment.price || 0), 0);

            res.send({
                users,
                listings,
                orders,
                revenue
            });
        });

        // Profile API
        app.get('/users/:email', verifyToken, async (req, res) => {
            const email = req.params.email;
            if (email !== req.decoded.email) {
                return res.status(403).send({ message: 'forbidden access' });
            }
            const query = { email: email };
            const result = await usersCollection.findOne(query);
            res.send(result);
        });

        app.patch('/users/:email', verifyToken, async (req, res) => {
            const email = req.params.email;
            const userInfo = req.body;
            if (email !== req.decoded.email) {
                return res.status(403).send({ message: 'forbidden access' });
            }
            const filter = { email: email };
            const updatedDoc = {
                $set: {
                    name: userInfo.name,
                    phone: userInfo.phone,
                    location: userInfo.location,
                    bio: userInfo.bio
                }
            };
            const result = await usersCollection.updateOne(filter, updatedDoc);
            res.send(result);
        });

        // User Items CRUD
        app.get('/my-listings/:email', verifyToken, async (req, res) => {
            const email = req.params.email;
            if (email !== req.decoded.email) {
                return res.status(403).send({ message: 'forbidden access' });
            }
            const query = { email: email };
            const result = await listingsCollection.find(query).toArray();
            res.send(result);
        });

        console.log("Connected to MongoDB!");
    } finally {
        // Keep connection alive
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('PetNest Server is running');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
