# Todo Web Application 📝

A modern, responsive Todo web application built with **Next.js**, **TypeScript**, and **Tailwind CSS**. Features drag-and-drop functionality, real-time updates, and a clean, intuitive interface.

![Todo App](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🔐 Authentication
- **User Registration** - Create new account
- **Secure Login** - JWT-based authentication
- **Protected Routes** - Automatic redirect for unauthenticated users

### 📋 Todo Management
- **Create Todos** - Add new tasks with titles and descriptions
- **Update Todos** - Mark tasks as complete/incomplete, edit content
- **Delete Todos** - Remove tasks with confirmation
- **Drag & Drop** - Reorder tasks intuitively using drag and drop
- **Real-time Updates** - Instant UI updates without page refresh

### 👤 User Profile
- **Profile Management** - Update personal information
- **Account Settings** - Change password and preferences

### 🎨 UI/UX
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Modern Interface** - Clean, Material Design inspired UI
- **Dark/Light Mode** - Toggle between themes (optional)
- **Loading States** - Smooth loading animations and skeleton screens

## 🚀 Live Demo

Check out the live application: [Coming Soon](#)

## 🛠 Tech Stack

- **Framework**: Next.js with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState, useContext)
- **Form Handling**: React Hook Form
- **Drag & Drop**: @dnd-kit
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Deployment**: Vercel

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/developerMohib/my-todo-app-pioneer.git
   cd my-todo-app-pioneer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=https://todo-app.pioneeralpha.com
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗 Project Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   ├── todos/             # Todo management page
│   ├── profile/           # User profile page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── common/            # Common UI components
│   ├── forms/             # Form components
│   └── todos/             # Todo-specific components
├── hooks/                 # Custom React hooks
│   ├── useAuth.ts         # Authentication logic
│   └── useTodos.ts        # Todo management logic
├── lib/                   # Utility libraries
│   └── types.ts           # TypeScript definitions
└── utils/                 # Helper functions
    └── constants.ts       # App constants
```

## 🔌 API Integration

This application integrates with a RESTful API with the following endpoints:

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login

### Todo Operations
- `GET /todos` - Fetch all todos
- `POST /todos` - Create new todo
- `PUT /todos/:id` - Update todo
- `DELETE /todos/:id` - Delete todo
- `PUT /todos/reorder` - Reorder todos

## 🎯 Key Features Explained

### Drag & Drop Implementation
```typescript
// Using @dnd-kit for smooth drag and drop
const sensors = useSensors(
  useSensor(PointerSensor),
  useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates,
  })
);


### Real-time State Management
```typescript
// Optimistic updates for better UX
const updateTodo = async (id: string, updates: Partial<Todo>) => {
  const previousTodos = todos;
  
  // Optimistic update
  setTodos(prev => prev.map(todo => 
    todo.id === id ? { ...todo, ...updates } : todo
  ));
  
  try {
    await todoAPI.update(id, updates);
  } catch (error) {
    // Revert on error
    setTodos(previousTodos);
  }
};
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🔒 Security Features

- JWT Token-based authentication
- Protected routes with automatic redirects
- Input validation and sanitization
- XSS protection
- Secure HTTP headers

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables
4. Deploy automatically

### Other Platforms
The app can also be deployed on:
- **Netlify**
- **Railway**
- **AWS Amplify**

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is not licensed.

## 🐛 Bug Reports

If you encounter any bugs or issues, please [create an issue](https://github.com/developerMohib/my-todo-app-pioneer/issues) with:
- Detailed description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [@dnd-kit](https://dndkit.com/) - For drag and drop
- [React Hook Form](https://react-hook-form.com/) - For form management

## 📞 Support

For support, email mohibullahmohim2020@gmail.com or https://mohibullahmohim.com

---

**Built with ❤️ using Next.js and TypeScript**

<div align="center">

### ⭐ Don't forget to star this repository if you found it helpful!

</div>