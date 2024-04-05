import React from 'react';
import IconSearch from '@/icon/icon-search.svg';
import Image from 'next/image';

type SearchInputType = {
  onChange: any;
  register: any;
};

const SearchInput = (data: SearchInputType) => {
  const { onChange, register } = data;
  const handleInputChange = (event: any) => {
    onChange(event.target.value);
  };

  return (
    <div className="search-input-container">
      <Image src={IconSearch} alt="icon search" className="icon-search" />
      <input
        type="text"
        className="search-input"
        onChange={handleInputChange}
        placeholder="Buscar"
        {...register}
      />
    </div>
  );
};

export default SearchInput;
