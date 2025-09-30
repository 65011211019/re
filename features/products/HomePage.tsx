import React, { useEffect, useState } from 'react';
import { Product, ApiError } from '../../types';
import { getPopularProducts } from '../../services/productService';
import { ProductCard } from './ProductCard';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../constants';

import { Button } from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FaSearch, 
  FaBoxOpen, 
  FaTags, 
  FaShieldAlt, 
  FaCheckCircle, 
  FaHeadset, 
  FaUserPlus, 
  FaListOl, 
  FaTruck, 
  FaUndo,
  FaArrowRight
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin, user } = useAuth();
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  if (isAdmin) {
    return <Navigate to={ROUTE_PATHS.ADMIN_DASHBOARD} replace />;
  }

  const fetchPopularProducts = async () => {
    try {
      setIsLoadingProducts(true);
      setProductsError(null);
      const response = await getPopularProducts(8);
      setPopularProducts(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      const apiError = err as ApiError;
      setProductsError(apiError.message || 'เกิดข้อผิดพลาดในการโหลดสินค้า');
      console.error('Error fetching popular products:', err);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`${ROUTE_PATHS.SEARCH_PRODUCTS}?q=${searchTerm}`);
  };

  useEffect(() => {
    fetchPopularProducts();
  }, [navigate]);

  const howItWorks = [
    { icon: <FaSearch className="text-blue-500 text-2xl" />, title: 'ค้นหาสินค้า', desc: 'ค้นหาสินค้าที่คุณต้องการเช่าจากหมวดหมู่หรือคำค้นหา' },
    { icon: <FaListOl className="text-green-500 text-2xl" />, title: 'จองสินค้า', desc: 'เลือกวันที่ต้องการเช่าและทำการจองสินค้า' },
    { icon: <FaTruck className="text-yellow-500 text-2xl" />, title: 'รับสินค้า', desc: 'นัดหมายรับสินค้ากับเจ้าของหรือให้จัดส่งถึงมือ' },
    { icon: <FaUndo className="text-purple-500 text-2xl" />, title: 'คืนสินค้า', desc: 'คืนสินค้าตามวันที่กำหนดและรับเงินประกันคืน' },
  ];

  const features = [
    { icon: <FaTags className="text-blue-500 text-xl" />, text: 'ราคาดี คุ้มค่า' },
    { icon: <FaShieldAlt className="text-green-500 text-xl" />, text: 'ปลอดภัย เชื่อถือได้' },
    { icon: <FaCheckCircle className="text-yellow-500 text-xl" />, text: 'หลากหลาย ครบครัน' },
    { icon: <FaHeadset className="text-purple-500 text-xl" />, text: 'บริการดี รวดเร็ว' },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/6969962/pexels-photo-6969962.jpeg)'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/60 to-purple-600/60"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32 relative z-10">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              เช่าสินค้าออนไลน์ สะดวก รวดเร็ว ปลอดภัย
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10"
            >
              แพลตฟอร์มเช่าสินค้าอันดับหนึ่งในประเทศไทย ที่ช่วยให้คุณเช่าสินค้าได้ง่ายๆ ผ่านอินเทอร์เน็ต
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <form onSubmit={handleSearch} className="flex shadow-xl rounded-lg overflow-hidden">
                <input 
                  type="search" 
                  placeholder="ค้นหาสินค้าที่คุณต้องการเช่า..."
                  className="flex-grow p-4 text-gray-800 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="bg-yellow-400 hover:bg-yellow-500 transition-colors text-gray-900 font-semibold px-6 flex items-center gap-2"
                >
                  <FaSearch /> ค้นหา
                </button>
              </form>
            </motion.div>
            
            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            >
              <Link
                to={ROUTE_PATHS.SEARCH_PRODUCTS}
                className="bg-white text-blue-600 hover:bg-gray-100 transition-colors font-semibold px-8 py-3 rounded-lg shadow-lg flex items-center justify-center gap-2"
              >
                <FaBoxOpen /> เช่าสินค้า
              </Link>
              <Link
                to={ROUTE_PATHS.MY_LISTINGS}
                className="bg-yellow-400 hover:bg-yellow-500 transition-colors text-gray-900 font-semibold px-8 py-3 rounded-lg shadow-lg flex items-center justify-center gap-2"
              >
                <FaListOl /> ให้เช่าสินค้า
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-white shadow-md mr-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">{feature.text}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Powered Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ระบบ AI ช่วยค้นหาสินค้า
              </h3>
            </div>
            <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              ใช้เทคโนโลยีปัญญาประดิษฐ์ในการแนะนำสินค้าที่ตรงกับความต้องการของคุณอย่างแม่นยำ
            </p>
          </motion.div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              สินค้ายอดนิยม
            </h2>
            <Link 
              to={ROUTE_PATHS.SEARCH_PRODUCTS} 
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center transition-colors"
            >
              ดูสินค้าทั้งหมด <FaArrowRight className="ml-2" />
            </Link>
          </div>

          {isLoadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm h-96 animate-pulse"></div>
              ))}
            </div>
          ) : productsError ? (
            <div className="text-center py-12">
              <ErrorMessage message={productsError} title="ข้อผิดพลาด" />
              <Button 
                variant="primary" 
                onClick={fetchPopularProducts}
                className="mt-6"
              >
                ลองใหม่อีกครั้ง
              </Button>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              {Array.isArray(popularProducts) && popularProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -10 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {(!Array.isArray(popularProducts) || popularProducts.length === 0) && !isLoadingProducts && !productsError && (
            <div className="text-center py-16">
              <FaBoxOpen className="mx-auto text-5xl text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-500">ไม่พบสินค้าแนะนำในขณะนี้</h3>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-16">
            วิธีการใช้งาน
          </h2>
          
          <div className="relative">
            <div className="hidden lg:block absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4">
              {howItWorks.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative bg-white lg:bg-transparent z-10"
                >
                  <div className="flex flex-col items-center text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center mb-6">
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12 inline-block"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                สมัครสมาชิกฟรีวันนี้
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                เริ่มต้นการเช่าหรือให้เช่าสินค้าได้ทันทีโดยไม่มีค่าใช้จ่าย
              </p>
              <Link 
                to={ROUTE_PATHS.REGISTER} 
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg transition-all"
              >
                <FaUserPlus className="mr-2" />
                สมัครสมาชิก
              </Link>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};