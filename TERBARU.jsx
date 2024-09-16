'use client';
import { useEffect, useRef, useState } from 'react';

export default function CreateTest() {
  const [pages, setPages] = useState([{ questions: [{ type: 'multiple-choice', level: 'normal' }] }]);
  const [activeFilter, setActiveFilter] = useState(null);
  const [testCategory, setTestCategory] = useState('CPNS');
  const [questionType, setQuestionType] = useState('multiple-choice');
  const [activePage, setActivePage] = useState('create-test');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [pageIndexToRemove, setPageIndexToRemove] = useState(null);
  const [questionIndexToRemove, setQuestionIndexToRemove] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState({ category: '', type: '' });
  const [similarity, setSimilarity] = useState('45%'); // Status untuk kemiripan
  const dropdownRef = useRef(null);

  const categories = {
    CPNS: ['pilihan ganda', 'essay', 'psikotes'],
    UTBK: ['pilihan ganda', 'essay'],
    Psikotes: ['multiple-choice', 'psikotes']
  };

  const addPage = () => {
    setPages([...pages, { questions: [{ type: 'multiple-choice', level: 'normal' }] }]);
  };

  const addQuestion = (pageIndex) => {
    const newPages = [...pages];
    newPages[pageIndex].questions.push({ type: 'multiple-choice', level: 'normal' });
    setPages(newPages);
  };

  const updateQuestionType = (pageIndex, questionIndex, type) => {
    const newPages = [...pages];
    newPages[pageIndex].questions[questionIndex].type = type;
    setPages(newPages);
  };

  const handleRemoveQuestion = (pageIndex, questionIndex) => {
    setPageIndexToRemove(pageIndex);
    setQuestionIndexToRemove(questionIndex);
    setModalType('question');
    setShowModal(true);
  };

  const handleRemovePage = (pageIndex) => {
    setPageIndexToRemove(pageIndex);
    setModalType('page');
    setShowModal(true);
  };

  const confirmRemove = () => {
    if (modalType === 'question') {
      const newPages = [...pages];
      newPages[pageIndexToRemove].questions.splice(questionIndexToRemove, 1);
      setPages(newPages);
    } else if (modalType === 'page') {
      const newPages = pages.filter((_, index) => index !== pageIndexToRemove);
      setPages(newPages);
    }
    setShowModal(false);
  };

  const cancelRemove = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveFilter(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const handleCategorySelect = (category) => {
    setTestCategory(category);
    setSelectedFilter((prev) => ({ ...prev, category }));
    setActiveFilter(null);
  };

  const handleTypeSelect = (type) => {
    setQuestionType(type);
    setSelectedFilter((prev) => ({ ...prev, type }));
    setActiveFilter(null);
  };

  const handleSimilaritySelect = (option) => {
    setSimilarity(option);
    setActiveFilter(null); // Tutup dropdown setelah pemilihan
  };

  const renderContent = () => {
    switch (activePage) {
      case 'create-test':
        return (
          <div className="bg-white p-4 shadow-md rounded-md">
            {/* Tombol Simpan - Posisi di sudut kanan atas */}
            <div className="flex justify-end mb-4">
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md"
                onClick={() => alert('Detail tes telah disimpan')}
              >
                Simpan dan Atur Detail Publikasi
              </button>
            </div>

            {pages.map((page, pageIndex) => (
              <div key={pageIndex} className="mb-6">
                <div className="flex items-center justify-between mb-4 border-b border-gray-300 pb-2">
                  <h3 className="text-xl font-semibold">Halaman {pageIndex + 1}</h3>

                  {/* Tombol X */}
                  <div className="flex items-center gap-4">
                    <button
                      className="text-red-500 text-xl"
                      onClick={() => handleRemovePage(pageIndex)}
                    >
                      ×
                    </button>
                  </div>
                </div>

                {/* Bar Filter Gabungan */}
                <div className="flex gap-4 mb-4 bg-[#465CF6] p-2 rounded-md" ref={dropdownRef}>
                  {/* Tombol Tambah Soal */}
                  <button
                    className="border border-gray-300 rounded-md px-4 py-2 flex items-center justify-between w-48 text-white"
                    onClick={() => addQuestion(pageIndex)}
                  >
                    Tambah Soal
                  </button>

                  {/* Dropdown Kemiripan */}
                  <div className="relative w-48">
                    <button
                      className="border border-gray-300 rounded-md px-4 py-2 flex items-center justify-between w-full text-white"
                      onClick={() => handleFilterClick('similarity')}
                    >
                      Kemiripan Soal
                      <span className={`ml-2 transform ${activeFilter === 'similarity' ? 'rotate-180' : ''}`}>&#9660;</span>
                    </button>
                    {activeFilter === 'similarity' && (
                      <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-2 shadow-lg z-10">
                        {['45%', '75%', '85%'].map(option => (
                          <button
                            key={option}
                            className={`w-full text-left px-4 py-2 hover:bg-gray-200 ${similarity === option ? 'bg-gray-200' : ''}`}
                            onClick={() => handleSimilaritySelect(option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Dropdown Kategori */}
                  <div className="relative w-48">
                    <button
                      className="border border-gray-300 rounded-md px-4 py-2 flex items-center justify-between w-full text-white"
                      onClick={() => handleFilterClick('category')}
                    >
                      {selectedFilter.category || 'Kategori Tes'}
                      <span className={`ml-2 transform ${activeFilter === 'category' ? 'rotate-180' : ''}`}>&#9660;</span>
                    </button>
                    {activeFilter === 'category' && (
                      <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-2 shadow-lg z-10">
                        {Object.keys(categories).map(category => (
                          <button
                            key={category}
                            className="w-full text-left px-4 py-2 hover:bg-gray-200"
                            onClick={() => handleCategorySelect(category)}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Dropdown Jenis Tes */}
                  <div className="relative w-48">
                    <button
                      className="border border-gray-300 rounded-md px-4 py-2 flex items-center justify-between w-full text-white"
                      onClick={() => handleFilterClick('type')}
                    >
                      {selectedFilter.type || 'Jenis Tes'}
                      <span className={`ml-2 transform ${activeFilter === 'type' ? 'rotate-180' : ''}`}>&#9660;</span>
                    </button>
                    {activeFilter === 'type' && (
                      <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-2 shadow-lg z-10">
                        {categories[testCategory].map(type => (
                          <button
                            key={type}
                            className="w-full text-left px-4 py-2 hover:bg-gray-200"
                            onClick={() => handleTypeSelect(type)}
                          >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Soal - Hanya menampilkan kotak dan nomor */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {page.questions.map((_, questionIndex) => (
                      <div key={questionIndex} className="bg-blue-200 text-black border border-gray-300 rounded-md w-72 h-16 flex items-center justify-center relative">
                        <h4 className="text-lg font-semibold">Soal {questionIndex + 1}</h4>
                        <button
                          className="text-red-500 text-xl absolute top-2 right-2"
                          onClick={() => handleRemoveQuestion(pageIndex, questionIndex)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md"
              onClick={addPage}
            >
              Tambah Halaman
            </button>
          </div>
        );
      case 'publish':
        return (
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-semibold">Halaman Publikasi</h2>
            <p className="mt-2">Di sini Anda bisa mengatur publikasi tes yang telah dibuat.</p>
            {/* Konten publikasi lainnya */}
          </div>
        );
      case 'published-tests':
        return (
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-semibold">Tes yang Dipublikasikan</h2>
            <p className="mt-2">Di sini Anda bisa melihat tes yang telah dipublikasikan.</p>
            {/* Konten tes yang dipublikasikan lainnya */}
          </div>
        );
      case 'analysis':
        return (
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-semibold">Analisis</h2>
            <p className="mt-2">Di sini Anda bisa menganalisis hasil tes.</p>
            {/* Konten analisis lainnya */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-[#0B61AA] text-white shadow-md p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className="text-white text-2xl"
            onClick={() => {/* Fungsi untuk ikon menu */}}
          >
            &#9776;
          </button>
          <span className="text-xl font-semibold">EtamTest</span>
        </div>
      </header>

      {/* Bar Navigasi Atas */}
      <div className="p-4">
        <div className="flex gap-4 mb-4 bg-[#CAE6F9] p-2 rounded-md">
          <button
            className={`px-4 py-2 rounded-md ${activePage === 'create-test' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => setActivePage('create-test')}
          >
            Buat Tes
          </button>
          <button
            className={`px-4 py-2 rounded-md ${activePage === 'publish' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => setActivePage('publish')}
          >
            Publikasi
          </button>
          <button
            className={`px-4 py-2 rounded-md ${activePage === 'published-tests' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => setActivePage('published-tests')}
          >
            Tes Terpublikasi
          </button>
          <button
            className={`px-4 py-2 rounded-md ${activePage === 'analysis' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => setActivePage('analysis')}
          >
            Analisis
          </button>
        </div>
      </div>

      {/* Konten Utama */}
      {renderContent()}

      {/* Modal untuk Konfirmasi */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-4">Apakah Anda yakin?</h3>
            <p className="mb-4">Apakah Anda ingin {modalType === 'question' ? 'menghapus soal ini' : 'menghapus halaman ini'}?</p>
            <div className="flex gap-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={confirmRemove}>
                Ya
              </button>
              <button className="bg-gray-300 text-black px-4 py-2 rounded-md" onClick={cancelRemove}>
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
