'use client';

import React from 'react';
import { Typography,Button } from '@/shared/components';
import styles from './List.module.scss';

export interface ListItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'default' | 'primary' | 'danger';
  mainStyle?: React.CSSProperties;
}

export interface ListProps {
  items: ListItem[];
  className?: string;
  mainStyle?: React.CSSProperties;
}

const List: React.FC<ListProps> = ({ items, className, mainStyle }) => {
  return (
    <div className={`${styles.list} ${className || ''}`} style={{...mainStyle}}>
      {items.map((item) => (
        <Button
          key={item.id}
          type = "button"
          variant="text"
          className={`${styles.listItem} ${item.variant ? styles[item.variant] : ''} ${item.disabled ? styles.disabled : ''}`}
          onClick={item.disabled ? undefined : item.onClick}
          disabled={item.disabled}
          rightIcon = {item.icon}
        >
          {/* <div className={styles.icon}>
            {item.icon}
          </div> */}
          <Typography variant="bodyLarge" className={styles.title} style = {{color:"inherit"}}>
            {item.title}
          </Typography>
        </Button>
      ))}
    </div>
  );
};

export default List;
