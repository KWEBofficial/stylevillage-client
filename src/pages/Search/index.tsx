import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Box } from '@mui/material';

import { getSearchAPICall } from '../../hooks/api/search/search';
import SearchBar from '../../components/SearchBar';
import ClothesPreviewCard from '../../components/ClothesPreviewCard';

interface Owner {
  id: number;
  nickname?: string;
  location?: string;
}
interface SearchClothesRes {
  id: number;
  closetId: number;
  category?: string;
  season?: string;
  status: string;
  isOpen: boolean;
  name: string;
  tag?: string;
  image?: string;
  owner: Owner;
  isWished: boolean;
}

export function SearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultSearchKeyWord = searchParams.get('text') || '';
  const defaultCategorySelected = searchParams.getAll('category');
  const defaultSeasonSelected = searchParams.getAll('season');
  const defaultFilterSelected = searchParams.getAll('status');
  const [searchKeyWord, setSearchKeyWord] = useState(defaultSearchKeyWord);
  const [categorySelected, setCategorySelected] = useState(defaultCategorySelected);
  const [seasonSelected, setSeasonSelected] = useState(defaultSeasonSelected);
  const [filterSelected, setFilterSelected] = useState(defaultFilterSelected);
  const [queryString, setQueryString] = useState<string>();
  const [searchBar, setSearchBar] = useState<string>();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchBar(event.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setSearchKeyWord(searchBar || '');

    // 쿼리 만들기
    const keyWordQueryString = `text=${encodeURIComponent(searchKeyWord)}`;
    const categoryQueryString = categorySelected
      .map((category) => `category=${encodeURIComponent(category)}`)
      .join('&');
    const seasonQueryString = seasonSelected.map((season) => `season=${encodeURIComponent(season)}`).join('&');
    const filterQueryString = filterSelected.map((filter) => `filter=${encodeURIComponent(filter)}`).join('&');

    const newQueryString = [keyWordQueryString, categoryQueryString, seasonQueryString, filterQueryString]
      .filter((query) => !!query)
      .join('&');
    setQueryString(newQueryString);

    const url = `/search?${queryString}`;
    navigate(url);
  };

  const handleGroupClick = (group: string, label: string) => {
    switch (group) {
      case '카테고리':
        setCategorySelected(
          categorySelected.includes(label) ? [...categorySelected, label] : categorySelected.filter((c) => c !== label),
        );
        break;
      case '계절':
        setSeasonSelected(
          seasonSelected.includes(label) ? [...seasonSelected, label] : seasonSelected.filter((c) => c !== label),
        );
        break;
      case '필터':
        setFilterSelected(
          filterSelected.includes(label) ? [...filterSelected, label] : filterSelected.filter((c) => c !== label),
        );
        break;
      default:
        break;
    }
  };

  const getCards = (clothesList: SearchClothesRes[]) => {
    return clothesList
      ? clothesList.map((clothes: SearchClothesRes) => {
          const { id, name, status, owner, isWished } = clothes;
          return (
            <ClothesPreviewCard
              key={id}
              clothesId={id}
              clothesname={name}
              imgsrc={}
              status={status}
              userid={owner.id || 0}
              username={owner.nickname || owner.username}
              isWished={isWished}
            />
          );
        })
      : [];
  };
  const clothesCards = getSearchAPICall(searchKeyWord)
    .then((result) => {
      return getCards(result || []);
    })
    .catch();

  return (
    <>
      <Box sx={{ paddingTop: '24px', backgroundColor: '#E9E9E9' }}>
        <SearchBar
          defaultSearchKeyWord={defaultSearchKeyWord}
          defaultcategorySelected={defaultCategorySelected}
          defaultseasonSelected={defaultSeasonSelected}
          defaultfilterSelected={defaultFilterSelected}
          handleSubmit={handleSubmit}
          handleGroupClick={handleGroupClick}
          handleChange={handleChange}
        />
      </Box>
      {clothesCards}
    </>
  );
}
