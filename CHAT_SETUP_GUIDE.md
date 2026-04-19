# Calmspace Real-time Chat Feature - Complete Setup Guide

A full-featured, real-time chat application built with **React**, **Node.js**, **Express**, and **Socket.io** for the Calmspace stress relief platform.

---

## 🎯 Features Overview

### Core Features
- ✨ **Real-time Messaging** - Instant message delivery
- 👥 **Online Users List** - See who's connected
- 💬 **Private Messaging** - One-on-one conversations
- ⌨️ **Typing Indicators** - See who's typing
- 🔒 **Anonymous Chat** - No login required
- 📱 **Responsive Design** - Works on all devices
- 😊 **Emoji Support** - Add emotions to messages
- 🤐 **Profanity Filter** - Automatic content filtering
- 🎲 **Random User Matching** - "Need Help?" button for random connections

### UI Features
- Modern dark theme (Calmspace branding)
- Auto-scroll to latest messages
- Message timestamps
- User avatars with initials
- Real-time connection status
- Smooth animations and transitions

---

## 📁 Project Structure

```
Calmspace/
├── Frontend/                           (React App)
│   ├── src/
│   │   ├── Components/
│   │   │   └── Features/
│   │   │       ├── Chat.jsx            (Main Chat component)
│   │   │       └── Chat.module.css     (Styling)
│   │   ├── pages/
│   │   │   └── Features.jsx            (Features page with Chat)
│   │   └── services/
│   │       └── api.js
│   ├── package.json
│   └── .env                            (Socket.io URL config)
│
└── ChatServer/                         (Node.js Backend)
    ├── src/
    │   ├── server.js                   (Main server file)
    │   └── utils.js                    (Helper functions)
    ├── package.json
    ├── .env.example
    └── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

#### 1. Setup Backend Server

```bash
# Navigate to ChatServer directory
cd ChatServer

# Install dependencies
npm install

# Install nodemon for development (optional but recommended)
npm install --save-dev nodemon

# Start the server
npm start
# For development with auto-reload:
npm run dev
```

Server will run on: `http://localhost:5000`

#### 2. Setup Frontend

```bash
# Navigate to Frontend directory
cd Frontend

# Install dependencies
npm install

# Update environment variables
# Create or update .env file:
echo "VITE_SOCKET_URL=http://localhost:5000" > .env

# Start development server
npm run dev
```

Frontend will run on: `http://localhost:5173` (or next available port)

#### 3. Access the Chat Feature

1. Open `http://localhost:5173` in your browser
2. Navigate to the Features page
3. Click on "Real-time Chat" or the chat card
4. Start chatting!

---

## 🔧 Configuration

### Backend Configuration (.env)

```env
PORT=5000
NODE_ENV=development
```

### Frontend Configuration (.env)

```env
VITE_SOCKET_URL=http://localhost:5000
```

**For Production:**
Update `VITE_SOCKET_URL` to your production server URL (e.g., `https://api.calmspace.com`)

---

## 📊 Socket.io Events Reference

### Client → Server Events

| Event | Data | Description |
|-------|------|-------------|
| `send-message` | `{ receiverId, message, timestamp }` | Send a message |
| `typing` | `{ receiverId, isTyping }` | Typing indicator |
| `request-random-match` | none | Find random user |
| `get-online-users` | none | Request users list |

### Server → Client Events

| Event | Data | Description |
|-------|------|-------------|
| `user-connected` | `{ userId, username, socketId }` | Connection confirmed |
| `online-users-update` | `[ users array ]` | Updated users list |
| `receive-message` | Message object | Incoming message |
| `user-typing` | `{ senderId, senderUsername, isTyping }` | Typing status |
| `user-disconnected` | `{ userId, username }` | User went offline |
| `random-match-found` | `{ matchedUserId, matchedUsername }` | Match found |

---

## 💬 How to Use

### Starting a Chat

1. **Private Message**: Click on any user in the online list to start chatting
2. **Random Match**: Click 🎲 "Need Help?" button to connect with a random user
3. **Message**: Type in the input box and press Enter or click Send

### Features During Chat

- **Typing Indicator**: Others see "User is typing..." when you type
- **Emoji Support**: Click 😊 button to select emojis
- **Auto-scroll**: Messages automatically scroll to the latest
- **Clear Chat**: Click ✕ to clear the current conversation
- **Timestamps**: Each message shows when it was sent

### Online Status

- 🟢 Green dot = User is online and active
- Users list updates in real-time as others connect/disconnect
- Your username is auto-generated (e.g., "PeacefulWarrior123")

---

## 🛡️ Security & Privacy

- **Anonymous**: No personal data collection
- **Real-time Only**: Messages not stored in database
- **Profanity Filter**: Automatic filtering of inappropriate content
- **CORS Protected**: Server validates origins
- **UUID**: Users identified by unique IDs

**Note**: For production, consider:
- Using HTTPS/WSS for encrypted connections
- Adding message persistence to database
- Implementing rate limiting
- Adding authentication
- Implementing message encryption

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to server"

**Solution**: 
- Ensure ChatServer is running on port 5000
- Check if backend is accessible: `http://localhost:5000/api/health`
- Verify `VITE_SOCKET_URL` in Frontend `.env`

### Issue: "Messages not appearing"

**Solution**:
- Check browser console for errors (F12)
- Ensure Socket.io client version matches server
- Try refreshing the page
- Check if receiver's socket is still connected

### Issue: "Typing indicator not showing"

**Solution**:
- This is expected behavior - you see others typing, not yourself
- Check if other user is typing in your chat window

### Issue: "Random match not working"

**Solution**:
- Need at least 2 users online
- Try refreshing if you're alone
- Check console for error messages

---

## 📦 Dependencies

### Frontend
- `react`: UI library
- `react-router-dom`: Navigation
- `socket.io-client`: WebSocket client
- `axios`: HTTP client

### Backend
- `express`: Web framework
- `socket.io`: Real-time communication
- `cors`: Cross-Origin Resource Sharing
- `uuid`: Generate unique IDs

---

## 🎨 Styling

All styling uses **CSS Modules** for scoped, reusable styles:
- Dark theme matching Calmspace branding
- Responsive design for all screen sizes
- Smooth animations and transitions
- Accessibility-friendly colors and contrast

### Color Scheme
- Primary: `#82f0c9` (Teal)
- Secondary: `#4ECDC4` (Cyan)
- Accent: `#FF6B6B` (Red)
- Background: Dark navy gradients

---

## 🚀 Production Deployment

### Backend Deployment

1. **Set environment variables**:
   ```env
   PORT=5000
   NODE_ENV=production
   ```

2. **Deploy to a platform** (Heroku, AWS, DigitalOcean, etc.):
   ```bash
   npm install
   npm start
   ```

3. **Update CORS** in `server.js`:
   ```javascript
   cors: {
     origin: ['https://yourdomain.com'],
     methods: ['GET', 'POST'],
     credentials: true
   }
   ```

### Frontend Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Update environment**:
   ```env
   VITE_SOCKET_URL=https://api.yourdomain.com
   ```

3. **Deploy to** (Vercel, Netlify, GitHub Pages, etc.):
   - Push `build` directory contents to your hosting

---

## 📈 Future Enhancements

- [ ] Message persistence (MongoDB/PostgreSQL)
- [ ] User authentication & profiles
- [ ] Group chats
- [ ] File/Image sharing
- [ ] Message search/history
- [ ] User blocking
- [ ] Read receipts
- [ ] Voice/video calling
- [ ] Message encryption (E2E)
- [ ] Notifications (browser alerts)

---

## 📝 API Endpoints

### Health Check
```
GET /api/health
Response: { status: "Server is running", onlineUsers: 5 }
```

---

## 🤝 Contributing

Contribute to Calmspace! Submit PRs for:
- Bug fixes
- New features
- UI/UX improvements
- Performance optimizations
- Documentation improvements

---

## 📄 License

This project is part of Calmspace - A Stress Relief Platform

---

## ❓ FAQ

**Q: Is my chat data saved?**
A: No, by design. Messages exist only during the session. Consider adding database persistence for future versions.

**Q: Can I see past conversations?**
A: Currently no. Messages are real-time only. Future versions may include message history.

**Q: Is this secure?**
A: For casual stress relief support, yes. For sensitive data, use HTTPS/WSS and add encryption.

**Q: How many users can chat simultaneously?**
A: Theoretically unlimited. Socket.io can handle thousands of concurrent connections.

**Q: Can I moderate conversations?**
A: There's a built-in profanity filter. Extend `utils.js` for advanced filtering.

---

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review console errors (F12)
3. Check Socket.io documentation: https://socket.io/docs/
4. Review code comments in Chat.jsx and server.js

---

## 🎉 You're All Set!

Your Calmspace chat feature is ready to provide real-time support and connection to users seeking stress relief. 

**Start both servers and enjoy meaningful conversations!**

```bash
# Terminal 1: Backend
cd ChatServer && npm run dev

# Terminal 2: Frontend  
cd Frontend && npm run dev
```

Then open `http://localhost:5173` in your browser! 🚀
