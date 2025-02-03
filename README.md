# Service POS System

A modern Point of Sale (POS) system built with React and TypeScript, designed for service-based businesses. This application helps manage services, handle customer orders, and process payments efficiently.

## 🚀 Features

- **Service Management**

  - Browse services by category
  - Search functionality
  - Detailed service information
  - Dynamic pricing

- **Shopping Cart**

  - Add/remove services
  - Adjust quantities
  - Real-time total calculation
  - Persistent cart state

- **Checkout Process**

  - Customer information collection
  - Payment processing
  - Digital receipt generation


## 📁 Project Structure

```
pos-service/
├── src/
│   ├── components/
│   │   ├── layout/           # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Layout.tsx
│   │   ├── services/         # Service-related components
│   │   │   ├── ServiceCard.tsx
│   │   │   └── ServiceList.tsx
│   │   ├── cart/            # Shopping cart components
│   │   │   ├── CartItem.tsx
│   │   │   └── Cart.tsx
│   │   ├── checkout/        # Checkout process components
│   │   │   ├── CustomerForm.tsx
│   │   │   ├── PaymentForm.tsx
│   │   │   └── Receipt.tsx
│   │   └── ui/             # Reusable UI components
│   │       ├── Button.tsx
│   │       └── Input.tsx
│   ├── pages/              # Page components
│   │   ├── Home.tsx
│   │   ├── Services.tsx
│   │   └── Checkout.tsx
│   ├── context/           # React Context providers
│   │   └── CartContext.tsx
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/           # Utility functions
│   │   └── helpers.ts
│   └── data/           # Static data and mock services
│       └── services.ts
```

## 🛠️ Technology Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **Routing**: React Router
- **Internationalization**: react-i18next
- **Icons**: Lucide React
- **Charts**: Recharts

## 🚦 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/pos-service.git
   cd pos-service
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 💻 Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Environment Setup

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url
```

### Code Style

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type checking

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- All contributors who have helped this project grow
