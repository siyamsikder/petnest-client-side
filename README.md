# PetNest

---

## 🔗 Project Links

**Live Demo:** [https://petnest-d457a1.netlify.app/](https://petnest-d457a1.netlify.app/)

**Client Repository:** [https://github.com/siyamsikder/petnest-client-side](https://github.com/siyamsikder/petnest-client-side)

**Server Repository:** [https://github.com/siyamsikder/petnest-server-side](https://github.com/siyamsikder/petnest-server-side)


---

## Project Overview

PetNest is a community-driven single-page application where pet owners, breeders, and shops can list pets for adoption or sell pet-related products (food, toys, accessories, etc.). Buyers and adopters can browse listings, contact owners, and place orders. The app focuses on accessibility, responsiveness, and a clear UX for both adoption and e-commerce flows.

---

## Key Highlights

* ✅ React SPA with React Router for dynamic, route-based content
* ✅ Firebase Authentication (Email/Password + Google) with protected private routes
* ✅ MongoDB backend (Express/Node) for listings and orders
* ✅ Clean, responsive UI with accessibility and consistent typography
* ✅ PDF order export for users (jsPDF + autoTable)
* ✅ Full CRUD for listings + order placement workflow

---

## Why PetNest? (Feature bullets)

* **Find Your Furry Friend Today** — browse adoption listings with clear details.
* **Adopt, Don’t Shop** — dedicated awareness section encouraging adoption.
* **List Easily** — owners/shops can add listings with an image, description and availability date.
* **Secure Ordering** — authenticated users can place orders/adoption requests and download order reports.
* **Mobile-first, Responsive Design** — consistent card/grid layout and accessible forms.

---

## Pages & Major Features

* **Home** — banner carousel, category cards, recent listings, "Why Adopt" and "Meet Our Pet Heroes" sections.
* **Pets & Supplies** — 3-column grid, filtering by category, search by name.
* **Listing Details** — full listing info with "Adopt / Order Now" modal form (private).
* **Add Listing** — private form for owners/shops to add new listings.
* **My Listings** — user's own listings (table), with edit & delete.
* **My Orders** — user's orders in a table with "Download Report" (PDF).
* **Auth** — Register / Login with password rules (uppercase, lowercase, min 6 chars) and Google sign-in.
* **404 page** — separate page without navbar/footer.

---

## Tech Stack

**Client**

* React, React Router
* Tailwind CSS (dark/light toggle supported)
* react-hot-toast / SweetAlert for notifications
* jsPDF + jsPDF-AutoTable (export orders)
* Framer Motion / typewriter (optional animations)

**Server**

* Node.js + Express
* MongoDB (Atlas)
* JWT / Firebase Admin (optional) for server-side token verification
* CORS, dotenv for environment configuration

---

## Installation (Client)

1. Clone the client repo:

   ```bash
   git clone https://github.com/siyamsikder/petnest-client-side.git
   cd petnest-client-side
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create `.env` (example variables below) and add your Firebase config and API base URL.
4. Run locally:

   ```bash
   npm run dev
   ```
5. Build for production:

   ```bash
   npm run build
   ```

## Installation (Server)

1. Clone the server repo:

   ```bash
   git clone https://github.com/siyamsikder/petnest-server-side.git
   cd petnest-server-side
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create `.env` with the required environment variables (see example below).
4. Run:

   ```bash
   npm start
   ```

   or for development:

   ```bash
   npm run dev
   ```

---

## Required Environment Variables (examples)

**Client (`.env`)**

```
VITE_API_BASE_URL=https://your-server-url.com
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

**Server (`.env`)**

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/petnest?retryWrites=true&w=majority
JWT_SECRET=some_long_secret
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account", ...}  # optional for Admin SDK
```

---

## Usage Notes & Rules (project requirements)

* README (this file) is added to the client repo and includes the live site URL.
* The project follows the rule: no Lorem ipsum text anywhere.
* Notifications: uses react-hot-toast / SweetAlert for success/error (no default `alert()` for UX messages).
* Routing: single-page app — pages must not throw errors on reload (check server and client hosting configuration).
* Authentication: logged in users are not redirected back to login when reloading private routes. If using Firebase + Netlify, remember to add your domain to Firebase authorized domains.

---

## Deployment

**Client:** Deployed to Netlify ([https://petnest-d457a1.netlify.app/](https://petnest-d457a1.netlify.app/))
**Server:** Host on Vercel / Render / Heroku / any Node hosting; ensure CORS allows the client domain and add Firebase Admin service account config when enabling token verification.

---

## Testing & QA Checklist

* [ ] Register/login with email & Google sign-in
* [ ] Add a listing (private route) and verify it appears in Pets & Supplies
* [ ] Place an order (private) and confirm order in My Orders
* [ ] Download orders PDF and check column formatting
* [ ] Reload private routes — user should remain authenticated (no redirect to login)
* [ ] Test on mobile, tablet, desktop breakpoints

---

## Contribution

Contributions, bug reports and improvements are welcome.
If you'd like to contribute:

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/my-change`
3. Commit changes with descriptive messages
4. Open a pull request

---

## Developer / Contact

Siyam Sikder — `siyam0sikder@gmail.com`
GitHub: [https://github.com/siyamsikder](https://github.com/siyamsikder)

---

## License

This project is available under the MIT License.

---

**Notes:**

* Client repo must include at least 15 meaningful commits; server repo must include at least 8 meaningful commits to meet course rules.
* Make sure to update the client-side `README.md` inside the **client repo** with this content and keep the Live Site URL up-to-date.
