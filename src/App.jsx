import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';
import ScrollTop from './components/ScrollTop/ScrollTop';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Header />
        <main id="main-content">
          <AppRoutes />
        </main>
        <Footer />
        <WhatsAppButton />
        <ScrollTop />
      </BrowserRouter>
    </ThemeProvider>
  );
}
