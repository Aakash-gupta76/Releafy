# QUICK START - Calmspace Chat Feature

## 🚀 3-Minute Setup

### Step 1: Install Backend Dependencies
```bash
cd ChatServer
npm install
```

### Step 2: Start Backend Server
```bash
npm run dev
# or: npm start
```
✅ Server running on http://localhost:5000

### Step 3: Install Frontend Dependencies
```bash
cd Frontend
npm install
```

### Step 4: Update Frontend Environment (if needed)
```bash
# Create .env file in Frontend folder:
VITE_SOCKET_URL=http://localhost:5000
```

### Step 5: Start Frontend
```bash
npm run dev
```
✅ Frontend running on http://localhost:5173 (or next available port)

### Step 6: Open & Test
1. Open browser: `http://localhost:5173`
2. Navigate to Features → Real-time Chat
3. Open another window/browser
4. Start chatting! 💬

---

## 📋 Folder Structure Created

```
Calmspace - Copy/
├── ChatServer/                    ← New Backend
│   ├── src/
│   │   ├── server.js
│   │   └── utils.js
│   ├── package.json
│   └── README.md
│
├── Frontend/                      ← Existing, Updated
│   ├── src/Components/Features/
│   │   ├── Chat.jsx               ← New Chat Component
│   │   └── Chat.module.css        ← New Chat Styles
│   ├── package.json               ← Updated with socket.io-client
│   └── .env                       ← New Config File
│
└── CHAT_SETUP_GUIDE.md           ← Complete Documentation
```

---

## 🎯 Features Included

✨ **Real-time Messaging**
- Instant message delivery between users
- Private one-on-one conversations

👥 **Online Users Discovery**
- See all connected users
- Real-time presence updates

⌨️ **Typing Indicators**
- See when users are typing
- Automatic timeout after 2 seconds

😊 **Emoji Support**
- 16 common emojis to choose from
- Click emoji button in message input

🤐 **Profanity Filter**
- Automatic word replacement
- Extensible filter list

🎲 **Random User Matching**
- Click "Need Help?" button
- Auto-connect with any online user

🔒 **Anonymous & Secure**
- Auto-generated usernames
- No authentication required
- CORS protected

---

## 🔌 Socket.io Events (Technical Reference)

**Send Message:**
```javascript
socket.emit('send-message', {
  receiverId: 'user-id',
  message: 'Hello!',
  timestamp: new Date().toISOString()
})
```

**Typing:**
```javascript
socket.emit('typing', {
  receiverId: 'user-id',
  isTyping: true
})
```

**Random Match:**
```javascript
socket.emit('request-random-match')
```

---

## ❌ Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot connect" | Start ChatServer: `cd ChatServer && npm run dev` |
| "Socket undefined" | Install dependency: `cd Frontend && npm install socket.io-client` |
| "Port 5000 in use" | Change PORT in ChatServer/.env or kill process on port 5000 |
| "CORS error" | Ensure backend CORS is enabled (it is by default) |

---

## 📚 Detailed Documentation

For complete details, see: `CHAT_SETUP_GUIDE.md`

---

## 🎉 Done!

Your Calmspace stress relief chat feature is now live and ready for real-time connections! 🚀

Open http://localhost:5173 and check it out!
