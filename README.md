# SQL Query Runner Web App

This project is a web-based SQL query runner that allows users to execute SQL queries directly in the browser using **ALASQL.js**. It features query history management, state handling, and a user-friendly interface with support history storation.

## 🔥 Features
- **Execute SQL Queries**: Run `SELECT` queries in real-time.
- **Query History Management**: Automatically save and retrieve past queries.
- **Drawer Management**: Toggle between different sections smoothly and we have give a guidelines section to user can get familiar easily.
- **Lazy Loading**: Optimized performance with React Suspense & Lazy.
- **State Management with Localstorage**: Simplified History maintaining even u refresh page.

## 🛠️ Technologies Used
- **React.js** - Frontend development
- **ALASQL.js** - In-browser SQL execution
- **Mantine UI** - UI components and styling
- **React Router** - Routing management
- **LocalStorage API** - Persistent query history
- **React Suspense & Lazy** - Lazy loading for optimized performance

## 🚀 Getting Started
### 1️⃣ Installation
Clone the repository and install dependencies:
```sh
git clone https://github.com/ak4shkr/atlan_frontend
cd atlan
npm install
```

## Application flow
![Screenshot 2025-03-29 183449](https://github.com/user-attachments/assets/61a80baf-bfdf-418e-b20c-013922005708)



## 🚀 Key Optimizations for 100% Performance
- **Code Splitting**: Components are dynamically loaded only when required.
- **Lazy Loading**: Routes and UI components are loaded asynchronously to reduce initial load time.
- **Dynamic Imports**: Heavy modules are imported on demand, reducing the JavaScript bundle size.
- **React Suspense**: Provides a smooth user experience by handling component loading states efficiently.
- **UseRef and UseMemo**: to reduce re-rendering.

![Screenshot 2025-03-29 174303](https://github.com/user-attachments/assets/2b32d725-d8b4-4701-be6e-f0ba4ecd8e25)

### Live Link
**https://atlanfrontend.vercel.app/**

## 🌎 **Future Improvements**
- Implementing a **backend API** for persistent database storage.
- Adding **authentication & user management** for personalized query history.
- Expanding **SQL execution capabilities** beyond `SELECT` queries.
- giving authority to user to setup table and practice query
- implementing pagination in case of big data.

  # 🎯 Conclusion

The **SQL Query Runner Web App** is a highly optimized, modular, and scalable system designed for efficiency. With **code splitting, lazy loading, dynamic imports, and state management**, we have successfully achieved **100% performance** while maintaining a clean and maintainable codebase.

### ✅ **Key Takeaways**
- **Performance First** – Achieved top performance using **lazy loading & dynamic imports**.
- **Scalability** – Modular structure ensures **future-proof development**.
- **Deployment Ready** – Hosted on **Vercel** for **fast and seamless** deployment.
- **User Experience Focused** – Intuitive UI and **efficient query execution**.

With this robust architecture, the app is **future-ready** for enhancements such as backend integration, authentication, and expanded SQL functionalities. 🚀

---

### 🔗 **Want to Contribute?**
Feel free to fork the repository, raise issues, and submit PRs to improve the project. Your feedback and suggestions are always welcome!

---
