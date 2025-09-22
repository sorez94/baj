'use client';

import React, { useState } from 'react';
import { SearchInput, Typography, Card } from '@/shared/components';
import { MainLayout } from '@/shared/components';

const SearchInputDemo: React.FC = () => {
  const [searchValue1, setSearchValue1] = useState('');
  const [searchValue2, setSearchValue2] = useState('');
  const [searchValue3, setSearchValue3] = useState('');
  const [searchValue4, setSearchValue4] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const [searchCount, setSearchCount] = useState(0);

  const handleSearch = (value: string) => {
    setSearchCount(prev => prev + 1);
    console.log('Search triggered:', value);
  };

  const handleChange = (value: string) => {
    setDebouncedValue(value);
  };

  return (
    <MainLayout>
      <div style={{ padding: 'var(--spacing-6)' }}>
        <Typography variant="bodyMedium" style={{ marginBottom: 'var(--spacing-6)', textAlign: 'center' }}>
          SearchInput Component Demo
        </Typography>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: 'var(--spacing-6)',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {/* Light Theme - Placeholder */}
          <Card padding="md">
            <Typography variant="bodyMedium" style={{ marginBottom: 'var(--spacing-3)', color: 'var(--color-text-secondary)' }}>
              Light Theme - Placeholder
            </Typography>
            <SearchInput
              placeholder="متن راهنما"
              theme="light"
              size="md"
            />
          </Card>

          {/* Dark Theme - Placeholder */}
          <Card padding="md">
            <Typography variant="bodyMedium" style={{ marginBottom: 'var(--spacing-3)', color: 'var(--color-text-secondary)' }}>
              Dark Theme - Placeholder
            </Typography>
            <SearchInput
              placeholder="متن راهنما"
              theme="dark"
              size="md"
            />
          </Card>

          {/* Light Theme - Filled */}
          <Card padding="md">
            <Typography variant="bodyMedium" style={{ marginBottom: 'var(--spacing-3)', color: 'var(--color-text-secondary)' }}>
              Light Theme - Filled
            </Typography>
            <SearchInput
              placeholder="متن راهنما"
              value={searchValue1}
              onChange={setSearchValue1}
              theme="light"
              size="md"
            />
          </Card>

          {/* Dark Theme - Filled */}
          <Card padding="md">
            <Typography variant="bodyMedium" style={{ marginBottom: 'var(--spacing-3)', color: 'var(--color-text-secondary)' }}>
              Dark Theme - Filled
            </Typography>
            <SearchInput
              placeholder="متن راهنما"
              value={searchValue2}
              onChange={setSearchValue2}
              theme="dark"
              size="md"
            />
          </Card>

          {/* Debouncing Demo */}
          <Card padding="md">
            <Typography variant="bodyMedium" style={{ marginBottom: 'var(--spacing-3)', color: 'var(--color-text-secondary)' }}>
              Debouncing Demo (300ms)
            </Typography>
            <SearchInput
              placeholder="Type to see debouncing..."
              value={searchValue3}
              onChange={handleChange}
              onSearch={handleSearch}
              debounceMs={300}
            />
            <div style={{ marginTop: 'var(--spacing-2)', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
              <div>Current value: {searchValue3}</div>
              <div>Debounced value: {debouncedValue}</div>
              <div>Search count: {searchCount}</div>
            </div>
          </Card>

          {/* Different Sizes */}
          <Card padding="md">
            <Typography variant="bodyMedium" style={{ marginBottom: 'var(--spacing-3)', color: 'var(--color-text-secondary)' }}>
              Different Sizes
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
              <SearchInput
                placeholder="Small size"
                size="sm"
                value={searchValue4}
                onChange={setSearchValue4}
              />
              <SearchInput
                placeholder="Medium size"
                size="md"
              />
              <SearchInput
                placeholder="Large size"
                size="lg"
              />
            </div>
          </Card>

          {/* Features Demo */}
          <Card padding="md">
            <Typography variant="bodyMedium" style={{ marginBottom: 'var(--spacing-3)', color: 'var(--color-text-secondary)' }}>
              Features Demo
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
              <SearchInput
                placeholder="With loading state"
                loading={true}
              />
              <SearchInput
                placeholder="Disabled state"
                disabled={true}
              />
              <SearchInput
                placeholder="No clear button"
                clearable={false}
              />
              <SearchInput
                placeholder="No search icon"
                searchable={false}
              />
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default SearchInputDemo; 