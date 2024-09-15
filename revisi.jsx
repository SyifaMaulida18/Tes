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

  const renderContent = () => {
    return (
      <div className="bg-white p-4 shadow-lg rounded-md font-poppins">
        {/* "Simpan dan Atur Detail Publikasi" button moved here */}
        <div className="flex justify-end mb-6">
          <button
            className="bg-primary text-white px-4 py-2 rounded-md"
            onClick={() => {/* Functionality for saving and publishing */}}
          >
            Simpan dan Atur Detail Publikasi
          </button>
        </div>

        {pages.map((page, pageIndex) => (
          <div key={pageIndex} className="mb-6">
            <div className="flex items-center justify-between mb-4 border-b border-gray-300 pb-2">
              <h3 className="text-xl font-semibold">Page {pageIndex + 1}</h3>
              <button
                className="text-red-500 text-xl"
                onClick={() => handleRemovePage(pageIndex)}
              >
                ×
              </button>
            </div>

            {/* Combined Filter Bar */}
            <div className="flex gap-4 mb-4" ref={dropdownRef}>
              {/* Add Question Button */}
              <button
                className="border border-gray-300 rounded-md px-4 py-2 flex items-center justify-between w-48"
                onClick={() => addQuestion(pageIndex)}
              >
                Tambah Soal
              </button>

              {/* Category Dropdown */}
              <div className="relative w-48">
                <button
                  className="border border-gray-300 rounded-md px-4 py-2 flex items-center justify-between w-full"
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

              {/* Type Dropdown */}
              <div className="relative w-48">
                <button
                  className="border border-gray-300 rounded-md px-4 py-2 flex items-center justify-between w-full"
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

            {/* Questions */}
            <div className="mb-4">
              <div className="flex gap-2">
                {page.questions.map((_, questionIndex) => (
                  <div key={questionIndex} className="relative bg-blue-light text-black border border-gray-300 rounded-md w-12 h-12 text-center flex items-center justify-center">
                    <span className="text-xl">{questionIndex + 1}</span>
                    <button
                      className="absolute top-1 right-1 text-red-500 text-xs"
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

        {/* Button to add page only appears once */}
        <div className="flex justify-end">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center"
            onClick={addPage}
          >
            <span className="text-2xl mr-2">+</span> Tambah Page
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-poppins">
      {/* Main Header */}
      <header className="bg-primary text-white py-4 px-6 flex items-center">
        <div className="flex items-center w-full">
          <button className="text-white text-xl">≡</button>
          <h1 className="ml-4 text-2xl font-libre-bodoni">EtamTest</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activePage === 'create-test' && renderContent()}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-1/3">
            <h2 className="text-xl font-semibold mb-4">
              {modalType === 'question' ? 'Hapus Soal?' : 'Hapus Page?'}
            </h2>
            <p className="mb-4">
              {modalType === 'question'
                ? 'Apakah Anda yakin ingin menghapus soal ini?'
                : 'Apakah Anda yakin ingin menghapus page ini?'}
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={confirmRemove}
              >
                Hapus
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
                onClick={cancelRemove}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
