import React from 'react';
import { ArrowLeft, Search, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function SearchPage ()  {
    const recentSearches = [
    { id: 1, title: 'jeans for men', image: 'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F9e%2F15%2F9e150fa3302fe52ba1438c36d6211600cdd15d0b.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]' },
    { id: 2, title: 'intel evo', image: 'https://au-files.apjonlinecdn.com/landingpages/content-pages/hp-intel-evo-p2/images/w100_extend_beyond_performance_img.png' },
    { id: 3, title: 'Hp pavilion 14 300nit', image: 'https://m.media-amazon.com/images/I/7145kvSFnQL._AC_UF1000,1000_QL80_.jpg' },
    { id: 4, title: 'puma court shatter', image: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/shoe/s/w/2/-original-imah64vmgsqahpfs.jpeg?q=90&crop=false' },
    { id: 5, title: 'vivo t2 5g m', image: 'https://m.media-amazon.com/images/I/61U0VAcZYDL.jpg' },
  ];

  const relatedSearches = [
    { id: 1, title: 'Black jeans for men', image: 'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F9e%2F15%2F9e150fa3302fe52ba1438c36d6211600cdd15d0b.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]' },
    { id: 2, title: 'Baggy jeans men', image: 'https://thestreetsofseoul.com/cdn/shop/files/Vintage-Wash-Baggy-Jeans-thestreetsofseoul-korean-street-style-minimal-streetwear-k-style-kstyle-mens-affordable-clothing-4.webp?v=1706024145&width=800' },
    { id: 3, title: 'Jeans for men branded', image: 'https://images-cdn.ubuy.co.in/663ff002322f56374d221af8-wozhidaoke-mens-jeans-men-s-fashion.jpg' },
    { id: 4, title: 'Asus vivobook 15', image: 'https://dlcdnwebimgs.asus.com/gain/46e5809c-669e-4d0c-9d7d-363e4ea6afeb/' },
    { id: 5, title: 'Macbook air m2', image: 'https://www.designinfo.in/wp-content/uploads/2023/10/Apple-13.6-MacBook-Air-M2-Midnight-1-485x485-optimized.webp' },
    { id: 6, title: 'Ipad', image: 'https://www.designinfo.in/wp-content/uploads/2024/03/Apple-12.9-Inch-iPad-Pro-Latest-Model-with-Wi-Fi-512GB-Space-Gray-1-485x485-optimized.webp' },
  ];

  const recommendedStores = [
    { id: 1, title: 'Jeans', image: 'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F9e%2F15%2F9e150fa3302fe52ba1438c36d6211600cdd15d0b.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]' },
    { id: 2, title: 'Laundry', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkuOlcFSYl02C-NcChfjR6fNzxi0Uu9S8B6w&s' },
  ];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black">
      <div className="sticky top-0 bg-[#e0e0e0] dark:bg-black p-4 flex items-center gap-3 shadow-sm border-b dark:border-gray-600">
        <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" onClick={() => navigate(-1)} />
        <div className="flex-1 flex items-center bg-gray-100 dark:bg-transparent border dark:border-gray-600 rounded-full px-4 py-2">
          <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder='search here...'
            className="flex-1 bg-transparent border-none outline-none px-3 text-gray-800 dark:text-gray-200"
          />
          <Mic className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
      </div>

      <div className="py-3 px-4">
        <section className="mb-2">
          <h2 className="text-md font-bold mb-4 text-gray-800 dark:text-gray-200">Recent Searches</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 search-scrollbar">
            {recentSearches.map((item) => (
              <div key={item.id} className="flex flex-col items-center min-w-[80px]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-14 h-14 rounded-full mb-1 border dark:border-gray-600 bg-white dark:bg-transparent"
                />
                <p className="text-sm text-center text-gray-600 dark:text-gray-300 line-clamp-2">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-2">
          <h2 className="text-md font-bold mb-2 text-gray-800 dark:text-gray-200">Related Searches</h2>
          <div className="grid grid-cols-2 gap-3">
            {relatedSearches.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 px-2 border dark:border-gray-600 bg-gray-50 dark:bg-transparent rounded-lg"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-12 h-12 bg-white dark:bg-gray-700"
                />
                <p className="text-xs text-gray-700 dark:text-gray-300">{item.title}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-md font-bold mb-2 text-gray-800 dark:text-gray-200">
            Recommended Stores For You
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {recommendedStores.map((store) => (
              <div
                key={store.id}
                className="border dark:border-gray-600 bg-white dark:bg-transparent rounded-lg flex flex-col items-center"
              >
                <img
                  src={store.image}
                  alt={store.title}
                  className="w-full h-32 object-cover mb-1 bg-gray-100 dark:bg-gray-700"
                />
                <p className="text-gray-600 dark:text-gray-300 mb-1">{store.title}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SearchPage;